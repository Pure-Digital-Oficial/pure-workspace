import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateTriggerService } from './create-trigger.service';
import {
  ErrorMessageResult,
  CreateTriggerDto,
  triggerBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('create-trigger')
export class CreateTriggerController {
  constructor(private createTriggerService: CreateTriggerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: triggerBodySchema,
    })
  )
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreateTriggerDto, 'loggedUserId'>
  ) {
    const result = await this.createTriggerService.create({
      ...input,
      loggedUserId: query.userId ?? '',
    });
    if (result.isRight()) return { triggerId: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

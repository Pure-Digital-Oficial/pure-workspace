import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateTriggerService } from './create-trigger.service';
import {
  ErrorMessageResult,
  CreateTriggerDto,
  createTriggerSchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';

@Controller('create-trigger')
export class CreateTriggerController {
  constructor(private createTriggerService: CreateTriggerService) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: createTriggerSchema,
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
    if (result.isRight()) return { trigger_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

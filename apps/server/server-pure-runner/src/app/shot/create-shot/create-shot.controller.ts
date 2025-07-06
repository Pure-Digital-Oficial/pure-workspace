import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  CreateShotDto,
  ErrorMessageResult,
  shotBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { CreateShotService } from './create-shot.service';

@Controller('create-shot')
export class CreateShotController {
  constructor(private createShotService: CreateShotService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: shotBodySchema,
    })
  )
  async create(
    @Query() query: { userId: string },
    @Body()
    input: Omit<CreateShotDto, 'loggedUserId'>
  ) {
    const result = await this.createShotService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { shotId: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

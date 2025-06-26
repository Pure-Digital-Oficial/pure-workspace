import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUniqueTargetService } from './create-unique-target.service';
import {
  ErrorMessageResult,
  targetBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('create-unique-target')
export class CreateUniqueTargetController {
  constructor(private createUniqueTargetService: CreateUniqueTargetService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: targetBodySchema,
    })
  )
  async create(
    @Query() query: { userId: string },
    @Body() input: { body: { content: string; triggerId: string } }
  ) {
    const result = await this.createUniqueTargetService.create({
      content: input?.body.content ?? '',
      triggerId: input?.body.triggerId ?? '',
      loggedUserId: query?.userId ?? '',
    });
    if (result.isRight()) return { targetId: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

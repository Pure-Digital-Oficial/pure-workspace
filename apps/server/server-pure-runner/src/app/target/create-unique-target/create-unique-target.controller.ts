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
  CreateUniqueTargetDto,
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
    @Body()
    input: Omit<CreateUniqueTargetDto, 'loggedUserId' | 'internalStatus'>
  ) {
    const result = await this.createUniqueTargetService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { targetId: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

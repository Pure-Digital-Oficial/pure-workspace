import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateTargetsService } from './create-targets.service';
import {
  CreateTargetsDto,
  ErrorMessageResult,
  targetsBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('create-targets')
export class CreateTargetsController {
  constructor(private createTargetsService: CreateTargetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: targetsBodySchema,
    })
  )
  async create(
    @Query() query: { userId: string },
    @Body()
    input: Omit<CreateTargetsDto, 'loggedUserId'>
  ) {
    const result = await this.createTargetsService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { targetIds: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  CreateShotModelDto,
  ErrorMessageResult,
  shotModelBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { CreateShotModelService } from './create-shot-model.service';

@Controller('create-shot-model')
export class CreateShotModelController {
  constructor(private createShotModelService: CreateShotModelService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: shotModelBodySchema,
    })
  )
  async create(
    @Query() query: { userId: string },
    @Body()
    input: Omit<CreateShotModelDto, 'loggedUserId'>
  ) {
    const result = await this.createShotModelService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { shotModelId: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

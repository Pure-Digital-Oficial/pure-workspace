import {
  Body,
  Controller,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { EditTargetService } from './edit-target.service';
import {
  targetBodySchema,
  ErrorMessageResult,
  idInParamSchema,
  userIdQuerySchema,
  EditTargetDto,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('edit-target')
export class EditTargetController {
  constructor(private readonly editTriggerService: EditTargetService) {}

  @Put(':id')
  @UsePipes(
    new ZodValidationPipe({
      param: idInParamSchema,
      query: userIdQuerySchema,
      body: targetBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async edit(
    @Param() param: { id: string },
    @Query() query: { userId: string },
    @Body() input: Omit<EditTargetDto, 'id' | 'loggedUserId'>
  ) {
    const result = await this.editTriggerService.edit({
      ...input,
      id: param?.id ?? '',
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { targetId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

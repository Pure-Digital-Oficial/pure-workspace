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
    @Body() input: { body: { content: string; triggerId: string } }
  ) {
    const result = await this.editTriggerService.edit({
      content: input.body.content ?? '',
      triggerId: input.body.triggerId ?? '',
      loggedUserId: query.userId ?? '',
      id: param.id ?? '',
    });

    if (result.isRight()) return { targetId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

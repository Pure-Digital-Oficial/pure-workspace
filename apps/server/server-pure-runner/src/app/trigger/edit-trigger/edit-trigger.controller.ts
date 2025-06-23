import {
  Body,
  Controller,
  Param,
  Put,
  Query,
  //   UseGuards,
  UsePipes,
} from '@nestjs/common';
import { EditTriggerService } from './edit-trigger.service';
import {
  EditTriggerDto,
  editTriggerSchema,
  ErrorMessageResult,
  idInParamSchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';

@Controller('edit-trigger')
export class EditTriggerController {
  constructor(private readonly editTriggerService: EditTriggerService) {}

  @Put(':id')
  @UsePipes(
    new ZodValidationPipe({
      param: idInParamSchema,
      query: userIdQuerySchema,
      body: editTriggerSchema,
    })
  )
  //   @UseGuards(JwtAdminGuard)
  async edit(
    @Param() param: { id: string },
    @Query() query: { userId: string },
    @Body() input: Omit<EditTriggerDto, 'id' | 'loggedUserId'>
  ) {
    const result = await this.editTriggerService.edit({
      ...input,
      loggedUserId: query.userId ?? '',
      id: param.id ?? '',
    });

    if (result.isRight()) return { triggerId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

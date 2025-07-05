import {
  Body,
  Controller,
  Param,
  Put,
  Query,
  //UseGuards,
  UsePipes,
} from '@nestjs/common';
import { EditShotModelService } from './edit-shot-model.service';
import {
  shotModelBodySchema,
  ErrorMessageResult,
  idInParamSchema,
  userIdQuerySchema,
  EditShotModelDto,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
//import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('edit-shot-model')
export class EditShotModelController {
  constructor(private readonly editShotModelService: EditShotModelService) {}

  @Put(':id')
  @UsePipes(
    new ZodValidationPipe({
      param: idInParamSchema,
      query: userIdQuerySchema,
      body: shotModelBodySchema,
    })
  )
  //@UseGuards(JwtAuthGuard)
  async edit(
    @Param() param: { id: string },
    @Query() query: { userId: string },
    @Body() input: Omit<EditShotModelDto, 'id' | 'loggedUserId'>
  ) {
    const result = await this.editShotModelService.edit({
      ...input,
      id: param?.id ?? '',
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { shotModelId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

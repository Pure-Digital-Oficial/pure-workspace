import {
  Controller,
  Delete,
  Param,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  userIdQuerySchema,
  ErrorMessageResult,
  idInParamSchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { DeleteShotModelService } from './delete-shot-model.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('delete-shot-model')
export class DeleteShotModelController {
  constructor(
    private readonly deleteShotModelService: DeleteShotModelService
  ) {}

  @UsePipes(
    new ZodValidationPipe({
      param: idInParamSchema,
      query: userIdQuerySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param() param: { id: string },
    @Query() query: { userId: string }
  ) {
    const result = await this.deleteShotModelService.delete({
      id: param?.id ?? '',
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { shotModelId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

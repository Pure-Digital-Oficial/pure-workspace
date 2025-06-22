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
import { DeleteTriggerService } from './delete-trigger.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-trigger')
export class DeleteTriggerController {
  constructor(private readonly deleteTriggerService: DeleteTriggerService) {}

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
    const result = await this.deleteTriggerService.delete({
      id: param?.id ?? '',
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { trigger_id: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

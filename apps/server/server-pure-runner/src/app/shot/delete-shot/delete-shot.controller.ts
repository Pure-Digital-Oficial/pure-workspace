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
import { DeleteShotService } from './delete-shot.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-shot')
export class DeleteShotController {
  constructor(private readonly deleteShotService: DeleteShotService) {}

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
    const result = await this.deleteShotService.delete({
      id: param?.id ?? '',
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { shotId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

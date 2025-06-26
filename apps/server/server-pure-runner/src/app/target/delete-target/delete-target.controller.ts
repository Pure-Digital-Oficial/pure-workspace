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
import { DeleteTargetService } from './delete-target.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-target')
export class DeleteTargetController {
  constructor(private readonly deleteTargetService: DeleteTargetService) {}

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
    const result = await this.deleteTargetService.delete({
      id: param?.id ?? '',
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { targetId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

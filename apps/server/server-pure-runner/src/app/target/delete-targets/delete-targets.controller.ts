import {
  Controller,
  Delete,
  Query,
  Body,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  userIdQuerySchema,
  ErrorMessageResult,
  deleteTargetsBodySchema,
  DeleteTargetsDto,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { DeleteTargetsService } from './delete-targets.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-targets')
export class DeleteTargetsController {
  constructor(private readonly deleteTargetsService: DeleteTargetsService) {}

  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: deleteTargetsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(
    @Query() query: { userId: string },
    @Body() input: Omit<DeleteTargetsDto, 'loggedUserId'>
  ) {
    const result = await this.deleteTargetsService.delete({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { targetIds: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}

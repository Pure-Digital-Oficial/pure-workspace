import {
  Controller,
  Delete,
  Param,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ErrorMessageResult, userIdQuerySchema } from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { DeleteBudgetService } from './delete-budget.service';

@Controller('budget/delete-budget')
export class DeleteBudgetController {
  constructor(private deleteBudgetService: DeleteBudgetService) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
    })
  )
  async delete(@Param('id') id: string, @Query() query: { userId: string }) {
    const result = await this.deleteBudgetService.delete({
      loggedUserId: query?.userId ?? '',
      id,
    });

    if (result.isRight()) return { budget_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

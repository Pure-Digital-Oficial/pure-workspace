import {
  Body,
  Controller,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  EditBudgetDto,
  ErrorMessageResult,
  budgetBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { EditBudgetService } from './edit-budget.service';
import { ZodValidationPipe } from '../../pipes';

@Controller('budget/edit-budget')
export class EditBudgetController {
  constructor(private editBudgetService: EditBudgetService) {}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: budgetBodySchema,
    })
  )
  async edit(
    @Param('id') id: string,
    @Query() query: { userId: string },
    @Body() input: Omit<EditBudgetDto, 'loggedUserId' | 'id'>
  ) {
    const result = await this.editBudgetService.edit({
      ...input,
      loggedUserId: query?.userId ?? '',
      id,
    });

    if (result.isRight()) return { budget_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

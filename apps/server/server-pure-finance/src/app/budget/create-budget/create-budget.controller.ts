import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  budgetBodySchema,
  CreateBudgetDto,
  ErrorMessageResult,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { CreateBudgetService } from './create-budget.service';

@Controller('budget/create-budget')
export class CreateBudgetController {
  constructor(private createBudgetService: CreateBudgetService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: budgetBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreateBudgetDto, 'loggedUserId'>
  ) {
    const result = await this.createBudgetService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { budget_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  createPaymentHistoryBodySchema,
  CreatePaymentHistoryDto,
  ErrorMessageResult,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../../pipes';
import { CreatePaymentHistoryService } from './create-payment-history.service';

@Controller('payment/create-payment-history')
export class CreatePaymentHistoryController {
  constructor(
    private createPaymentHistoryService: CreatePaymentHistoryService
  ) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: createPaymentHistoryBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreatePaymentHistoryDto, 'loggedUserId'>
  ) {
    const result = await this.createPaymentHistoryService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { payment_history_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

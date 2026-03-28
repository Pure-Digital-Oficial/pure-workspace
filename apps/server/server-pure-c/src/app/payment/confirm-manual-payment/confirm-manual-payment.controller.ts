import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ConfirmManualPaymentDto,
  ErrorMessageResult,
  confirmManualPaymentBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { ConfirmManualPaymentService } from './confirm-manual-payment.service';

@Controller('payment/confirm-manual-payment')
export class ConfirmManualPaymentController {
  constructor(
    private confirmManualPaymentService: ConfirmManualPaymentService
  ) {}

  @Get()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: confirmManualPaymentBodySchema,
    })
  )
  //@UseGuards(JwtAuthGuard)
  async generate(
    @Query() query: { userId: string },
    @Body() input: Omit<ConfirmManualPaymentDto, 'loggedUserId'>
  ) {
    const result = await this.confirmManualPaymentService.generate({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { status: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

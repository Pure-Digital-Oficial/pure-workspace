import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ErrorMessageResult,
  generatePaymentBodySchema,
  GeneratePaymentDto,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { GeneratePaymentService } from './generate-payment.service';

@Controller('payment/generate-payment')
export class GeneratePaymentController {
  constructor(private generatePaymentService: GeneratePaymentService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: generatePaymentBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async generate(
    @Query() query: { userId: string },
    @Body() input: Omit<GeneratePaymentDto, 'loggedUserId'>
  ) {
    const result = await this.generatePaymentService.generate({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

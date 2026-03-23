import {
  Body,
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  ListPaymentMethodsDto,
  listPaymentMethodsBodySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { ListPaymentMethodsService } from './list-payment-methods.service';

@Controller('payment-method/list-payment-methods')
export class ListPaymentMethodsController {
  constructor(private listPaymentMethodsService: ListPaymentMethodsService) {}

  @Get()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listPaymentMethodsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListPaymentMethodsDto, 'loggedUserId'>
  ) {
    const result = await this.listPaymentMethodsService.list({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

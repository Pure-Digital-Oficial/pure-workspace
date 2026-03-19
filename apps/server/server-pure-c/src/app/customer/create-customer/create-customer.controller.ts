import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  customerBodySchema,
  ErrorMessageResult,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { CreateCustomerService } from './create-customer.service';

@Controller('customer/create-customer')
export class CreateCustomerController {
  constructor(private createCustomerService: CreateCustomerService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: customerBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreateCustomerDto, 'loggedUserId'>
  ) {
    const result = await this.createCustomerService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { customer_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

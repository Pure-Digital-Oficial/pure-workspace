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
  customerStatusBodySchema,
  EditCustomerStatusDto,
  ErrorMessageResult,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { EditCustomerStatusService } from './edit-customer-status.service';

@Controller('customer/edit-customer-status')
export class EditCustomerStatusController {
  constructor(private editCustomerStatusService: EditCustomerStatusService) {}

  @Put(':id')
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: customerStatusBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async edit(
    @Param('id') id: string,
    @Query() query: { userId: string },
    @Body() input: Omit<EditCustomerStatusDto, 'loggedUserId'>
  ) {
    const result = await this.editCustomerStatusService.edit({
      ...input,
      id,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { customer_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}

import { Injectable } from '@nestjs/common';
import {
  EditCustomerStatus,
  EditCustomerStatusDto,
} from '@pure-workspace/domain';

@Injectable()
export class EditCustomerStatusService {
  constructor(private useCase: EditCustomerStatus) {}

  async edit(input: EditCustomerStatusDto) {
    return await this.useCase.execute(input);
  }
}

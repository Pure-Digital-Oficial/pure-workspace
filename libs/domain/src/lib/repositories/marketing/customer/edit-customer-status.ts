import { EditCustomerStatusDto } from '../../../dtos';

export interface EditCustomerStatusRepository {
  edit(input: EditCustomerStatusDto): Promise<string>;
}

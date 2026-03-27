import { ConfirmManualPaymentDto } from "../../../dtos";

export interface ConfirmManualPaymentRepository {
  confirm(input: ConfirmManualPaymentDto): Promise<string>;
}

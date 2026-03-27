import { ConfirmManualPaymentDto, ConfirmManualPaymentRepository } from "../../../../index";
import { ConfirmManualPaymentMock } from "../../../entities";

export class ConfirmManualPaymentRepositoryMock implements ConfirmManualPaymentRepository {
inputMock = {} as ConfirmManualPaymentDto;
  async confirm(input: ConfirmManualPaymentDto): Promise<string> {
  this.inputMock = input;
  return ConfirmManualPaymentMock.id
}
}

import { FormControl } from '@angular/forms';

export interface FixedGainForm {
  name: FormControl;
  value: FormControl;
  dayOfReceipt: FormControl;
  frequency: FormControl;
}

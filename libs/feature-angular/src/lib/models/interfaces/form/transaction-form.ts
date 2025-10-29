import { FormControl } from '@angular/forms';

export interface TransactionForm {
  name: FormControl;
  value: FormControl;
  categoryId: FormControl;
  type: FormControl;
}

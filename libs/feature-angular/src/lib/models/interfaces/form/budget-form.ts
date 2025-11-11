import { FormControl } from '@angular/forms';

export interface BudgetForm {
  name: FormControl;
  limitValue: FormControl;
  description: FormControl;
}

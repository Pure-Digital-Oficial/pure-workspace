import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../../models';

@Pipe({
  name: 'transactionType',
})
export class TransactionTypePipe implements PipeTransform {
  transform(value: string): string {
    return TransactionType[value] ?? value;
  }
}

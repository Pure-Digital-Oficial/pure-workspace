import { Pipe, PipeTransform } from '@angular/core';
import { FixedGainFrequencyRecord } from '../../models';

@Pipe({
  name: 'fixedGainFrequency',
})
export class FixedGainFrequencyPipe implements PipeTransform {
  transform(value: string): string {
    return FixedGainFrequencyRecord[value] ?? value;
  }
}

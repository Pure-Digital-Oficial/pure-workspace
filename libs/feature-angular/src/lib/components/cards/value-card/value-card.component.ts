import { CurrencyPipe } from '@angular/common';
import { Component, computed, Input, input } from '@angular/core';

@Component({
  selector: 'lib-value-card',
  imports: [CurrencyPipe],
  templateUrl: './value-card.component.html',
  styleUrl: './value-card.component.scss',
})
export class ValueCardComponent {
  title = input.required<string>();
  value = input.required<number>();
  @Input() translatedTitle = '';
  ajustedTitle = computed(() => {
    return this.translatedTitle || this.title();
  });
}

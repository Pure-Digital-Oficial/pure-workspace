import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-value-card',
  imports: [],
  templateUrl: './value-card.component.html',
  styleUrl: './value-card.component.scss',
})
export class ValueCardComponent {
  title = input.required<string>();
  value = input.required<number>();
}

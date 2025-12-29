import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-graph-card',
  imports: [],
  templateUrl: './graph-card.component.html',
  styleUrl: './graph-card.component.scss',
})
export class GraphCardComponent {
  title = input.required<string>();
}

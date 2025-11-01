import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-default-button-icon',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './default-button-icon.component.html',
  styleUrl: './default-button-icon.component.scss',
})
export class DefaultComponent {
  icon = input.required<string>();
  @Input() ariaLabel = 'icon button';
  @Input() description = '';
  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}

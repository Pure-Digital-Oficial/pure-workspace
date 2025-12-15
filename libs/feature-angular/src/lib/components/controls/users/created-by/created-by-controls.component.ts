import { Component, Input, input } from '@angular/core';
import { CreatedByResponseDto } from '@pure-workspace/domain';

@Component({
  selector: 'lib-created-by-controls',
  imports: [],
  styleUrl: './created-by-controls.component.scss',
  templateUrl: './created-by-controls.component.html',
})
export class CreatedByControlsComponent {
  @Input() title = 'Criado por:';
  createdBy = input.required<CreatedByResponseDto>();
}

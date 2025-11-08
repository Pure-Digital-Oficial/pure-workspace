import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FixedGainResponseDto } from '@pure-workspace/domain';
import { DefaultButtonIconComponent } from '../../../../buttons';
import { FixedGainsService } from '../../../../../services';
import { FixedGainFrequencyPipe } from '../../../../../pipes';

@Component({
  selector: 'lib-list-item-fixed-gains-controls',
  imports: [
    DatePipe,
    CurrencyPipe,
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    DefaultButtonIconComponent,
    FixedGainFrequencyPipe,
  ],
  templateUrl: './list-item-fixed-gain-controls.component.html',
  styleUrl: './list-item-fixed-gain-controls.component.scss',
})
export class ListItemFixedGainControlsComponent {
  fixedGain = input.required<FixedGainResponseDto>();
  fixedGainService = Inject(FixedGainsService);
  @Output() edit = new EventEmitter<FixedGainResponseDto>();
  @Output() delete = new EventEmitter<
    Pick<FixedGainResponseDto, 'id' | 'name'>
  >();

  editAction() {
    this.edit.emit(this.fixedGain());
  }

  deleteAction() {
    this.delete.emit({
      id: this.fixedGain().id,
      name: this.fixedGain().name,
    });
  }
}

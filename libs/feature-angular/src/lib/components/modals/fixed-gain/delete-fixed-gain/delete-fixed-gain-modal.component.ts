import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  Input,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FixedGainResponseDto } from '@pure-workspace/domain';
import {
  DeleteFixedGainService,
  FixedGainsService,
} from '../../../../services';
import { ModalLayoutComponent } from '../../../layouts';

@Component({
  selector: 'lib-delete-fixed-gain-modal',
  templateUrl: 'delete-fixed-gain-modal.component.html',
  styleUrl: 'delete-fixed-gain-modal.component.scss',
  imports: [MatDialogModule, ModalLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteFixedGainModalComponent {
  private dialogRef = inject(MatDialogRef<DeleteFixedGainModalComponent>);
  private deleteFixedGainService = inject(DeleteFixedGainService);
  private fixedGainsService = inject(FixedGainsService);
  @Input() title = 'Tem certeza que deseja excluir o ganho fixo';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public fixedGainData: Pick<FixedGainResponseDto, 'id' | 'name'>
  ) {}

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.deleteFixedGainService
      .delete({
        id: this.fixedGainData.id,
      })
      .subscribe((fixedGain) => {
        if (fixedGain) {
          this.fixedGainsService
            .listFixedGains(fixedGain.fixed_gain_id)
            .subscribe();
          this.close();
        }
      });
  }
}

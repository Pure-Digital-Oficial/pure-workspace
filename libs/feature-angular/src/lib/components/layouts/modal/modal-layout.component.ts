import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultComponent } from '../../buttons';

@Component({
  selector: 'lib-modal-layout',
  templateUrl: 'modal-layout.component.html',
  styleUrl: 'modal-layout.component.scss',
  imports: [MatDialogModule, MatButtonModule, DefaultComponent],
})
export class ModalLayoutComponent {
  @Input() title = 'Modal Title';
  @Input() cancelButtonTitle = 'Cancelar';
  @Input() actionButtonTitle = 'Enviar';
  @Output() clicked = new EventEmitter<void>();
  @Output() submited = new EventEmitter<void>();

  onClose() {
    this.clicked.emit();
  }

  onSubmit() {
    this.submited.emit();
  }
}

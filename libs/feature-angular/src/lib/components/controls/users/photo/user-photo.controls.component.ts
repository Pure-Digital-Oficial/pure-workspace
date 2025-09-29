import { Component, inject, Input, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SessionService } from '../../../../services';
import { SessionResponseDto } from '@pure-workspace/domain';

@Component({
  selector: 'lib-user-photo-controls',
  imports: [MatDividerModule],
  styleUrl: './user-photo.controls.component.scss',
  templateUrl: './user-photo.controls.component.html',
})
export class UserPhotoControlsComponent {
  private sessionService = inject(SessionService);
  userData = signal<Partial<SessionResponseDto>>({});
  @Input() nicknameTitle = 'Conectado com: ';

  constructor() {
    this.userData.set(this.sessionService.getSession());
  }
}

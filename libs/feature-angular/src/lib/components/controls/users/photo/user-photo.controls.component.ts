import { Component, inject } from '@angular/core';
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
  userData: Partial<SessionResponseDto> = {} as Partial<SessionResponseDto>;

  constructor() {
    this.userData = this.sessionService.getSession();
  }
}

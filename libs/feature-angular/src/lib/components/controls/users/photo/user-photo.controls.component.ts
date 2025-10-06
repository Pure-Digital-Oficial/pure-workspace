import { Component, computed, inject, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SessionService } from '../../../../services';

@Component({
  selector: 'lib-user-photo-controls',
  imports: [MatDividerModule],
  styleUrl: './user-photo.controls.component.scss',
  templateUrl: './user-photo.controls.component.html',
})
export class UserPhotoControlsComponent {
  private sessionService = inject(SessionService);
  userData = computed(() => this.sessionService.session());
  @Input() nicknameTitle = 'Conectado com: ';

  constructor() {
    this.sessionService.findSession().subscribe();
  }
}

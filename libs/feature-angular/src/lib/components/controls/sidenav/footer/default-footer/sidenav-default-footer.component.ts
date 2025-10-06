import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThemeColorControlsComponent } from '../../..';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../../services';

@Component({
  selector: 'lib-sidenav-default-footer',
  imports: [
    ThemeColorControlsComponent,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sidenav-default-footer.component.html',
  styleUrl: './sidenav-default-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavDefaultFooterComponent {
  private authService = inject(AuthService);
  readonly panelOpenState = signal(false);
  @Input() themeTitle = 'Tema';
  @Input() logoutTitle = 'Sair';

  logout() {
    this.authService.logout();
  }
}

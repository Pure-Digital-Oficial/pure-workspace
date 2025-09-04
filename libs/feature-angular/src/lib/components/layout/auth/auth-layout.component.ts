import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../../services';

@Component({
  selector: 'lib-auth-layout',
  imports: [MatButtonModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  themeService = inject(ThemeService);
}

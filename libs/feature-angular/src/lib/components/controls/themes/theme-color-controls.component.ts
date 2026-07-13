import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService } from '../../../services';

@Component({
  selector: 'lib-theme-color-controls',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './theme-color-controls.component.html',
  styleUrl: './theme-color-controls.component.scss',
})
export class ThemeColorControlsComponent {
  @Input() flexDirection = 'column';
  @Input() buttonText = true;
  themeService = inject(ThemeService);

  onThemeSelected(event: MatSelectChange) {
    this.themeService.setTheme(event.value);
  }

  onModeChanged() {
    this.themeService.toggleDarkMode();
  }
}

import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, signal, inject, effect, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import {
  ThemeColorsType,
  themesColorsByLangue,
  themesList,
} from '../../../models';

@Component({
  selector: 'lib-themes-colors-controls',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './themes-colors-controls.component.html',
  styleUrl: './themes-colors-controls.component.scss',
})
export class ThemesColorsControlsComponent {
  isDarkMode = signal(false);
  theme = signal<ThemeColorsType>('purple');

  themeList = themesList;
  themeText = computed(() => this.getThemeColor(this.theme())?.color ?? '');
  private _document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const html = this._document.documentElement;
      this._document.body.classList.toggle('dark-mode', this.isDarkMode());

      for (const item of this.themeList) {
        html.classList.remove(`html-theme-${item}`);
      }

      html.classList.add(`html-theme-${this.theme()}`);
    });
  }

  getThemeColor(selectedColor: string) {
    const color = themesColorsByLangue.find((c) => c.color === selectedColor);
    return color;
  }

  onThemeSelected(event: MatSelectChange) {
    const value = event.value as ThemeColorsType;
    this.theme.set(value);
  }
}

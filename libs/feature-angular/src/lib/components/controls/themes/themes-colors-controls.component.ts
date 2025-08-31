import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Component, signal, inject, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ThemeColorsType, ThemesList } from '../../../models';

@Component({
  selector: 'lib-themes-colors-controls',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './themes-colors-controls.component.html',
  styleUrl: './themes-colors-controls.component.scss',
})
export class ThemesColorsControlsComponent {
  isDarkMode = signal(false);
  theme = signal<ThemeColorsType>('purple');
  themeList = ThemesList;
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

  displayFn(theme: string): string {
    return theme ? theme : '';
  }

  onThemeSelected(event: unknown): void {
    const { option } = event as MatAutocompleteSelectedEvent;
    const value = option.value as ThemeColorsType;
    console.log(`passou ${value}`);
    this.setTheme(value);
  }

  setTheme(theme: ThemeColorsType) {
    this.theme.set(theme as ThemeColorsType);
  }
}

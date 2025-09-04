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
import {
  getItemLocalStorage,
  setItemLocalStorageService,
} from '../../../services';
import { environment } from '../../../environments';

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
  darkMode = signal(false);
  selectedTheme = signal<ThemeColorsType>('purple');

  readonly themeList = themesList;
  readonly selectedThemeLabel = computed(
    () => this.getThemeColor(this.selectedTheme())?.color ?? ''
  );

  private themeModeKey = environment.themeModeKey;
  private themeColorKey = environment.themeColorKey;

  private readonly _document = inject(DOCUMENT);

  constructor() {
    this._loadFromStorage();

    effect(() => this._applyDarkMode(this.darkMode()));
    effect(() => this._applyTheme(this.selectedTheme()));
  }

  onThemeSelected(event: MatSelectChange) {
    const value = event.value as ThemeColorsType;
    setItemLocalStorageService(this.themeColorKey, value);
    this.selectedTheme.set(value);
  }

  onModeChanged() {
    const mode = !this.darkMode();
    setItemLocalStorageService(this.themeModeKey, mode);
    this.darkMode.set(mode);
  }

  getThemeColor(color: string) {
    return themesColorsByLangue.find((c) => c.color === color);
  }

  private _loadFromStorage() {
    const storedDark = getItemLocalStorage(this.themeModeKey);
    if (typeof storedDark === 'boolean') {
      this.darkMode.set(storedDark);
    }

    const storedColor = getItemLocalStorage(this.themeColorKey);
    if (storedColor) {
      this.selectedTheme.set(storedColor as ThemeColorsType);
    }
  }

  private _applyDarkMode(isDark: boolean) {
    this._document.body.classList.toggle('dark-mode', isDark);
  }

  private _applyTheme(theme: ThemeColorsType) {
    const html = this._document.documentElement;

    this.themeList.forEach((t) => html.classList.remove(`html-theme-${t}`));

    html.classList.add(`html-theme-${theme}`);
  }
}

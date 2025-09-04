import { Injectable, effect, signal, computed, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  ThemeColorsType,
  themesList,
  themesColorsByLangue,
} from '../../models';
import {
  getItemLocalStorage,
  setItemLocalStorageService,
} from '../../services';
import { environment } from '../../environments';

@Injectable({ providedIn: 'root' })
export class ThemeService {
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

  toggleDarkMode() {
    const mode = !this.darkMode();
    setItemLocalStorageService(this.themeModeKey, mode);
    this.darkMode.set(mode);
  }

  setTheme(theme: ThemeColorsType) {
    setItemLocalStorageService(this.themeColorKey, theme);
    this.selectedTheme.set(theme);
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

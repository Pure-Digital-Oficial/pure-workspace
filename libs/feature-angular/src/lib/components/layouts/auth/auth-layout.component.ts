import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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

  @Input() title = '';
  @Input() primaryBtnText = '';
  @Input() secondaryBtnText = '';
  @Input() logoImage = '';
  @Input() mainImage = '';
  @Input() imagemTitle = '';
  @Output() submitted = new EventEmitter<void>();
  @Output() navigated = new EventEmitter<void>();

  submit() {
    this.submitted.emit();
  }

  navigate() {
    this.navigated.emit();
  }
}

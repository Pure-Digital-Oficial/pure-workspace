import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-newsletter-controls',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './newsletter-controls.component.html',
  styleUrl: './newsletter-controls.component.scss',
})
export class NewsletterControlsComponent {
  readonly emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  readonly newsletterTitle = 'A edição de amanhã, antes de todo mundo';
  readonly newsletterSubTitle =
    'Um resumo curto, sem alarde, enviado toda manhã de dia útil. Cancele quando quiser.';
  readonly newsletterFieldLabel = 'Seu e-mail';
  readonly newsletterFieldError = 'Digite um e-mail válido';
  readonly buttonTitle = 'Assinar';

  subscribe(): void {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

    this.emailControl.reset();
  }
}

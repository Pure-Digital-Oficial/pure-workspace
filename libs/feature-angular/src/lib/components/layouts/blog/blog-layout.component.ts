import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BlogJournalComponent } from '../../headers';
import { BodyBlogJournalComponent } from '../../controls';

@Component({
  selector: 'lib-blog-layout',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    BlogJournalComponent,
    BodyBlogJournalComponent,
  ],
  templateUrl: './blog-layout.component.html',
  styleUrl: './blog-layout.component.scss',
})
export class BlogLayoutComponent {
  readonly emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private readonly snackBar: MatSnackBar) {}

  subscribe(): void {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }
    this.snackBar.open('Inscrição confirmada. Até amanhã de manhã.', 'Fechar', {
      duration: 3500,
    });
    this.emailControl.reset();
  }
}

import { FormGroup } from '@angular/forms';

export function getFormValidationErrors(form: FormGroup): string[] {
  const errorMessages: string[] = [];

  for (const [key, control] of Object.entries(form.controls)) {
    if (control.errors) {
      const label = key;

      if (control.errors['required']) {
        errorMessages.push(`O campo "${label}" é obrigatório.`);
      }

      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        errorMessages.push(
          `"${label}" deve ter pelo menos ${requiredLength} caracteres.`
        );
      }

      if (control.errors['min']) {
        const minValue = control.errors['min'].min;
        errorMessages.push(`"${label}" deve ser maior que ${minValue}.`);
      }

      if (control.errors['max']) {
        const minValue = control.errors['max'].max;
        errorMessages.push(`"${label}" deve ser menor ou igual à ${minValue}.`);
      }

      if (control.errors['email']) {
        errorMessages.push(`"${label}" deve ser um e-mail válido.`);
      }
    }
  }

  return errorMessages;
}

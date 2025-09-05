import { Component, Input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type InputTypes = 'text' | 'email' | 'password';

@Component({
  selector: 'lib-default-input',
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.scss',
})
export class DefaultInputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputTypes = 'text';
  hide = signal(true);

  value = '';
  private onChange: (value: string) => void = (value: string) => {
    return value;
  };
  private onTouched: () => void = () => {
    return;
  };

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

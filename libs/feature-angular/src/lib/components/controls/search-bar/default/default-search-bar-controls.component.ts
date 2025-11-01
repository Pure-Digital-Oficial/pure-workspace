import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  OnDestroy,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DefaultButtonIconComponent } from '../../../buttons';

@Component({
  selector: 'lib-default-search-bar-controls',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    DefaultButtonIconComponent,
  ],
  templateUrl: './default-search-bar-controls.component.html',
  styleUrl: './default-search-bar-controls.component.scss',
})
export class DefaultSearchBarControlsComponent implements OnDestroy {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  searchValue = '';
  @Input() description = 'Criar';
  @Output() valueChange = new EventEmitter<string>();
  @Output() action = new EventEmitter<void>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.valueChange.emit(value);
      });
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.searchValue = value;
    this.searchSubject.next(value);
  }

  onEnter(): void {
    this.valueChange.emit(this.searchValue);
  }

  onButtonClick() {
    this.action.emit();
  }

  onClearClick() {
    this.searchValue = '';
    this.searchSubject.next('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

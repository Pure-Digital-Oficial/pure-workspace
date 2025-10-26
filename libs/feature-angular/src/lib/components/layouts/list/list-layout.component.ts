import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DefaultSearchBarControlsComponent } from '../../controls';
import { MatList } from '@angular/material/list';

@Component({
  selector: 'lib-list-layout',
  imports: [DefaultSearchBarControlsComponent, MatPaginator, MatList],
  templateUrl: './list-layout.component.html',
  styleUrl: './list-layout.component.scss',
})
export class ListLayoutComponent {
  @Input() length = 0;
  @Input() pageSize = 6;
  @Input() pageIndex = 0;
  @Input() ariaLabel = 'Seletor de página';

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() createAction = new EventEmitter<void>();

  pageSizeOptions = [6, 10, 25];

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onCreate() {
    this.createAction.emit();
  }

  onPageEvent(event: PageEvent) {
    this.pageChange.emit(event);
  }
}

import { Component, inject, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { SidenavItem } from '@pure-workspace/domain';
import {
  CreateCategoryTransactionModalComponent,
  DefaultLayoutComponent,
  ListLayoutComponent,
} from '../../../components';
import { AuthService } from '../../../services';

@Component({
  selector: 'lib-category-transactions-container',
  imports: [MatDialogModule, DefaultLayoutComponent, ListLayoutComponent],
  providers: [AuthService],
  templateUrl: './category-transactions.container.component.html',
  styleUrl: './category-transactions.container.component.scss',
})
export class CategoryTransactionsContainerComponent {
  private dialogService = inject(MatDialog);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];

  totalLength = 0;
  pageIndex = 0;
  pageSize = 6;
  pageEvent: PageEvent = {} as PageEvent;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  createCategoryTransactionAction() {
    this.dialogService.open(CreateCategoryTransactionModalComponent);
  }

  onSearchValueChange(value: string) {
    console.log(value);
    //implements
  }

  onPageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    // const skip = e.pageIndex * e.pageSize;
    // const take = e.pageSize;
    // this.featchTransactions(skip, take);
  }
}

import { Component, inject, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FixedGainResponseDto, SidenavItem } from '@pure-workspace/domain';
import {
  CreateCategoryTransactionModalComponent,
  CreateFixedGainModalComponent,
  DefaultLayoutComponent,
  ListLayoutComponent,
} from '../../../components';
import { AuthService } from '../../../services';

@Component({
  selector: 'lib-category-transactions-container',
  imports: [MatDialogModule, DefaultLayoutComponent, ListLayoutComponent],
  providers: [AuthService],
  templateUrl: './default-fixed-gain.container.component.html',
  styleUrl: './default-fixed-gain.container.component.scss',
})
export class DefaultFixedGainContainerComponent {
  private dialogService = inject(MatDialog);
  // private categoryTransactionsService = inject(CategoryTransactionsService);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  pageIndex = 0;
  pageSize = 6;
  pageEvent: PageEvent = {} as PageEvent;

  totalLength = 0;

  categoryTransactions = 0;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  // ngOnInit(): void {
  //   this.categoryTransactionsService.listCategoryTransactions().subscribe();
  // }

  createFixedGainAction() {
    this.dialogService.open(CreateFixedGainModalComponent);
  }

  editFixedGainAction(fixedGainResponseDto: FixedGainResponseDto) {
    console.log(fixedGainResponseDto);
  }

  deleteFixedGainAction(
    categoryTransaction: Pick<FixedGainResponseDto, 'id' | 'name'>
  ) {
    console.log(categoryTransaction);
  }

  onSearchValueChange(value: string) {
    // this.categoryTransactionsService
    //   .findCategoryTransactionByFilter({
    //     name: value,
    //   })
    //   .subscribe();
    console.log(value);
  }

  onPageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    const skip = e.pageIndex * e.pageSize;
    const take = e.pageSize;
    this.featchFixedGains(skip, take);
  }

  private featchFixedGains(skip: number, take: number) {
    // this.categoryTransactionsService
    //   .listCategoryTransactionsWithPaginated({ skip, take })
    //   .subscribe();
    console.log(skip, take);
  }
}

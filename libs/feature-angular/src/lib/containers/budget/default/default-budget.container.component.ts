import { Component, inject, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { BudgetResponseDto, SidenavItem } from '@pure-workspace/domain';
import {
  DefaultLayoutComponent,
  ListLayoutComponent,
  CreateBudgetModalComponent,
} from '../../../components';
import { AuthService } from '../../../services';

@Component({
  selector: 'lib-category-transactions-container',
  imports: [MatDialogModule, DefaultLayoutComponent, ListLayoutComponent],
  providers: [AuthService],
  templateUrl: './default-budget.container.component.html',
  styleUrl: './default-budget.container.component.scss',
})
export class DefaultBudgetContainerComponent {
  private dialogService = inject(MatDialog);
  // private fixedGainsService = inject(FixedGainsService);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  pageIndex = 0;
  pageSize = 6;
  pageEvent: PageEvent = {} as PageEvent;

  totalLength = 0; //computed(() => this.fixedGainsService.fixedGains().total);

  fixedGains = 0; //computed(() => this.fixedGainsService.fixedGains().fixedGains);

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  // ngOnInit(): void {
  //   this.fixedGainsService.listFixedGains().subscribe();
  // }

  createFixedGainAction() {
    this.dialogService.open(CreateBudgetModalComponent);
  }

  editFixedGainAction(budgetResponseDto: BudgetResponseDto) {
    // this.dialogService.open(EditFixedGainModalComponent, {
    //   data: fixedGainResponseDto,
    // });
    console.log(budgetResponseDto);
  }

  deleteFixedGainAction(
    budgetResponseDto: Pick<BudgetResponseDto, 'id' | 'name'>
  ) {
    // this.dialogService.open(DeleteFixedGainModalComponent, {
    //   data: fixedGainResponseDto,
    // });
    console.log(budgetResponseDto);
  }

  onSearchValueChange(value: string) {
    // this.fixedGainsService
    //   .findFixedGainsByFilter({
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
    this.featchBudgets(skip, take);
  }

  private featchBudgets(skip: number, take: number) {
    // this.fixedGainsService
    //   .listFixedGainsWithPaginated({ skip, take })
    //   .subscribe();
    console.log(skip, take);
  }
}

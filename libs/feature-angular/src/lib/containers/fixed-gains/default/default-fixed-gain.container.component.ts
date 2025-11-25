import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FixedGainResponseDto, SidenavItem } from '@pure-workspace/domain';
import {
  CreateFixedGainModalComponent,
  DefaultLayoutComponent,
  ListLayoutComponent,
  ListItemFixedGainControlsComponent,
  EditFixedGainModalComponent,
  DeleteFixedGainModalComponent,
} from '../../../components';
import { AuthService, FixedGainsService } from '../../../services';

@Component({
  selector: 'lib-category-transactions-container',
  imports: [
    MatDialogModule,
    DefaultLayoutComponent,
    ListLayoutComponent,
    ListItemFixedGainControlsComponent,
  ],
  providers: [AuthService],
  templateUrl: './default-fixed-gain.container.component.html',
  styleUrl: './default-fixed-gain.container.component.scss',
})
export class DefaultFixedGainContainerComponent implements OnInit {
  private dialogService = inject(MatDialog);
  private fixedGainsService = inject(FixedGainsService);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  pageIndex = 0;
  pageSize = 6;
  pageEvent: PageEvent = {} as PageEvent;

  totalLength = computed(
    () => this.fixedGainsService.fixedGains().filteredTotal
  );

  fixedGains = computed(() => this.fixedGainsService.fixedGains().fixedGains);

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  ngOnInit(): void {
    this.fixedGainsService.listFixedGains().subscribe();
  }

  createFixedGainAction() {
    this.dialogService.open(CreateFixedGainModalComponent);
  }

  editFixedGainAction(fixedGainResponseDto: FixedGainResponseDto) {
    this.dialogService.open(EditFixedGainModalComponent, {
      data: fixedGainResponseDto,
    });
  }

  deleteFixedGainAction(
    fixedGainResponseDto: Pick<FixedGainResponseDto, 'id' | 'name'>
  ) {
    this.dialogService.open(DeleteFixedGainModalComponent, {
      data: fixedGainResponseDto,
    });
  }

  onSearchValueChange(value: string) {
    this.fixedGainsService
      .findFixedGainsByFilter({
        name: value,
      })
      .subscribe();
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
    this.fixedGainsService
      .listFixedGainsWithPaginated({ skip, take })
      .subscribe();
  }
}

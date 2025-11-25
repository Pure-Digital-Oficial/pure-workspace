import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import {
  ListBudgetWithCategoryTransactionsResponseDto,
  ListBudgetWithCategoryTransactionsDto,
  ListBudgetWithCategoryTransactionsFiltersDto,
} from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class BudgetWithCategoryTransactionsService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private __budgetWithCategoryTransactions =
    signal<ListBudgetWithCategoryTransactionsResponseDto>(
      {} as ListBudgetWithCategoryTransactionsResponseDto
    );
  private apiUrl = environment.financeUrl;

  budgetWithCategoryTransactions =
    this.__budgetWithCategoryTransactions.asReadonly();

  updateBudgetWithCategoryTransactions(
    budgetWithCategoryTransactions: ListBudgetWithCategoryTransactionsResponseDto
  ) {
    this.__budgetWithCategoryTransactions.set(budgetWithCategoryTransactions);
  }

  clearBudgetWithCategoryTransactions() {
    this.__budgetWithCategoryTransactions.set(
      {} as ListBudgetWithCategoryTransactionsResponseDto
    );
  }

  findBudgetWithCategoryTransactionsByFilter(
    filter: ListBudgetWithCategoryTransactionsFiltersDto
  ) {
    return this.fetchBudgetWithCategoryTransactions({ filters: filter });
  }

  listBudgetWithCategoryTransactionsWithPaginated(
    input: Pick<ListBudgetWithCategoryTransactionsDto, 'skip' | 'take'>
  ) {
    return this.fetchBudgetWithCategoryTransactions(input);
  }

  listBudgetWithCategoryTransactions(id?: string) {
    const cached = this.__budgetWithCategoryTransactions();

    if (!cached || cached.total !== 0) {
      return this.fetchBudgetWithCategoryTransactions();
    }

    if (id) {
      const exists = cached.items.some((t) => t.id === id);
      if (!exists) {
        return this.fetchBudgetWithCategoryTransactions();
      }
    }

    return of(cached);
  }

  private fetchBudgetWithCategoryTransactions(
    ListBudgetWithCategoryTransactionsDto?: Pick<
      ListBudgetWithCategoryTransactionsDto,
      'skip' | 'take' | 'filters'
    >,
    updateCache = true
  ) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient
          .post<ListBudgetWithCategoryTransactionsResponseDto>(
            `${this.apiUrl}/budget-with-category-transaction/list-budget-with-category-transactions`,
            ListBudgetWithCategoryTransactionsDto?.filters
              ? {
                  filters: ListBudgetWithCategoryTransactionsDto.filters,
                  take: ListBudgetWithCategoryTransactionsDto?.take,
                  skip: ListBudgetWithCategoryTransactionsDto?.skip,
                }
              : {
                  take: ListBudgetWithCategoryTransactionsDto?.take,
                  skip: ListBudgetWithCategoryTransactionsDto?.skip,
                },
            {
              params: { userId: session.id as string },
            }
          )
          .pipe(
            tap((response) => {
              if (updateCache) {
                this.updateBudgetWithCategoryTransactions(response);
              }
            }),
            catchError((error) => {
              const errorText =
                'Erro ao listar os as categorias de transações do orçamento';
              this.snackbarService.show(errorText, 'error');
              console.error(`${errorText}:`, error);
              return throwError(() => error);
            })
          );
      })
    );
  }
}

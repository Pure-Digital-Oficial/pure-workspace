import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import {
  ListCategoryTransactionsDto,
  ListCategoryTransactionsFiltersDto,
  ListCategoryTransactionsResponseDto,
  ListTransactionsDto,
} from '@pure-workspace/domain';
import { environment } from '../../../../environments';
import { SessionService } from '../../../auth';
import { SnackbarStackService } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class CategoryTransactionsService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private __categoryTransactions = signal<ListCategoryTransactionsResponseDto>(
    {} as ListCategoryTransactionsResponseDto
  );
  private apiUrl = environment.financeUrl;

  transactions = this.__categoryTransactions.asReadonly();

  updateCategoryTransactions(categories: ListCategoryTransactionsResponseDto) {
    this.__categoryTransactions.set(categories);
  }

  clearCategoryTransactions() {
    this.__categoryTransactions.set({} as ListCategoryTransactionsResponseDto);
  }

  findCategoryTransactionByFilter(filter: ListCategoryTransactionsFiltersDto) {
    return this.fetchCategoryTransactions({ filters: filter });
  }

  listTransactionsWithPaginated(
    input: Pick<ListTransactionsDto, 'skip' | 'take'>
  ) {
    return this.fetchCategoryTransactions(input);
  }

  listTransactions(id?: string) {
    const cached = this.__categoryTransactions();

    if (!cached || cached.total !== 0) {
      return this.fetchCategoryTransactions();
    }

    if (id) {
      const exists = cached.categories.some((t) => t.id === id);
      if (!exists) {
        return this.fetchCategoryTransactions();
      }
    }

    return of(cached);
  }

  private fetchCategoryTransactions(
    listTransactionsDto?: Pick<
      ListCategoryTransactionsDto,
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
          .post<ListCategoryTransactionsResponseDto>(
            `${this.apiUrl}/transaction/list-category-transactions`,
            listTransactionsDto?.filters
              ? {
                  filters: listTransactionsDto.filters,
                  take: listTransactionsDto?.take,
                  skip: listTransactionsDto?.skip,
                }
              : {
                  take: listTransactionsDto?.take,
                  skip: listTransactionsDto?.skip,
                },
            {
              params: { userId: session.id as string },
            }
          )
          .pipe(
            tap((response) => {
              const mappedResponse = {
                ...response,
                transactions: response.categories,
              };
              if (updateCache) {
                this.updateCategoryTransactions(mappedResponse);
              }
            }),
            catchError((error) => {
              const errorText = 'Erro na listagem de Categorias das transações';
              this.snackbarService.show(errorText, 'error');
              console.error(`${errorText}:`, error);
              return throwError(() => error);
            })
          );
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import {
  ListTransactionFiltersDto,
  ListTransactionsDto,
  ListTransactionsResponseDto,
} from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private __transactions = signal<ListTransactionsResponseDto>(
    {} as ListTransactionsResponseDto
  );
  private apiUrl = environment.financeUrl;

  transactions = this.__transactions.asReadonly();

  updateTransactions(transaction: ListTransactionsResponseDto) {
    this.__transactions.set(transaction);
  }

  clearTransactions() {
    this.__transactions.set({} as ListTransactionsResponseDto);
  }

  findTransactionByFilter(filter: ListTransactionFiltersDto) {
    return this.fetchTransactions({ filters: filter });
  }

  listTransactionsWithPaginated(
    input: Pick<ListTransactionsDto, 'skip' | 'take'>
  ) {
    return this.fetchTransactions(input);
  }

  listTransactions(id?: string) {
    const cached = this.__transactions();

    if (!cached || cached.total !== 0) {
      return this.fetchTransactions();
    }

    if (id) {
      const exists = cached.transactions.some((t) => t.id === id);
      if (!exists) {
        return this.fetchTransactions();
      }
    }

    return of(cached);
  }

  private fetchTransactions(
    listTransactionsDto?: Pick<
      ListTransactionsDto,
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
          .post<ListTransactionsResponseDto>(
            `${this.apiUrl}/transaction/list-transactions`,
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
              if (updateCache) {
                this.updateTransactions(response);
              }
            }),
            catchError((error) => {
              console.error('Erro na listagem de transações:', error);
              return throwError(() => error);
            })
          );
      })
    );
  }
}

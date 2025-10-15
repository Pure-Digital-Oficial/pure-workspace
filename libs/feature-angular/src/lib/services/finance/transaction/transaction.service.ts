import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import {
  ListTransactionFiltersDto,
  ListTransactionsResponseDto,
} from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
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
    return this.fetchTransactions(filter);
  }

  listTransactions() {
    if (this.__transactions().total > 0) {
      return of(this.__transactions());
    }

    return this.fetchTransactions();
  }

  private fetchTransactions(
    filters?: ListTransactionFiltersDto,
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
            filters ? { filters: filters } : {},
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

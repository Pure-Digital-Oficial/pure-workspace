import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
import { ListTransactionsResponseDto } from '@pure-workspace/domain';
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

  listTransactions() {
    if (this.__transactions().total > 0) {
      return of(this.__transactions());
    }

    return this.httpClient
      .get<ListTransactionsResponseDto>(
        this.apiUrl + '/transaction/list-transactions',
        {
          params: {
            userId: this.session.getSession().id ?? '',
          },
        }
      )
      .pipe(
        tap((value) => {
          return this.updateTransactions(value);
        }),
        catchError((error) => {
          console.error('Erro na listagem de transacoes:', error);
          return throwError(() => error);
        })
      );
  }
}

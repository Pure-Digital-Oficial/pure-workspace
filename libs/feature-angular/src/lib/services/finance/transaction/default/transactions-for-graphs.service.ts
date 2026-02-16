import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import {
  ListTransactionsForGraphsDto,
  ListTransactionsForGraphsResponseDto,
} from '@pure-workspace/domain';
import { environment } from '../../../../environments';
import { SessionService } from '../../../auth';
import { SnackbarStackService } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class TransactionsForGraphsService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private __transactions = signal<ListTransactionsForGraphsResponseDto[]>(
    [] as ListTransactionsForGraphsResponseDto[]
  );
  private apiUrl = environment.financeUrl;

  transactions = this.__transactions.asReadonly();

  updatedTransactions(transactions: ListTransactionsForGraphsResponseDto[]) {
    this.__transactions.set(transactions);
  }

  clearTransactions() {
    this.__transactions.set([] as ListTransactionsForGraphsResponseDto[]);
  }

  listTransactions(input: Omit<ListTransactionsForGraphsDto, 'loggedUserId'>) {
    return this.fetchTransactions(input);
  }

  private fetchTransactions(
    listTransactionsForGraphsDto: Omit<
      ListTransactionsForGraphsDto,
      'loggedUserId'
    >,
    updateCache = true
  ) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }
        return this.httpClient
          .post<ListTransactionsForGraphsResponseDto[]>(
            `${this.apiUrl}/transaction/list-transactions-for-graphs`,
            listTransactionsForGraphsDto,
            {
              params: { userId: session.id as string },
            }
          )
          .pipe(
            tap((response) => {
              if (updateCache) {
                this.updatedTransactions(response);
              }
            }),
            catchError((error) => {
              const errorText = 'Erro na listagem das transações para gráficos';
              this.snackbarService.show(errorText, 'error');
              console.error(`${errorText}:`, error);
              return throwError(() => error);
            })
          );
      })
    );
  }
}

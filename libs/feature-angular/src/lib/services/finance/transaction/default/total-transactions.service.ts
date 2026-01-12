import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import {
  ListTotalTransactionsDto,
  TotalTransactionsResponseDto,
} from '@pure-workspace/domain';
import { environment } from '../../../../environments';
import { SessionService } from '../../../auth';
import { SnackbarStackService } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class TotalTransactionsService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private __totalTransactions = signal<TotalTransactionsResponseDto[]>(
    [] as TotalTransactionsResponseDto[]
  );
  private apiUrl = environment.financeUrl;

  totalTransactions = this.__totalTransactions.asReadonly();

  updateTotalTransactions(totalTransaction: TotalTransactionsResponseDto[]) {
    this.__totalTransactions.set(totalTransaction);
  }

  clearTotalTransactions() {
    this.__totalTransactions.set([] as TotalTransactionsResponseDto[]);
  }

  listTotalTransactions(input: Omit<ListTotalTransactionsDto, 'loggedUserId'>) {
    const cached = this.__totalTransactions();

    if (cached.length === 0) {
      return this.fetchTotalTransactions(input);
    }

    return of(cached);
  }

  private fetchTotalTransactions(
    listTotalTransactionsDto: Omit<ListTotalTransactionsDto, 'loggedUserId'>,
    updateCache = true
  ) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }
        return this.httpClient
          .post<TotalTransactionsResponseDto[]>(
            `${this.apiUrl}/transaction/list-total-transactions`,
            listTotalTransactionsDto,
            {
              params: { userId: session.id as string },
            }
          )
          .pipe(
            tap((response) => {
              if (updateCache) {
                this.updateTotalTransactions(response);
              }
            }),
            catchError((error) => {
              const errorText = 'Erro na listagem dos totais das transações';
              this.snackbarService.show(errorText, 'error');
              console.error(`${errorText}:`, error);
              return throwError(() => error);
            })
          );
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { CreateTransactionDto } from '@pure-workspace/domain';
import { environment } from '../../../../environments';
import { SessionService } from '../../../auth';
import { SnackbarStackService } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class CreateTransactionService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  create(createTransactionDto: Omit<CreateTransactionDto, 'loggedUserId'>) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.post<{ transaction_id: string }>(
          this.apiUrl + '/transaction/create-transaction',
          createTransactionDto,
          {
            params: { userId: session.id as string },
          }
        );
      }),
      catchError((error) => {
        const errorText = `Erro ao criar a transação: ${createTransactionDto.name}`;
        this.snackbarService.show(errorText, 'error');
        console.error(`${errorText}:`, error);
        return throwError(() => error);
      })
    );
  }
}

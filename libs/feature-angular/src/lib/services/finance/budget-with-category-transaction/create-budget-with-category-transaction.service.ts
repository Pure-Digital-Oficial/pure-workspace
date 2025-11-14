import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { CreateBudgetWithCategoryTransactionDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class CreateBudgetWithCategoryTransactionService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  create(
    createBudgetWithCategoryTransactionDto: Omit<
      CreateBudgetWithCategoryTransactionDto,
      'loggedUserId'
    >
  ) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.post<{ budget_id: string }>(
          this.apiUrl +
            'budget-with-category-transaction/create-budget-with-category-transaction',
          createBudgetWithCategoryTransactionDto,
          {
            params: { userId: session.id as string },
          }
        );
      }),
      catchError((error) => {
        const errorText = `Erro ao cadastrar o orçamento na categoria da transacao`;
        this.snackbarService.show(errorText, 'error');
        console.error(`${errorText}:`, error);
        return throwError(() => error);
      })
    );
  }
}

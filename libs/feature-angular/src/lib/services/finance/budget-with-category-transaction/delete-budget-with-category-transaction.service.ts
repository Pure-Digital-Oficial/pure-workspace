import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { DeleteBudgetWithCategoryTransactionDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class DeleteBudgetWithCategoryTransactionService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  delete(
    deleteBudgetWithCategoryTransactionDto: Omit<
      DeleteBudgetWithCategoryTransactionDto,
      'loggedUserId'
    >
  ) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.delete<{ budget_with_category_id: string }>(
          this.apiUrl +
            'budget-with-category-transaction/delete-budget-with-category-transaction',
          {
            body: deleteBudgetWithCategoryTransactionDto,
            params: { userId: session.id as string },
          }
        );
      }),
      catchError((error) => {
        const errorText =
          'Erro ao deletar o orçamento na categoria da transação';
        this.snackbarService.show(errorText, 'error');
        console.error(`${errorText}:`, error);
        return throwError(() => error);
      })
    );
  }
}

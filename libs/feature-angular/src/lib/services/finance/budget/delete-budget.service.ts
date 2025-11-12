import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { DeleteBudgetDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class DeleteBudgetService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  delete(deleteBudgetDto: Omit<DeleteBudgetDto, 'loggedUserId'>) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        const { id } = deleteBudgetDto;
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.delete<{ budget_id: string }>(
          this.apiUrl + `/budget/delete-budget/${id}`,
          {
            params: { userId: session.id as string },
          }
        );
      }),
      catchError((error) => {
        const errorText = 'Erro ao deletar o ganho fixo';
        this.snackbarService.show(errorText, 'error');
        console.error(`${errorText}:`, error);
        return throwError(() => error);
      })
    );
  }
}

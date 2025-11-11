import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { CreateBudgetDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class CreateBudgetService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  create(createBudgetDto: Omit<CreateBudgetDto, 'loggedUserId'>) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.post<{ fixed_gain_id: string }>(
          this.apiUrl + '/budget/create-budget',
          createBudgetDto,
          {
            params: { userId: session.id as string },
          }
        );
      }),
      catchError((error) => {
        const errorText = `Erro ao cadastrar o orçamento: ${createBudgetDto.name}`;
        this.snackbarService.show(errorText, 'error');
        console.error(`${errorText}:`, error);
        return throwError(() => error);
      })
    );
  }
}

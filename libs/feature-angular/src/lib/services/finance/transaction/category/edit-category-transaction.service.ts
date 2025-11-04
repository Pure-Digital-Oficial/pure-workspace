import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { EditCategoryTransactionDto } from '@pure-workspace/domain';
import { environment } from '../../../../environments';
import { SessionService } from '../../../auth';
import { SnackbarStackService } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class EditCategoryTransactionService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  edit(
    editCategoryTransactionDto: Omit<EditCategoryTransactionDto, 'loggedUserId'>
  ) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        const { id, ...dto } = editCategoryTransactionDto;
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.put<{ transaction_id: string }>(
          this.apiUrl + `/transaction/edit-category-transaction/${id}`,
          dto,
          {
            params: { userId: session.id as string },
          }
        );
      }),
      catchError((error) => {
        const errorText = `Erro ao editar a categoria das transações: ${editCategoryTransactionDto.name}`;
        this.snackbarService.show(errorText, 'error');
        console.error(`${errorText}:`, error);
        return throwError(() => error);
      })
    );
  }
}

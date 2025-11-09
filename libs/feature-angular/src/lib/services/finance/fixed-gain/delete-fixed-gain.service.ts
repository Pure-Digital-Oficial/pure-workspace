import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { DeleteFixedGainDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class DeleteFixedGainService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  delete(deleteFixedGainDto: Omit<DeleteFixedGainDto, 'loggedUserId'>) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        const { id } = deleteFixedGainDto;
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.delete<{ fixed_gain_id: string }>(
          this.apiUrl + `/fixed-gain/delete-fixed-gain/${id}`,
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

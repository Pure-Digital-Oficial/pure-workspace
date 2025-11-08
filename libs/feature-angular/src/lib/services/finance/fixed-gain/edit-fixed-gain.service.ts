import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { EditFixedGainDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class EditFixedGainService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  edit(editFixedGainDto: Omit<EditFixedGainDto, 'loggedUserId'>) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        const { id, ...dto } = editFixedGainDto;
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.put<{ fixed_gain_id: string }>(
          this.apiUrl + `/fixed-gain/edit-fixed-gain/${id}`,
          dto,
          {
            params: { userId: session.id as string },
          }
        );
      }),
      catchError((error) => {
        const errorText = `Erro ao editar o ganho fixo: ${editFixedGainDto.name}`;
        this.snackbarService.show(errorText, 'error');
        console.error(`${errorText}:`, error);
        return throwError(() => error);
      })
    );
  }
}

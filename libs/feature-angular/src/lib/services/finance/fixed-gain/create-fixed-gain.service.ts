import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { CreateFixedGainDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class CreateFixedGainService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private apiUrl = environment.financeUrl;

  create(createFixedGainDto: Omit<CreateFixedGainDto, 'loggedUserId'>) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.post<{ fixed_gain_id: string }>(
          this.apiUrl + '/fixed-gain/create-fixed-gain',
          createFixedGainDto,
          {
            params: { userId: session.id as string },
          }
        );
      }),
      catchError((error) => {
        const errorText = `Erro ao criar o ganho fixo: ${createFixedGainDto.name}`;
        this.snackbarService.show(errorText, 'error');
        console.error(`${errorText}:`, error);
        return throwError(() => error);
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { DeleteTransactionDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class DeleteTransactionService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private apiUrl = environment.financeUrl;

  delete(deleteTransactionDto: Omit<DeleteTransactionDto, 'loggedUserId'>) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        const { id } = deleteTransactionDto;
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient.delete<{ transaction_id: string }>(
          this.apiUrl + `/transaction/delete-transaction/${id}`,
          {
            params: { userId: session.id as string },
          }
        );
      })
    );
  }
}

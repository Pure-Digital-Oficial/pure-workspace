import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import {
  ListBudgetsDto,
  ListBudgetsFiltersDto,
  ListBudgetsResponseDto,
} from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private __budgets = signal<ListBudgetsResponseDto>(
    {} as ListBudgetsResponseDto
  );
  private apiUrl = environment.financeUrl;

  budgets = this.__budgets.asReadonly();

  updateBudgets(budgets: ListBudgetsResponseDto) {
    this.__budgets.set(budgets);
  }

  clearBudgets() {
    this.__budgets.set({} as ListBudgetsResponseDto);
  }

  findBudgetsByFilter(filter: ListBudgetsFiltersDto) {
    return this.fetchBudgets({ filters: filter });
  }

  listBudgetsWithPaginated(input: Pick<ListBudgetsDto, 'skip' | 'take'>) {
    return this.fetchBudgets(input);
  }

  listBudgets(id?: string) {
    const cached = this.__budgets();

    if (!cached || cached.total !== 0) {
      return this.fetchBudgets();
    }

    if (id) {
      const exists = cached.budgets.some((t) => t.id === id);
      if (!exists) {
        return this.fetchBudgets();
      }
    }

    return of(cached);
  }

  private fetchBudgets(
    listBudgetsDto?: Pick<ListBudgetsDto, 'skip' | 'take' | 'filters'>,
    updateCache = true
  ) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient
          .post<ListBudgetsResponseDto>(
            `${this.apiUrl}/budget/list-budgets`,
            listBudgetsDto?.filters
              ? {
                  filters: listBudgetsDto.filters,
                  take: listBudgetsDto?.take,
                  skip: listBudgetsDto?.skip,
                }
              : {
                  take: listBudgetsDto?.take,
                  skip: listBudgetsDto?.skip,
                },
            {
              params: { userId: session.id as string },
            }
          )
          .pipe(
            tap((response) => {
              if (updateCache) {
                this.updateBudgets(response);
              }
            }),
            catchError((error) => {
              const errorText = 'Erro ao listar os orçamentos';
              this.snackbarService.show(errorText, 'error');
              console.error(`${errorText}:`, error);
              return throwError(() => error);
            })
          );
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import {
  ListFixedGainsDto,
  ListFixedGainsFiltersDto,
  ListFixedGainsResponseDto,
} from '@pure-workspace/domain';
import { environment } from '../../../environments';
import { SessionService } from '../../auth';
import { SnackbarStackService } from '../../utils';
import { FixedGainFrequencyRecord } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class FixedGainsService {
  private httpClient = inject(HttpClient);
  private session = inject(SessionService);
  private snackbarService = inject(SnackbarStackService);
  private __fixedGains = signal<ListFixedGainsResponseDto>(
    {} as ListFixedGainsResponseDto
  );
  private apiUrl = environment.financeUrl;

  fixedGains = this.__fixedGains.asReadonly();

  updateFixedGains(fixedGains: ListFixedGainsResponseDto) {
    this.__fixedGains.set(fixedGains);
  }

  clearFixedGains() {
    this.__fixedGains.set({} as ListFixedGainsResponseDto);
  }

  findFixedGainsByFilter(filter: ListFixedGainsFiltersDto) {
    return this.fetchFixedGains({ filters: filter });
  }

  listFixedGainsWithPaginated(input: Pick<ListFixedGainsDto, 'skip' | 'take'>) {
    return this.fetchFixedGains(input);
  }

  listFixedGains(id?: string) {
    const cached = this.__fixedGains();

    if (!cached || cached.total !== 0) {
      return this.fetchFixedGains();
    }

    if (id) {
      const exists = cached.fixedGains.some((t) => t.id === id);
      if (!exists) {
        return this.fetchFixedGains();
      }
    }

    return of(cached);
  }

  private mapFixedGainFrequency(frequency: string) {
    return FixedGainFrequencyRecord[frequency] ?? frequency;
  }

  private fetchFixedGains(
    listFixedGainsDto?: Pick<ListFixedGainsDto, 'skip' | 'take' | 'filters'>,
    updateCache = true
  ) {
    return this.session.findSession().pipe(
      switchMap((session) => {
        if (!session.id) {
          throw new Error('User ID not available');
        }

        return this.httpClient
          .post<ListFixedGainsResponseDto>(
            `${this.apiUrl}/fixed-gain/list-fixed-gains`,
            listFixedGainsDto?.filters
              ? {
                  filters: listFixedGainsDto.filters,
                  take: listFixedGainsDto?.take,
                  skip: listFixedGainsDto?.skip,
                }
              : {
                  take: listFixedGainsDto?.take,
                  skip: listFixedGainsDto?.skip,
                },
            {
              params: { userId: session.id as string },
            }
          )
          .pipe(
            tap((response) => {
              const mappedResponse = {
                ...response,
                fixedGains: response.fixedGains.map((t) => ({
                  ...t,
                  frequency: this.mapFixedGainFrequency(t.frequency),
                })),
              };
              if (updateCache) {
                this.updateFixedGains(mappedResponse);
              }
            }),
            catchError((error) => {
              const errorText = 'Erro ao listar os ganhos fixos';
              this.snackbarService.show(errorText, 'error');
              console.error(`${errorText}:`, error);
              return throwError(() => error);
            })
          );
      })
    );
  }
}

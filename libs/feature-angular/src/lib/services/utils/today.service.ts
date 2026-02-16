import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodayService {
  getNow(): Date {
    return new Date();
  }

  showTodayDate(): Date {
    const today = this.getNow();

    return today;
  }

  addDays(days: number): Date {
    const date = this.getNow();

    date.setDate(date.getDate() + days);
    return date;
  }

  getLess30Days(): Date {
    const date = this.addDays(-30);
    return date;
  }

  getLess1Year(): Date {
    const date = this.addDays(-365);
    return date;
  }
}

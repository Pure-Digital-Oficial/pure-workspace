import { Injectable, signal } from '@angular/core';
import { SnackbarType } from '../../models';

export interface SnackbarMessage {
  id: number;
  message: string;
  type?: SnackbarType;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class SnackbarStackService {
  private counter = 0;
  messages = signal<SnackbarMessage[]>([]);

  show(
    message: string,
    type: SnackbarMessage['type'] = 'info',
    duration = 4000
  ) {
    const id = ++this.counter;
    const msg: SnackbarMessage = { id, message, type, duration };
    this.messages.update((msgs) => [...msgs, msg]);

    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this.messages.update((msgs) => msgs.filter((m) => m.id !== id));
  }

  clearAll() {
    this.messages.set([]);
  }
}

import { Injectable, signal } from '@angular/core';

export type DialogType = 'add-event' | 'view-day';

export interface DialogState {
  type: DialogType;
  dateKey: string;
}

@Injectable({ providedIn: 'root' })
export class DialogStateService {
  readonly dialogState = signal<DialogState | null>(null);

  open(type: DialogType, dateKey: string): void {
    this.dialogState.set({ type, dateKey });
  }

  close(): void {
    this.dialogState.set(null);
  }
}

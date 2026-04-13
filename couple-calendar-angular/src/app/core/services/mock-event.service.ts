import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventService } from './event.service';
import { CalendarEvent } from '../models/calendar-event.model';

@Injectable()
export class MockEventService extends EventService {
  private _store = signal<Record<string, CalendarEvent[]>>(
    JSON.parse(localStorage.getItem('coupleCalEvents') ?? '{}')
  );

  private persist(): void {
    localStorage.setItem('coupleCalEvents', JSON.stringify(this._store()));
  }

  getAll(): Observable<Record<string, CalendarEvent[]>> {
    return of(this._store());
  }

  getByDate(dateKey: string): Observable<CalendarEvent[]> {
    return of(this._store()[dateKey] ?? []);
  }

  add(event: CalendarEvent): Observable<void> {
    const current = this._store();
    const existing = current[event.dateKey] ?? [];
    this._store.set({ ...current, [event.dateKey]: [...existing, event] });
    this.persist();
    return of(void 0);
  }

  delete(dateKey: string, id: string): Observable<void> {
    const current = this._store();
    const filtered = (current[dateKey] ?? []).filter(e => e.id !== id);
    if (filtered.length === 0) {
      const { [dateKey]: _, ...rest } = current;
      this._store.set(rest);
    } else {
      this._store.set({ ...current, [dateKey]: filtered });
    }
    this.persist();
    return of(void 0);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event.model';

@Injectable({ providedIn: null })
export abstract class EventService {
  abstract getAll(): Observable<Record<string, CalendarEvent[]>>;
  abstract getByDate(dateKey: string): Observable<CalendarEvent[]>;
  abstract add(event: CalendarEvent): Observable<void>;
  abstract delete(dateKey: string, id: string): Observable<void>;
}

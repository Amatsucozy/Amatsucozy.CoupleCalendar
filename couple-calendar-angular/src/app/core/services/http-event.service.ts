import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from './event.service';
import { CalendarEvent } from '../models/calendar-event.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpEventService extends EventService {
  private readonly baseUrl = environment.apiBaseUrl + '/api/events';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Record<string, CalendarEvent[]>> {
    return this.http.get<CalendarEvent[]>(this.baseUrl).pipe(
      map(events => events.reduce((acc, ev) => {
        (acc[ev.dateKey] ??= []).push(ev);
        return acc;
      }, {} as Record<string, CalendarEvent[]>))
    );
  }

  getByDate(dateKey: string): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(`${this.baseUrl}?dateKey=${dateKey}`);
  }

  add(event: CalendarEvent): Observable<void> {
    return this.http.post<void>(this.baseUrl, event);
  }

  delete(dateKey: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

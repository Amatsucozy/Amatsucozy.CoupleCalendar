import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/event.service';
import { DialogStateService } from '../../../../core/services/dialog-state.service';
import { CalendarEvent } from '../../../../core/models/calendar-event.model';
import { DayData } from '../../../../core/models/day-data.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: false,
})
export class CalendarComponent implements OnInit {
  private eventService = inject(EventService);
  protected dialogService = inject(DialogStateService);

  viewYear = signal<number>(new Date().getFullYear());
  viewMonth = signal<number>(new Date().getMonth());

  private _events = signal<Record<string, CalendarEvent[]>>({});

  calendarDays = computed<DayData[]>(() => {
    const year = this.viewYear();
    const month = this.viewMonth();
    const events = this._events();
    const today = new Date();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: DayData[] = [];

    // Leading filler cells
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({
        dateKey: null,
        dayNumber: null,
        isToday: false,
        isCurrentMonth: false,
        events: [],
      });
    }

    // Days in the current month
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      const dateKey = `${year}-${mm}-${dd}`;
      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      days.push({
        dateKey,
        dayNumber: d,
        isToday,
        isCurrentMonth: true,
        events: events[dateKey] ?? [],
      });
    }

    // Trailing filler cells to reach 42 total
    const trailing = 42 - days.length;
    for (let i = 0; i < trailing; i++) {
      days.push({
        dateKey: null,
        dayNumber: null,
        isToday: false,
        isCurrentMonth: false,
        events: [],
      });
    }

    return days;
  });

  ngOnInit(): void {
    this.eventService.getAll().subscribe(all => this._events.set(all));
  }

  getMonthName(): string {
    return new Date(this.viewYear(), this.viewMonth()).toLocaleString('default', {
      month: 'long',
    });
  }

  prevMonth(): void {
    if (this.viewMonth() === 0) {
      this.viewMonth.set(11);
      this.viewYear.update(y => y - 1);
    } else {
      this.viewMonth.update(m => m - 1);
    }
  }

  nextMonth(): void {
    if (this.viewMonth() === 11) {
      this.viewMonth.set(0);
      this.viewYear.update(y => y + 1);
    } else {
      this.viewMonth.update(m => m + 1);
    }
  }

  onCellClick(day: DayData): void {
    if (!day.dateKey) return;

    if (day.events.length > 0) {
      this.dialogService.open('view-day', day.dateKey);
    } else {
      this.dialogService.open('add-event', day.dateKey);
    }
  }

  onEventSaved(): void {
    this.eventService.getAll().subscribe(all => this._events.set(all));
    this.dialogService.close();
  }
}

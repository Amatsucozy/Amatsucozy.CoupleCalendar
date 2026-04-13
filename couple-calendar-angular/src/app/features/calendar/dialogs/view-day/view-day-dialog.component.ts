import { Component, inject, signal, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../../../core/services/event.service';
import { CalendarEvent } from '../../../../core/models/calendar-event.model';
import { PERIODS } from '../../../../core/constants/periods';
import { ACTIVITIES } from '../../../../core/constants/activities';
import { Period } from '../../../../core/models/period.model';
import { Activity } from '../../../../core/models/activity.model';

@Component({
  selector: 'app-view-day-dialog',
  templateUrl: './view-day-dialog.component.html',
  styleUrls: ['./view-day-dialog.component.css'],
  standalone: false,
})
export class ViewDayDialogComponent implements OnInit {
  @Input() dateKey!: string;
  @Output() addMore = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private eventService = inject(EventService);

  readonly periods: Period[] = PERIODS;
  readonly activities: Activity[] = ACTIVITIES;

  events = signal<CalendarEvent[]>([]);

  ngOnInit(): void {
    this.eventService
      .getByDate(this.dateKey)
      .subscribe(events => this.events.set(events));
  }

  deleteEvent(id: string): void {
    this.eventService
      .delete(this.dateKey, id)
      .subscribe(() =>
        this.eventService
          .getByDate(this.dateKey)
          .subscribe(events => this.events.set(events))
      );
  }

  onAddMore(): void {
    this.addMore.emit();
  }

  onClose(): void {
    this.closed.emit();
  }

  getPeriodLabel(periodId: string): string {
    return this.periods.find(p => p.id === periodId)?.label ?? periodId;
  }

  getActivityLabel(activityId: string): string {
    const act = this.activities.find(a => a.id === activityId);
    return act ? `${act.emoji} ${act.label}` : activityId;
  }

  formatDateKey(key: string): string {
    const [year, month, day] = key.split('-').map(Number);
    return new Date(year, month - 1, day)
      .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }

  getPeriodEmoji(periodId: string): string {
    return this.periods.find(p => p.id === periodId)?.emoji ?? '';
  }
}

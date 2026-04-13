import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../../core/services/event.service';
import { CalendarEvent } from '../../../../core/models/calendar-event.model';
import { PERIODS } from '../../../../core/constants/periods';
import { ACTIVITIES } from '../../../../core/constants/activities';
import { Period } from '../../../../core/models/period.model';
import { Activity } from '../../../../core/models/activity.model';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css'],
  standalone: false,
})
export class AddEventDialogComponent {
  @Input() dateKey!: string;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private eventService = inject(EventService);

  readonly periods: Period[] = PERIODS;
  readonly activities: Activity[] = ACTIVITIES;

  form: FormGroup = this.fb.group({
    period: ['', Validators.required],
    activityId: ['', Validators.required],
    note: [''],
  });

  save(): void {
    if (this.form.invalid) return;
    const { period, activityId, note } = this.form.value;
    const event: CalendarEvent = {
      id: crypto.randomUUID(),
      dateKey: this.dateKey,
      period,
      activityId,
      note: note || undefined,
    };
    this.eventService.add(event).subscribe(() => this.saved.emit());
  }

  cancel(): void {
    this.cancelled.emit();
  }

  formatDateKey(key: string): string {
    const [year, month, day] = key.split('-').map(Number);
    return new Date(year, month - 1, day)
      .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
}

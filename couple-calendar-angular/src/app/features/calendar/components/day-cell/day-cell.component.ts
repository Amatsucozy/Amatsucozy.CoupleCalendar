import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DayData } from '../../../../core/models/day-data.model';
import { Activity } from '../../../../core/models/activity.model';
import { ACTIVITIES } from '../../../../core/constants/activities';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.css'],
  standalone: false,
})
export class DayCellComponent {
  @Input() day!: DayData;
  @Output() cellClick = new EventEmitter<DayData>();

  onClick(): void {
    if (this.day.dateKey !== null) {
      this.cellClick.emit(this.day);
    }
  }

  readonly activities: Activity[] = ACTIVITIES;

  getActivity(id: string): Activity | undefined {
    return this.activities.find(a => a.id === id);
  }
}

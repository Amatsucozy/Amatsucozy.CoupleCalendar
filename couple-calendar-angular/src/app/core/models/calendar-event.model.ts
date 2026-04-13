import { PeriodId } from './period.model';
import { ActivityId } from './activity.model';

export interface CalendarEvent {
  id: string;
  dateKey: string;
  period: PeriodId;
  activityId: ActivityId;
  note?: string;
}

import { CalendarEvent } from './calendar-event.model';

export interface DayData {
  dateKey: string | null;
  dayNumber: number | null;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

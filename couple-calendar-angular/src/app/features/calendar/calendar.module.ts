import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayCellComponent } from './components/day-cell/day-cell.component';
import { PeriodLegendComponent } from './components/period-legend/period-legend.component';
import { AddEventDialogComponent } from './dialogs/add-event/add-event-dialog.component';
import { ViewDayDialogComponent } from './dialogs/view-day/view-day-dialog.component';

@NgModule({
  declarations: [
    CalendarComponent,
    DayCellComponent,
    PeriodLegendComponent,
    AddEventDialogComponent,
    ViewDayDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
  ],
})
export class CalendarModule {}

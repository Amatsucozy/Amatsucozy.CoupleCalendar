import { Component } from '@angular/core';
import { PERIODS } from '../../../../core/constants/periods';
import { Period } from '../../../../core/models/period.model';

@Component({
  selector: 'app-period-legend',
  templateUrl: './period-legend.component.html',
  styleUrls: ['./period-legend.component.css'],
  standalone: false,
})
export class PeriodLegendComponent {
  readonly periods: Period[] = PERIODS;
}

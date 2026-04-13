export type PeriodId = 'morning' | 'lunch' | 'afterwork' | 'evening';

export interface Period {
  id: PeriodId;
  label: string;
  emoji: string;
}

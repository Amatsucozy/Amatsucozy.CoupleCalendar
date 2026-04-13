export type ActivityId =
  | 'lunch'
  | 'date'
  | 'stay'
  | 'escort'
  | 'coffee'
  | 'movie'
  | 'walk'
  | 'cook'
  | 'shop'
  | 'travel'
  | 'gym'
  | 'other';

export interface Activity {
  id: ActivityId;
  emoji: string;
  label: string;
}

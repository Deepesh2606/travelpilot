export interface TimeSlot {
  activity: string;
  description: string;
  cost: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  photoUrl?: string;
  morning: TimeSlot;
  afternoon: TimeSlot;
  evening: TimeSlot;
}

export interface BudgetBreakdown {
  accommodation: string;
  food: string;
  activities: string;
  transport: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface ItineraryData {
  id?: string;
  destination: string;
  tagline?: string;
  summary: string;
  travelers: string;
  totalEstimatedCost: string;
  interests: string[];
  coverImageUrl?: string;
  polaroidImageUrl?: string;
  quote?: Quote;
  budget: BudgetBreakdown;
  days: DayPlan[];
  tips: string[];
  handwrittenNotes?: string;
  dateRange?: string;
}

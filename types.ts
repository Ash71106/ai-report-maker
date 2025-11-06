
export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Recipient {
  name: string;
  email: string;
}

export interface AnalysisReport {
  problem: string;
  report: string;
  priority: Priority;
  recipient: Recipient;
  remediationSteps: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

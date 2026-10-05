export interface BookingFormState {
  serviceType: string;
  windowType: string;
  windowCount: number;
  issueDescription: string;
  city: string;
  postalCode: string;
  address: string;
  preferredDate: string;
  preferredTimeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  urgency: 'standard' | 'urgent';
  agreedToTerms: boolean;
}

export interface BookingSubmission extends BookingFormState {
  id: string;
  createdAt: string;
  status: 'nová' | 'potvrzeno' | 'dokončeno';
}

export interface MoravaRegion {
  name: string;
  code: string;
  leadCity: string;
  cities: string[];
  daysInArea: string;
  activeTechCount: number;
  statusText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  priceTag: string;
  description: string;
  included: string[];
  popular?: boolean;
}

export interface DiagnosticHotspot {
  id: string;
  title: string;
  position: { top: string; left: string };
  symptom: string;
  cause: string;
  consequence: string;
  solution: string;
  inspectionFocus: string;
}

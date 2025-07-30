export interface Child {
  id: string;
  name: string;
  photo: string;
  age: number;
  emergencyContacts: EmergencyContact[];
  medicalConditions: MedicalCondition[];
  allergies: string[];
  communicationTips: string[];
  qrCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface MedicalCondition {
  id: string;
  condition: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  medications?: string[];
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'parent';
  name: string;
}
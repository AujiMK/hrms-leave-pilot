import { Child, User } from '@/types/child';

export const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Emma Johnson',
    photo: '/placeholder.svg',
    age: 7,
    emergencyContacts: [
      {
        id: 'contact-1',
        name: 'Sarah Johnson',
        relationship: 'Mother',
        phone: '+1-555-0123',
        email: 'sarah.johnson@email.com',
        isPrimary: true
      },
      {
        id: 'contact-2',
        name: 'Mike Johnson',
        relationship: 'Father',
        phone: '+1-555-0124',
        email: 'mike.johnson@email.com',
        isPrimary: false
      },
      {
        id: 'contact-3',
        name: 'Lisa Smith',
        relationship: 'Grandmother',
        phone: '+1-555-0125',
        isPrimary: false
      }
    ],
    medicalConditions: [
      {
        id: 'condition-1',
        condition: 'Type 1 Diabetes',
        severity: 'High',
        description: 'Requires insulin injections and blood glucose monitoring',
        medications: ['Insulin', 'Glucose tablets']
      }
    ],
    allergies: ['Peanuts', 'Tree nuts', 'Shellfish'],
    communicationTips: [
      'Speaks softly when nervous',
      'Responds well to calm, gentle voice',
      'May need extra time to process questions',
      'Comfortable with female caregivers'
    ],
    qrCode: 'QR001234',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 'child-2',
    name: 'Alex Chen',
    photo: '/placeholder.svg',
    age: 5,
    emergencyContacts: [
      {
        id: 'contact-4',
        name: 'Wei Chen',
        relationship: 'Father',
        phone: '+1-555-0126',
        email: 'wei.chen@email.com',
        isPrimary: true
      },
      {
        id: 'contact-5',
        name: 'Lin Chen',
        relationship: 'Mother',
        phone: '+1-555-0127',
        email: 'lin.chen@email.com',
        isPrimary: false
      }
    ],
    medicalConditions: [
      {
        id: 'condition-2',
        condition: 'Asthma',
        severity: 'Medium',
        description: 'Exercise-induced asthma, has rescue inhaler',
        medications: ['Albuterol inhaler']
      }
    ],
    allergies: ['Eggs', 'Milk'],
    communicationTips: [
      'Bilingual (English/Mandarin)',
      'May mix languages when upset',
      'Loves drawing to communicate',
      'Responds well to visual cues'
    ],
    qrCode: 'QR001235',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: 'child-3',
    name: 'Jordan Williams',
    photo: '/placeholder.svg',
    age: 9,
    emergencyContacts: [
      {
        id: 'contact-6',
        name: 'Ashley Williams',
        relationship: 'Mother',
        phone: '+1-555-0128',
        email: 'ashley.williams@email.com',
        isPrimary: true
      }
    ],
    medicalConditions: [],
    allergies: [],
    communicationTips: [
      'Very articulate and mature for age',
      'May appear independent but still needs adult support',
      'Good at explaining situations clearly',
      'Prefers direct, honest communication'
    ],
    qrCode: 'QR001236',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@childsafety.com',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 'user-2',
    email: 'sarah.johnson@email.com',
    role: 'parent',
    name: 'Sarah Johnson'
  }
];

export const mockQrScans = [
  {
    id: 'scan-1',
    childId: 'child-1',
    childName: 'Emma Johnson',
    scannedAt: '2024-01-25 14:30:00',
    location: 'Downtown Mall',
    scannerInfo: 'Security Officer - Badge #123'
  },
  {
    id: 'scan-2',
    childId: 'child-2',
    childName: 'Alex Chen',
    scannedAt: '2024-01-25 16:45:00',
    location: 'City Park',
    scannerInfo: 'Park Ranger - Station 2'
  },
  {
    id: 'scan-3',
    childId: 'child-1',
    childName: 'Emma Johnson',
    scannedAt: '2024-01-24 11:20:00',
    location: 'School Campus',
    scannerInfo: 'School Nurse'
  }
];
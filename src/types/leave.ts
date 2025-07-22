export type LeaveType = 
  | 'Annual'
  | 'Emergency'
  | 'Medical - Self-Certified'
  | 'Medical - Certified'
  | 'Maternity'
  | 'Paternity'
  | 'Compassionate'
  | 'Marriage'
  | 'Unpaid'
  | 'Prolonged Illness'
  | 'National Representation';

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export type UserRole = 'Employee' | 'Manager' | 'HR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  managerId?: string;
}

export interface LeaveBalance {
  leaveType: LeaveType;
  entitled: number;
  used: number;
  remaining: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  attachments?: string[];
  department: string;
}

export interface TeamMember {
  id: string;
  name: string;
  department: string;
  currentLeave?: {
    type: LeaveType;
    startDate: string;
    endDate: string;
  };
}
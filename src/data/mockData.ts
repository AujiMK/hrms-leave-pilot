import { User, LeaveRequest, LeaveBalance, TeamMember } from '@/types/leave';

export const currentUser: User = {
  id: 'user-1',
  name: 'John Smith',
  email: 'john.smith@company.com',
  role: 'Employee',
  department: 'Engineering',
  managerId: 'mgr-1'
};

export const users: User[] = [
  currentUser,
  {
    id: 'mgr-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Manager',
    department: 'Engineering'
  },
  {
    id: 'hr-1',
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    role: 'HR',
    department: 'Human Resources'
  },
  {
    id: 'emp-2',
    name: 'Alice Chen',
    email: 'alice.chen@company.com',
    role: 'Employee',
    department: 'Engineering',
    managerId: 'mgr-1'
  },
  {
    id: 'emp-3',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    role: 'Employee',
    department: 'Marketing',
    managerId: 'mgr-2'
  }
];

export const leaveBalances: LeaveBalance[] = [
  { leaveType: 'Annual', entitled: 21, used: 8, remaining: 13 },
  { leaveType: 'Emergency', entitled: 3, used: 1, remaining: 2 },
  { leaveType: 'Medical - Self-Certified', entitled: 14, used: 2, remaining: 12 },
  { leaveType: 'Medical - Certified', entitled: 60, used: 0, remaining: 60 },
  { leaveType: 'Maternity', entitled: 98, used: 0, remaining: 98 },
  { leaveType: 'Paternity', entitled: 7, used: 0, remaining: 7 },
  { leaveType: 'Compassionate', entitled: 3, used: 0, remaining: 3 },
  { leaveType: 'Marriage', entitled: 3, used: 0, remaining: 3 },
  { leaveType: 'Unpaid', entitled: 0, used: 0, remaining: 0 }
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: 'lr-1',
    employeeId: 'user-1',
    employeeName: 'John Smith',
    leaveType: 'Annual',
    startDate: '2024-07-25',
    endDate: '2024-07-29',
    days: 5,
    reason: 'Family vacation',
    status: 'Approved',
    submittedDate: '2024-07-15',
    approvedBy: 'Sarah Johnson',
    approvedDate: '2024-07-16',
    department: 'Engineering'
  },
  {
    id: 'lr-2',
    employeeId: 'user-1',
    employeeName: 'John Smith',
    leaveType: 'Medical - Self-Certified',
    startDate: '2024-08-05',
    endDate: '2024-08-06',
    days: 2,
    reason: 'Flu symptoms',
    status: 'Pending',
    submittedDate: '2024-08-04',
    department: 'Engineering'
  },
  {
    id: 'lr-3',
    employeeId: 'emp-2',
    employeeName: 'Alice Chen',
    leaveType: 'Annual',
    startDate: '2024-08-12',
    endDate: '2024-08-16',
    days: 5,
    reason: 'Personal travel',
    status: 'Pending',
    submittedDate: '2024-08-01',
    department: 'Engineering'
  },
  {
    id: 'lr-4',
    employeeId: 'emp-3',
    employeeName: 'Bob Wilson',
    leaveType: 'Emergency',
    startDate: '2024-07-30',
    endDate: '2024-07-30',
    days: 1,
    reason: 'Family emergency',
    status: 'Rejected',
    submittedDate: '2024-07-29',
    department: 'Marketing'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 'user-1',
    name: 'John Smith',
    department: 'Engineering',
    currentLeave: {
      type: 'Annual',
      startDate: '2024-07-25',
      endDate: '2024-07-29'
    }
  },
  {
    id: 'emp-2',
    name: 'Alice Chen',
    department: 'Engineering'
  },
  {
    id: 'emp-4',
    name: 'David Lee',
    department: 'Engineering'
  },
  {
    id: 'emp-5',
    name: 'Emma Davis',
    department: 'Engineering'
  }
];
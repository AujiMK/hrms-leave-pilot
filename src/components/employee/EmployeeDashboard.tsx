import { useState } from 'react';
import { LeaveBalanceCard } from './LeaveBalanceCard';
import { LeaveApplicationForm } from './LeaveApplicationForm';
import { LeaveHistoryTable } from './LeaveHistoryTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Clock, CheckCircle } from 'lucide-react';
import { LeaveBalance, LeaveRequest, LeaveType } from '@/types/leave';
import { leaveBalances, leaveRequests } from '@/data/mockData';

interface EmployeeDashboardProps {
  userId: string;
}

export function EmployeeDashboard({ userId }: EmployeeDashboardProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveType>();
  const [showHistory, setShowHistory] = useState(false);

  const userRequests = leaveRequests.filter(req => req.employeeId === userId);
  const pendingRequests = userRequests.filter(req => req.status === 'Pending');
  const approvedRequests = userRequests.filter(req => req.status === 'Approved');

  const handleApplyLeave = (leaveType: string) => {
    setSelectedLeaveType(leaveType as LeaveType);
    setShowApplicationForm(true);
  };

  const handleViewHistory = () => {
    setShowHistory(true);
  };

  if (showApplicationForm) {
    return (
      <div className="flex justify-center">
        <LeaveApplicationForm
          preselectedType={selectedLeaveType}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedLeaveType(undefined);
          }}
        />
      </div>
    );
  }

  if (showHistory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Leave History</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowHistory(false)}
          >
            Back to Dashboard
          </Button>
        </div>
        <LeaveHistoryTable requests={userRequests} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{leaveBalances.reduce((acc, b) => acc + b.remaining, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Days Available</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold">{pendingRequests.length}</div>
                <div className="text-sm text-muted-foreground">Pending Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold">{approvedRequests.length}</div>
                <div className="text-sm text-muted-foreground">Approved This Year</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Plus className="h-8 w-8 text-accent" />
              <div>
                <Button onClick={() => setShowApplicationForm(true)}>
                  Apply for Leave
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="bg-pending text-pending-foreground">
                      {request.status}
                    </Badge>
                    <div>
                      <div className="font-medium">{request.leaveType}</div>
                      <div className="text-sm text-muted-foreground">
                        {request.startDate} to {request.endDate} ({request.days} days)
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Submitted: {request.submittedDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leave Balances */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Leave Balances</h2>
          <Button variant="outline" onClick={handleViewHistory}>
            View Full History
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaveBalances.map((balance) => (
            <LeaveBalanceCard
              key={balance.leaveType}
              balance={balance}
              onApply={handleApplyLeave}
              onViewHistory={handleViewHistory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
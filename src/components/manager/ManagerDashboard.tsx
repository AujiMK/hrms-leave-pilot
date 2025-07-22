import { useState } from 'react';
import { EmployeeDashboard } from '../employee/EmployeeDashboard';
import { TeamLeaveCalendar } from './TeamLeaveCalendar';
import { PendingApprovalsList } from './PendingApprovalsList';
import { TeamSummaryTable } from './TeamSummaryTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Clock, CheckCircle, Calendar, AlertCircle } from 'lucide-react';
import { leaveRequests, teamMembers } from '@/data/mockData';

interface ManagerDashboardProps {
  userId: string;
}

export function ManagerDashboard({ userId }: ManagerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for manager's team
  const teamRequests = leaveRequests.filter(req => 
    teamMembers.some(member => member.id === req.employeeId)
  );
  
  const pendingApprovals = teamRequests.filter(req => req.status === 'Pending');
  const approvedToday = teamRequests.filter(req => 
    req.status === 'Approved' && req.approvedDate === new Date().toISOString().split('T')[0]
  );
  const teamOnLeave = teamMembers.filter(member => member.currentLeave);

  return (
    <div className="space-y-6">
      {/* Manager Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{teamMembers.length}</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold">{pendingApprovals.length}</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">{teamOnLeave.length}</div>
                <div className="text-sm text-muted-foreground">Currently on Leave</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold">{approvedToday.length}</div>
                <div className="text-sm text-muted-foreground">Approved Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Alerts */}
      {pendingApprovals.length > 0 && (
        <Card className="border-warning">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-warning">
              <AlertCircle className="h-5 w-5" />
              <span>Action Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">
                  You have <strong>{pendingApprovals.length}</strong> pending leave requests awaiting your approval.
                </p>
              </div>
              <Button onClick={() => setActiveTab('approvals')}>
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="approvals">
            Approvals
            {pendingApprovals.length > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {pendingApprovals.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="personal">My Leave</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TeamSummaryTable requests={teamRequests} />
            {pendingApprovals.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingApprovals.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="bg-pending text-pending-foreground">
                            {request.status}
                          </Badge>
                          <div>
                            <div className="font-medium">{request.employeeName}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.leaveType} - {request.days} days
                            </div>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => setActiveTab('approvals')}>
                          Review
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approvals">
          <PendingApprovalsList requests={pendingApprovals} />
        </TabsContent>

        <TabsContent value="team">
          <TeamSummaryTable requests={teamRequests} showAllData />
        </TabsContent>

        <TabsContent value="calendar">
          <TeamLeaveCalendar requests={teamRequests} />
        </TabsContent>

        <TabsContent value="personal">
          <EmployeeDashboard userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
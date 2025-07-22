import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Users, Calendar, Settings, FileText, TrendingUp } from 'lucide-react';
import { leaveRequests, users } from '@/data/mockData';

export function HRDashboard() {
  const totalEmployees = users.filter(u => u.role === 'Employee').length;
  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(req => req.status === 'Pending').length;
  const approvedRequests = leaveRequests.filter(req => req.status === 'Approved').length;

  return (
    <div className="space-y-6">
      {/* HR Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{totalEmployees}</div>
                <div className="text-sm text-muted-foreground">Total Employees</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">{totalRequests}</div>
                <div className="text-sm text-muted-foreground">Total Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold">{pendingRequests}</div>
                <div className="text-sm text-muted-foreground">Pending Review</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold">{Math.round((approvedRequests/totalRequests)*100)}%</div>
                <div className="text-sm text-muted-foreground">Approval Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="requests">All Requests</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave Usage by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Engineering</span>
                    <Badge>65% utilization</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Marketing</span>
                    <Badge>45% utilization</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>HR</span>
                    <Badge>30% utilization</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Annual Leave</span>
                    <Badge variant="outline">60%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Medical Leave</span>
                    <Badge variant="outline">25%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Emergency</span>
                    <Badge variant="outline">15%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>All Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Complete leave request management interface would be here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employee Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Employee leave balances and settings management interface.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Leave policies, blackout dates, and system configuration.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
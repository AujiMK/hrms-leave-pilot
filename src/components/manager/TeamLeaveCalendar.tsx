import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Users } from 'lucide-react';
import { LeaveRequest } from '@/types/leave';

interface TeamLeaveCalendarProps {
  requests: LeaveRequest[];
}

export function TeamLeaveCalendar({ requests }: TeamLeaveCalendarProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const approvedRequests = requests.filter(req => req.status === 'Approved');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <span>Team Leave Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            {approvedRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {request.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{request.employeeName}</div>
                    <div className="text-sm text-muted-foreground">{request.department}</div>
                  </div>
                </div>
                <div className="text-center">
                  <Badge variant="outline">{request.leaveType}</Badge>
                  <div className="text-sm text-muted-foreground mt-1">
                    {request.startDate} - {request.endDate}
                  </div>
                  <div className="text-sm font-medium">{request.days} days</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
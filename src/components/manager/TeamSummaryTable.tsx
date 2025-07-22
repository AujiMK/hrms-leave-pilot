import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Users, Filter, Download } from 'lucide-react';
import { LeaveRequest } from '@/types/leave';
import { useState } from 'react';

interface TeamSummaryTableProps {
  requests: LeaveRequest[];
  showAllData?: boolean;
}

export function TeamSummaryTable({ requests, showAllData = false }: TeamSummaryTableProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = requests.filter(request => {
    const matchesType = filterType === 'all' || request.leaveType === filterType;
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const displayRequests = showAllData ? filteredRequests : filteredRequests.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-approved text-approved-foreground';
      case 'Rejected':
        return 'bg-rejected text-rejected-foreground';
      case 'Pending':
        return 'bg-pending text-pending-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const uniqueLeaveTypes = [...new Set(requests.map(r => r.leaveType))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>{showAllData ? 'Team Leave Overview' : 'Recent Team Activity'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showAllData && (
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by name or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leave Types</SelectItem>
                {uniqueLeaveTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                {showAllData && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={showAllData ? 8 : 7} className="text-center py-8 text-muted-foreground">
                    {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                      ? 'No requests match your filters'
                      : 'No leave requests found'
                    }
                  </TableCell>
                </TableRow>
              ) : (
                displayRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.employeeName}</div>
                        <div className="text-sm text-muted-foreground">{request.employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{request.department}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.leaveType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{request.startDate}</div>
                        <div className="text-muted-foreground">to {request.endDate}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">{request.days}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.submittedDate}</TableCell>
                    {showAllData && (
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {request.status === 'Pending' && (
                            <Button size="sm">
                              Review
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!showAllData && filteredRequests.length > 5 && (
          <div className="mt-4 text-center">
            <Button variant="outline">
              View All {filteredRequests.length} Requests
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
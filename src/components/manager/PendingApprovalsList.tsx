import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';
import { LeaveRequest } from '@/types/leave';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PendingApprovalsListProps {
  requests: LeaveRequest[];
}

export function PendingApprovalsList({ requests }: PendingApprovalsListProps) {
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [comments, setComments] = useState('');
  const { toast } = useToast();

  const handleApprove = (request: LeaveRequest) => {
    toast({
      title: "Request Approved",
      description: `Leave request for ${request.employeeName} has been approved.`
    });
    setSelectedRequest(null);
    setComments('');
  };

  const handleReject = (request: LeaveRequest) => {
    if (!comments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Request Rejected",
      description: `Leave request for ${request.employeeName} has been rejected.`,
      variant: "destructive"
    });
    setSelectedRequest(null);
    setComments('');
  };

  if (requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span>All Caught Up!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No pending leave requests require your attention.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-warning" />
          <span>Pending Approvals ({requests.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => {
                const daysSinceSubmitted = Math.floor(
                  (new Date().getTime() - new Date(request.submittedDate).getTime()) / (1000 * 60 * 60 * 24)
                );
                const isUrgent = daysSinceSubmitted > 3;
                
                return (
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
                    <TableCell>{request.submittedDate}</TableCell>
                    <TableCell>
                      {isUrgent ? (
                        <Badge variant="destructive">Urgent</Badge>
                      ) : (
                        <Badge variant="secondary">Normal</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Leave Request Details</DialogTitle>
                              <DialogDescription>
                                Review and approve or reject this leave request
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedRequest && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Employee</Label>
                                    <p>{selectedRequest.employeeName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Department</Label>
                                    <p>{selectedRequest.department}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Leave Type</Label>
                                    <p>{selectedRequest.leaveType}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Duration</Label>
                                    <p>{selectedRequest.days} days</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Start Date</Label>
                                    <p>{selectedRequest.startDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">End Date</Label>
                                    <p>{selectedRequest.endDate}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label className="text-sm font-medium">Reason</Label>
                                  <p className="mt-1 p-3 bg-muted rounded-md">{selectedRequest.reason}</p>
                                </div>
                                
                                <div>
                                  <Label htmlFor="comments">Comments (Optional for approval, Required for rejection)</Label>
                                  <Textarea
                                    id="comments"
                                    placeholder="Add your comments here..."
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                                
                                <div className="flex space-x-3">
                                  <Button 
                                    onClick={() => handleApprove(selectedRequest)}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleReject(selectedRequest)}
                                    className="flex-1"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            handleApprove(request);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Quick Approve
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
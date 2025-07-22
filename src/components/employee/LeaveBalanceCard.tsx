import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Plus, History } from 'lucide-react';
import { LeaveBalance } from '@/types/leave';

interface LeaveBalanceCardProps {
  balance: LeaveBalance;
  onApply: (leaveType: string) => void;
  onViewHistory: (leaveType: string) => void;
}

export function LeaveBalanceCard({ balance, onApply, onViewHistory }: LeaveBalanceCardProps) {
  const usagePercentage = balance.entitled > 0 ? (balance.used / balance.entitled) * 100 : 0;
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-rejected';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>{balance.leaveType}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{balance.entitled}</div>
            <div className="text-xs text-muted-foreground">Entitled</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-rejected">{balance.used}</div>
            <div className="text-xs text-muted-foreground">Used</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">{balance.remaining}</div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>
        
        {balance.entitled > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Usage</span>
              <span>{usagePercentage.toFixed(0)}%</span>
            </div>
            <Progress 
              value={usagePercentage} 
              className="h-2"
            />
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onApply(balance.leaveType)}
            disabled={balance.remaining === 0}
          >
            <Plus className="h-4 w-4 mr-1" />
            Apply
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewHistory(balance.leaveType)}
          >
            <History className="h-4 w-4 mr-1" />
            History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
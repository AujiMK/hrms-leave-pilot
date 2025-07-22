import { Bell, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types/leave';

interface HeaderProps {
  currentUser: {
    name: string;
    email: string;
    role: UserRole;
  };
  onRoleChange: (role: UserRole) => void;
}

export function Header({ currentUser, onRoleChange }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">LeaveMS</h1>
          <Badge variant="outline" className="ml-2">
            {currentUser.role}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          {/* Role Switcher for Demo */}
          <div className="flex space-x-2">
            <Button
              variant={currentUser.role === 'Employee' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onRoleChange('Employee')}
            >
              Employee
            </Button>
            <Button
              variant={currentUser.role === 'Manager' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onRoleChange('Manager')}
            >
              Manager
            </Button>
            <Button
              variant={currentUser.role === 'HR' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onRoleChange('HR')}
            >
              HR
            </Button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{currentUser.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.email}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
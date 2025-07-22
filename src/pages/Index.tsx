import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { EmployeeDashboard } from '@/components/employee/EmployeeDashboard';
import { ManagerDashboard } from '@/components/manager/ManagerDashboard';
import { HRDashboard } from '@/components/hr/HRDashboard';
import { UserRole } from '@/types/leave';
import { currentUser } from '@/data/mockData';

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>('Employee');
  
  const mockUser = {
    ...currentUser,
    role: userRole
  };

  const renderDashboard = () => {
    switch (userRole) {
      case 'Employee':
        return <EmployeeDashboard userId={mockUser.id} />;
      case 'Manager':
        return <ManagerDashboard userId={mockUser.id} />;
      case 'HR':
        return <HRDashboard />;
      default:
        return <EmployeeDashboard userId={mockUser.id} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentUser={mockUser} 
        onRoleChange={setUserRole}
      />
      <main className="container mx-auto px-6 py-8">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;

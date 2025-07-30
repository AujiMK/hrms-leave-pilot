import { useState } from 'react';
import { QRScanner } from "@/components/qr/QRScanner";
import { ChildProfile } from "@/components/qr/ChildProfile";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Child } from "@/types/child";

const Index = () => {
  const [currentView, setCurrentView] = useState<'scanner' | 'profile' | 'admin-login' | 'admin-dashboard'>('scanner');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleChildFound = (child: Child) => {
    setSelectedChild(child);
    setCurrentView('profile');
  };

  const handleBackToScanner = () => {
    setSelectedChild(null);
    setCurrentView('scanner');
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setCurrentView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('scanner');
  };

  const showAdminLogin = () => {
    setCurrentView('admin-login');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'scanner' && (
        <div>
          <QRScanner onChildFound={handleChildFound} />
          <div className="fixed bottom-4 right-4">
            <button
              onClick={showAdminLogin}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>
      )}
      
      {currentView === 'profile' && selectedChild && (
        <ChildProfile child={selectedChild} onBack={handleBackToScanner} />
      )}
      
      {currentView === 'admin-login' && (
        <AdminLogin onLogin={handleAdminLogin} />
      )}
      
      {currentView === 'admin-dashboard' && (
        <AdminDashboard onLogout={handleAdminLogout} />
      )}
    </div>
  );
};

export default Index;

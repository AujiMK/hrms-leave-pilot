import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  QrCode, 
  AlertTriangle, 
  Activity, 
  Plus,
  Eye,
  Edit,
  Download,
  LogOut 
} from 'lucide-react';
import { mockChildren, mockQrScans } from '@/data/childMockData';
import { ChildForm } from './ChildForm';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [showChildForm, setShowChildForm] = useState(false);
  const [editingChild, setEditingChild] = useState<string | null>(null);

  const totalChildren = mockChildren.length;
  const totalScans = mockQrScans.length;
  const recentScans = mockQrScans.slice(0, 5);
  const medicalAlerts = mockChildren.filter(c => 
    c.medicalConditions.some(m => m.severity === 'Critical' || m.severity === 'High') || 
    c.allergies.length > 0
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="border-b bg-background/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Child Safety Admin Portal</h1>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Children</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChildren}</div>
              <p className="text-xs text-muted-foreground">Registered profiles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">QR Scans Today</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalScans}</div>
              <p className="text-xs text-muted-foreground">Safety checks performed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{medicalAlerts}</div>
              <p className="text-xs text-muted-foreground">Children with medical conditions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active QR Codes</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChildren}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="children" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="children">Children Management</TabsTrigger>
            <TabsTrigger value="scans">QR Scan Activity</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="children" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Children Profiles</h2>
              <Button onClick={() => setShowChildForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Child
              </Button>
            </div>

            <div className="grid gap-4">
              {mockChildren.map((child) => (
                <Card key={child.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold">{child.name}</h3>
                          <p className="text-sm text-muted-foreground">Age: {child.age} | QR: {child.qrCode}</p>
                          <div className="flex gap-2 mt-1">
                            {child.medicalConditions.length > 0 && (
                              <Badge variant="destructive" className="text-xs">Medical</Badge>
                            )}
                            {child.allergies.length > 0 && (
                              <Badge variant="destructive" className="text-xs">Allergies</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingChild(child.id)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4 mr-1" />
                          QR Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scans" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent QR Scan Activity</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Scan History</CardTitle>
                <CardDescription>Recent safety check scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentScans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{scan.childName}</p>
                        <p className="text-sm text-muted-foreground">{scan.location}</p>
                        <p className="text-xs text-muted-foreground">{scan.scannerInfo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{scan.scannedAt}</p>
                        <Badge variant="outline">Scanned</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold">System Settings</h2>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Settings</CardTitle>
                  <CardDescription>Configure QR code generation and expiry</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline">Generate Batch QR Codes</Button>
                  <Button variant="outline">Configure QR Expiry</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Security</CardTitle>
                  <CardDescription>Manage access logs and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline">View Access Logs</Button>
                  <Button variant="outline">Security Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export and backup system data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline">Export All Data</Button>
                  <Button variant="outline">Backup Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {(showChildForm || editingChild) && (
        <ChildForm
          childId={editingChild}
          onClose={() => {
            setShowChildForm(false);
            setEditingChild(null);
          }}
        />
      )}
    </div>
  );
}
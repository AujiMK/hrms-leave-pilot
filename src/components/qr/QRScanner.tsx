import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Camera, Search } from 'lucide-react';
import { mockChildren } from '@/data/childMockData';
import { Child } from '@/types/child';

interface QRScannerProps {
  onChildFound: (child: Child) => void;
}

export function QRScanner({ onChildFound }: QRScannerProps) {
  const [qrCode, setQrCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');

  const handleScan = () => {
    setError('');
    if (!qrCode.trim()) {
      setError('Please enter a QR code');
      return;
    }

    const child = mockChildren.find(c => c.qrCode === qrCode.trim());
    if (child) {
      onChildFound(child);
    } else {
      setError('QR code not found. Please check the code and try again.');
    }
  };

  const simulateQRScan = () => {
    setScanning(true);
    // Simulate camera scanning
    setTimeout(() => {
      const randomChild = mockChildren[Math.floor(Math.random() * mockChildren.length)];
      setQrCode(randomChild.qrCode);
      setScanning(false);
      onChildFound(randomChild);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="h-6 w-6" />
            Child Safety Scanner
          </CardTitle>
          <CardDescription>
            Scan QR code to access child safety information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Button
              onClick={simulateQRScan}
              disabled={scanning}
              className="w-full h-24 text-lg"
              size="lg"
            >
              <Camera className="h-8 w-8 mr-2" />
              {scanning ? 'Scanning...' : 'Open Camera Scanner'}
            </Button>
            {scanning && (
              <div className="mt-4 text-sm text-muted-foreground animate-pulse">
                Point camera at QR code...
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or enter manually
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="qrcode">QR Code</Label>
              <Input
                id="qrcode"
                placeholder="Enter QR code (e.g., QR001234)"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              />
            </div>
            
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                {error}
              </div>
            )}

            <Button onClick={handleScan} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Find Child
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Demo codes: QR001234, QR001235, QR001236</p>
            <p className="text-destructive">🚨 Emergency? Call 911 immediately</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
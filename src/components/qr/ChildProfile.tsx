import { Child } from '@/types/child';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Phone, 
  Mail, 
  AlertTriangle, 
  Heart, 
  MessageCircle, 
  ArrowLeft,
  PhoneCall,
  Clock
} from 'lucide-react';

interface ChildProfileProps {
  child: Child;
  onBack: () => void;
}

export function ChildProfile({ child, onBack }: ChildProfileProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'destructive';
      case 'Medium': return 'outline';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
  };

  const primaryContact = child.emergencyContacts.find(c => c.isPrimary) || child.emergencyContacts[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scanner
          </Button>
          <h1 className="text-2xl font-bold">Child Safety Profile</h1>
        </div>

        {/* Emergency Alert */}
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-destructive">
                <PhoneCall className="h-5 w-5" />
                <span className="font-semibold">Emergency? Call 911 First</span>
              </div>
              <Button size="sm" variant="destructive">
                <Phone className="h-4 w-4 mr-2" />
                911
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Child Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={child.photo} alt={child.name} />
                <AvatarFallback className="text-2xl">
                  {child.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{child.name}</CardTitle>
                <p className="text-muted-foreground">Age: {child.age} years old</p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Last updated: {new Date(child.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {child.emergencyContacts.map((contact, index) => (
              <div key={contact.id}>
                {index > 0 && <Separator />}
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{contact.name}</span>
                      {contact.isPrimary && (
                        <Badge variant="default">Primary</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                    {contact.email && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </p>
                    )}
                  </div>
                  <Button>
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.phone}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {child.medicalConditions.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Medical Conditions
                </h4>
                <div className="space-y-3">
                  {child.medicalConditions.map((condition) => (
                    <div key={condition.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{condition.condition}</span>
                        <Badge variant={getSeverityColor(condition.severity)}>
                          {condition.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {condition.description}
                      </p>
                      {condition.medications && condition.medications.length > 0 && (
                        <div>
                          <span className="text-sm font-medium">Medications: </span>
                          <span className="text-sm">{condition.medications.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {child.allergies.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    Allergies - CRITICAL
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {child.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="text-sm">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Communication Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Communication Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {child.communicationTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button size="lg" className="h-14">
            <PhoneCall className="h-5 w-5 mr-2" />
            Call Primary Contact
          </Button>
          <Button size="lg" variant="destructive" className="h-14">
            <Phone className="h-5 w-5 mr-2" />
            Emergency Services
          </Button>
        </div>
      </div>
    </div>
  );
}
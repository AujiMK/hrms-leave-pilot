import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Save, User, Phone, Heart, AlertTriangle } from 'lucide-react';
import { mockChildren } from '@/data/childMockData';

interface ChildFormProps {
  childId?: string | null;
  onClose: () => void;
}

export function ChildForm({ childId, onClose }: ChildFormProps) {
  const existingChild = childId ? mockChildren.find(c => c.id === childId) : null;
  const isEditing = !!existingChild;

  const [formData, setFormData] = useState({
    name: existingChild?.name || '',
    age: existingChild?.age || '',
    photo: existingChild?.photo || '',
    emergencyContacts: existingChild?.emergencyContacts || [],
    medicalConditions: existingChild?.medicalConditions || [],
    allergies: existingChild?.allergies || [],
    communicationTips: existingChild?.communicationTips || [],
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newTip, setNewTip] = useState('');

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const addCommunicationTip = () => {
    if (newTip.trim()) {
      setFormData(prev => ({
        ...prev,
        communicationTips: [...prev.communicationTips, newTip.trim()]
      }));
      setNewTip('');
    }
  };

  const removeCommunicationTip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      communicationTips: prev.communicationTips.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving child data:', formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {isEditing ? 'Edit Child Profile' : 'Add New Child'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter child's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || '' }))}
                    placeholder="Enter age"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  value={formData.photo}
                  onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
                  placeholder="Enter photo URL or upload"
                />
              </div>
            </CardContent>
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
              {formData.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Contact {index + 1}</h4>
                    <Button variant="ghost" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input placeholder="Name" value={contact.name} readOnly />
                    <Input placeholder="Relationship" value={contact.relationship} readOnly />
                    <Input placeholder="Phone" value={contact.phone} readOnly />
                    <Input placeholder="Email" value={contact.email || ''} readOnly />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Emergency Contact
              </Button>
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
              {/* Medical Conditions */}
              <div>
                <Label className="text-base font-medium">Medical Conditions</Label>
                <div className="space-y-2 mt-2">
                  {formData.medicalConditions.map((condition, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{condition.condition}</span>
                        <Badge variant={condition.severity === 'Critical' ? 'destructive' : 'outline'}>
                          {condition.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{condition.description}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medical Condition
                  </Button>
                </div>
              </div>

              {/* Allergies */}
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Allergies
                </Label>
                <div className="space-y-2 mt-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new allergy"
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                    />
                    <Button onClick={addAllergy}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="flex items-center gap-1">
                        {allergy}
                        <button onClick={() => removeAllergy(index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Communication Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add communication tip"
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCommunicationTip()}
                />
                <Button onClick={addCommunicationTip}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.communicationTips.map((tip, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{tip}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeCommunicationTip(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Update Profile' : 'Create Profile'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
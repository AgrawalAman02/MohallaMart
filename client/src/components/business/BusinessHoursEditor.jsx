import { useState } from 'react';
import { useUpdateBusinessHoursMutation } from '@/api/businessApiSlice';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BusinessHoursEditor({ businessId, initialHours }) {
  const [hours, setHours] = useState(initialHours || {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '09:00', close: '17:00' },
    sunday: { open: 'closed', close: 'closed' }
  });
  
  const [updateBusinessHours, { isLoading }] = useUpdateBusinessHoursMutation();
  const { toast } = useToast();

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const handleToggleDay = (day) => {
    setHours(prev => ({
      ...prev,
      [day]: prev[day].open === 'closed' 
        ? { open: '09:00', close: '17:00' }
        : { open: 'closed', close: 'closed' }
    }));
  };

  const handleTimeChange = (day, type, value) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: value }
    }));
  };

  const handleSave = async () => {
    try {
      await updateBusinessHours({
        businessId,
        hours
      }).unwrap();
      
      toast({
        title: 'Success',
        description: 'Business hours updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update business hours',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      {days.map(day => (
        <div key={day} className="flex items-center gap-4">
          <div className="w-32">
            <Label className="capitalize">{day}</Label>
          </div>
          <Switch
            checked={hours[day]?.open !== 'closed'}
            onCheckedChange={() => handleToggleDay(day)}
          />
          {hours[day]?.open !== 'closed' && (
            <div className="flex items-center gap-2">
              <Select
                value={hours[day]?.open}
                onValueChange={(value) => handleTimeChange(day, 'open', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>to</span>
              <Select
                value={hours[day]?.close}
                onValueChange={(value) => handleTimeChange(day, 'close', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ))}
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Business Hours'}
      </Button>
    </div>
  );
}
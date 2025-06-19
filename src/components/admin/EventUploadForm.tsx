
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Upload, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EventFormData {
  id?: number;
  title: string;
  venue: string;
  date: Date;
  image: string;
  genre: string;
  isFavorite?: boolean;
  ticketLink?: string;
}

const EventUploadForm = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    venue: '',
    date: new Date(),
    image: '',
    genre: '',
    isFavorite: false,
    ticketLink: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, date }));
    }
  };
  
  const handleToggleFavorite = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isFavorite: checked }));
  };
  
  const handleAddEvent = () => {
    // Basic validation
    if (!formData.title || !formData.venue || !formData.image || !formData.genre) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newEvent = {
      ...formData,
      id: Date.now() // Simple unique ID
    };
    
    // If this is a favorite event, ensure it's the only favorite
    let updatedEvents = [...events];
    if (newEvent.isFavorite) {
      updatedEvents = updatedEvents.map(event => ({
        ...event,
        isFavorite: false
      }));
    }
    
    // Add event to the list
    setEvents([...updatedEvents, newEvent]);
    
    // Reset form
    setFormData({
      title: '',
      venue: '',
      date: new Date(),
      image: '',
      genre: '',
      isFavorite: false,
      ticketLink: ''
    });
    
    // Show success message
    toast({
      title: "Event created",
      description: `"${newEvent.title}" at ${newEvent.venue} added successfully${newEvent.isFavorite ? ' as featured event' : ''}`
    });
    
    // In a real app, this would save to a backend/database
    const eventsToSave = [...updatedEvents, newEvent];
    localStorage.setItem('trendingEvents', JSON.stringify(eventsToSave));
  };
  
  const handleRemoveEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast({
      title: "Event removed",
      description: "The event has been removed"
    });
    
    // Update local storage
    const updatedEvents = events.filter(event => event.id !== id);
    localStorage.setItem('trendingEvents', JSON.stringify(updatedEvents));
  };
  
  const handlePublishChanges = () => {
    // In a real app, this would send to a backend API
    localStorage.setItem('trendingEvents', JSON.stringify(events));
    toast({
      title: "Changes published",
      description: `${events.length} events are now live`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-clubstro-light-gray p-4 rounded-lg">
          <h3 className="font-medium text-white">Create New Event</h3>
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="venue" className="text-white">Venue</Label>
            <Input
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter venue name"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="text-white">Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-clubstro-dark border-white/10 text-white"
                >
                  {formData.date ? (
                    format(formData.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="genre" className="text-white">Genre</Label>
            <Input
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Enter event genre"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image" className="text-white">Flyer Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/flyer.jpg"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ticketLink" className="text-white">Ticket Link (optional)</Label>
            <Input
              id="ticketLink"
              name="ticketLink"
              value={formData.ticketLink || ''}
              onChange={handleChange}
              placeholder="https://example.com/tickets"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="favorite"
              checked={formData.isFavorite}
              onCheckedChange={handleToggleFavorite}
            />
            <Label htmlFor="favorite" className="text-white flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              Feature this event (shows first)
            </Label>
          </div>
          
          <Button onClick={handleAddEvent} className="w-full bg-clubstro-blue hover:bg-clubstro-blue/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
        
        <div className="bg-clubstro-light-gray p-4 rounded-lg overflow-hidden">
          <h3 className="font-medium text-white mb-4">Current Events</h3>
          
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No events created yet. Create some events to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Featured</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium text-white">{event.title}</TableCell>
                      <TableCell className="text-white">{format(new Date(event.date), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        {event.isFavorite && <Star className="h-4 w-4 text-yellow-400" />}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveEvent(event.id!)} 
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10 p-1 h-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <Button 
            onClick={handlePublishChanges} 
            disabled={events.length === 0} 
            className="w-full mt-4 bg-clubstro-blue hover:bg-clubstro-blue/90"
          >
            <Upload className="h-4 w-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventUploadForm;

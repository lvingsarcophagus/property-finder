"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, MapPin, User, Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "@/components/use-toast"
import { format, isSameDay } from "date-fns"

interface CalendarEvent {
  id: string
  title: string
  description: string
  date: Date
  time: string
  type: "viewing" | "meeting" | "inspection" | "other"
  location: string
  client: string
  propertyId?: string
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    type: "viewing" as CalendarEvent["type"],
    location: "",
    client: "",
  })

  // Sample events data
  useEffect(() => {
    const sampleEvents: CalendarEvent[] = [
      {
        id: "1",
        title: "Property Viewing - Luxury Apartment",
        description: "Show 3-bedroom apartment to potential buyers",
        date: new Date(),
        time: "10:00",
        type: "viewing",
        location: "Vilnius Old Town",
        client: "John Smith",
        propertyId: "prop-1",
      },
      {
        id: "2",
        title: "Client Meeting",
        description: "Discuss investment opportunities",
        date: new Date(Date.now() + 86400000), // Tomorrow
        time: "14:30",
        type: "meeting",
        location: "Office",
        client: "Maria Garcia",
      },
      {
        id: "3",
        title: "Property Inspection",
        description: "Final inspection before closing",
        date: new Date(Date.now() + 172800000), // Day after tomorrow
        time: "09:00",
        type: "inspection",
        location: "Kaunas Center",
        client: "David Wilson",
        propertyId: "prop-2",
      },
    ]
    setEvents(sampleEvents)
  }, [])

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "viewing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "meeting":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "inspection":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive",
      })
      return
    }

    const newEvent: CalendarEvent = {
      id: isEditing ? selectedEvent!.id : Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: selectedDate,
      time: formData.time,
      type: formData.type,
      location: formData.location,
      client: formData.client,
    }

    if (isEditing) {
      setEvents(events.map((event) => (event.id === selectedEvent!.id ? newEvent : event)))
      toast({
        title: "Event Updated",
        description: "Your event has been successfully updated.",
      })
    } else {
      setEvents([...events, newEvent])
      toast({
        title: "Event Created",
        description: "Your event has been successfully created.",
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      time: event.time,
      type: event.type,
      location: event.location,
      client: event.client,
    })
    setSelectedDate(event.date)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    toast({
      title: "Event Deleted",
      description: "Your event has been successfully deleted.",
    })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      time: "",
      type: "viewing",
      location: "",
      client: "",
    })
    setSelectedEvent(null)
    setIsEditing(false)
  }

  const openNewEventDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">Manage your property viewings and appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewEventDialog} className="gradient-bg text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Event" : "Create New Event"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update your event details" : "Add a new event to your calendar"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as CalendarEvent["type"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewing">Property Viewing</SelectItem>
                      <SelectItem value="meeting">Client Meeting</SelectItem>
                      <SelectItem value="inspection">Property Inspection</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client Name</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="gradient-bg text-white">
                  {isEditing ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-primary" />
              Calendar
            </CardTitle>
            <CardDescription>Select a date to view or create events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvents: (date) => getEventsForDate(date).length > 0,
              }}
              modifiersStyles={{
                hasEvents: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  fontWeight: "bold",
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Events for Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-secondary" />
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a Date"}
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? `${getEventsForDate(selectedDate).length} events scheduled`
                : "Choose a date to view events"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
              getEventsForDate(selectedDate)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg space-y-2 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          {event.client}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                        {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEditEvent(event)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
            ) : selectedDate ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No events scheduled for this date</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={openNewEventDialog}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Event
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a date to view events</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your next scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events
              .filter((event) => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 6)
              .map((event) => (
                <div key={event.id} className="p-4 border rounded-lg space-y-2 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(event.date, "MMM d")} at {event.time}
                    </span>
                  </div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    {event.client}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

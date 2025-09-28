import { useState, useEffect } from 'react';
import { mockEvents } from '../lib/mockData';

type Event = typeof mockEvents[0];

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEvents(mockEvents);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newEvent = {
        ...eventData,
        id: String(events.length + 1),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        attendees_count: 0
      };
      
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateEvent = async (id: string, updates: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setEvents(prev => prev.map(event => 
        event.id === id ? { ...event, ...updates, updated_at: new Date().toISOString() } : event
      ));
      
      return events.find(e => e.id === id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const registerForEvent = async (eventId: string, alumniId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, attendees_count: (event.attendees_count || 0) + 1 }
          : event
      ));
      
      return { id: '1', event_id: eventId, alumni_id: alumniId, status: 'registered' as const };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const unregisterFromEvent = async (eventId: string, alumniId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, attendees_count: Math.max(0, (event.attendees_count || 0) - 1) }
          : event
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    unregisterFromEvent
  };
}
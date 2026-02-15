import initialEvents from '../data/events.json';

const STORAGE_KEY = 'jtown_events';

export const eventService = {
  getAll() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing events from localStorage", e);
      }
    }
    return initialEvents;
  },

  getById(id) {
    const events = this.getAll();
    return events.find(e => e.id === parseInt(id));
  },

  save(event) {
    const events = this.getAll();
    const index = events.findIndex(e => e.id === event.id);
    
    if (index !== -1) {
      events[index] = event;
    } else {
      // New event logic
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      event.id = newId;
      events.push(event);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return event;
  },

  delete(id) {
    let events = this.getAll();
    events = events.filter(e => e.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  },

  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    return initialEvents;
  },

  isEventEnded(endDate) {
    if (!endDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventEnd = new Date(endDate);
    eventEnd.setHours(23, 59, 59, 999);
    // Logic fix: Only end if today is STRICTLY past the end date
    return today > eventEnd;
  }
};

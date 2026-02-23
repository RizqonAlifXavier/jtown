import { supabase } from './supabaseClient';
import initialEvents from '../data/events.json';

// Helper to map DB lowercase keys to frontend camelCase keys
const mapFromDB = (event) => {
  if (!event) return null;
  return {
    id: event.id,
    title: event.title,
    subtitle: event.subtitle,
    date: event.date,
    endDate: event.enddate,
    badge: event.badge,
    gradient: event.gradient,
    image: event.image,
    detailImage: event.detailimage,
    detailBanner: event.detailbanner,
    category: event.category,
    location: event.location,
    fullDescription: event.fulldescription,
    terms: event.terms,
    createdAt: event.created_at
  };
};

// Helper to map frontend camelCase keys to DB lowercase keys
const mapToDB = (event) => {
  return {
    title: event.title,
    subtitle: event.subtitle,
    date: event.date,
    enddate: event.endDate,
    badge: event.badge,
    gradient: event.gradient,
    image: event.image,
    detailimage: event.detailImage,
    detailbanner: event.detailBanner,
    category: event.category,
    location: event.location,
    fulldescription: event.fullDescription,
    terms: event.terms
  };
};

export const eventService = {
  async getAll() {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching events from Supabase:', error);
      return initialEvents; 
    }

    if (events.length === 0) {
      return initialEvents;
    }

    return events.map(mapFromDB);
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching event by id:', error);
      return null;
    }
    return mapFromDB(data);
  },

  async save(event) {
    const isNew = !event.id;
    const eventData = mapToDB(event);

    if (isNew) {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();
      
      if (error) throw error;
      return mapFromDB(data);
    } else {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', event.id)
        .select()
        .single();
      
      if (error) throw error;
      return mapFromDB(data);
    }
  },

  async delete(id) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async migrateLocalToSupabase() {
    const { data: existing } = await supabase.from('events').select('id');
    if (existing && existing.length > 0) return;

    const eventsToInsert = initialEvents.map(mapToDB);

    const { error } = await supabase
      .from('events')
      .insert(eventsToInsert);
    
    if (error) console.error('Migration error:', error);
  },

  isEventEnded(endDate) {
    if (!endDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventEnd = new Date(endDate);
    eventEnd.setHours(23, 59, 59, 999);
    return today > eventEnd;
  }
};

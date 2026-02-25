import { supabase } from './supabaseClient';

const mapFromDB = (news) => {
  if (!news) return null;
  return {
    id: news.id,
    title: news.title,
    content: news.content,
    image: news.image_url,
    date: news.published_date || news.created_at,
    createdAt: news.created_at
  };
};

const mapToDB = (news) => {
  return {
    title: news.title,
    content: news.content,
    image_url: news.image,
    published_date: news.date || new Date().toISOString()
  };
};

export const newsService = {
  async getAll() {
    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
      return [];
    }
    return news.map(mapFromDB);
  },

  async save(newsItem) {
    const isNew = !newsItem.id;
    const newsData = mapToDB(newsItem);

    if (isNew) {
      const { data, error } = await supabase
        .from('news')
        .insert([newsData])
        .select()
        .single();
      if (error) throw error;
      return mapFromDB(data);
    } else {
      const { data, error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', newsItem.id)
        .select()
        .single();
      if (error) throw error;
      return mapFromDB(data);
    }
  },

  async delete(id) {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

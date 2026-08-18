export type AiToolRow = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  image_url: string | null;
  tags: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AiToolInsert = {
  id?: string;
  name: string;
  description: string;
  url: string;
  category?: string;
  image_url?: string | null;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type AiToolUpdate = {
  id?: string;
  name?: string;
  description?: string;
  url?: string;
  category?: string;
  image_url?: string | null;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type VideoRow = {
  id: string;
  title: string;
  description: string | null;
  youtube_url: string;
  youtube_video_id: string;
  thumbnail_url: string | null;
  category: string;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type VideoInsert = {
  id?: string;
  title: string;
  description?: string | null;
  youtube_url: string;
  youtube_video_id: string;
  thumbnail_url?: string | null;
  category?: string;
  featured?: boolean;
  published?: boolean;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type VideoUpdate = {
  id?: string;
  title?: string;
  description?: string | null;
  youtube_url?: string;
  youtube_video_id?: string;
  thumbnail_url?: string | null;
  category?: string;
  featured?: boolean;
  published?: boolean;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  read_time: string;
  created_at: string;
  updated_at: string;
};

export type BlogInsert = {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  cover_image_url?: string | null;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  published?: boolean;
  published_at?: string | null;
  read_time?: string;
  created_at?: string;
  updated_at?: string;
};

export type BlogUpdate = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  cover_image_url?: string | null;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  published?: boolean;
  published_at?: string | null;
  read_time?: string;
  created_at?: string;
  updated_at?: string;
};

export interface Database {
  public: {
    Tables: {
      ai_tools: {
        Row: AiToolRow;
        Insert: AiToolInsert;
        Update: AiToolUpdate;
        Relationships: [];
      };
      videos: {
        Row: VideoRow;
        Insert: VideoInsert;
        Update: VideoUpdate;
        Relationships: [];
      };
      blogs: {
        Row: BlogRow;
        Insert: BlogInsert;
        Update: BlogUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export interface AdminStats {
  aiTools: { total: number; published: number; drafts: number };
  videos: { total: number; published: number; drafts: number };
  blogs: { total: number; published: number; drafts: number };
}

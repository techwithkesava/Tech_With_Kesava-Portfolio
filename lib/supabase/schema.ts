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

export type ResourceItemType =
  | "github"
  | "document"
  | "video"
  | "image"
  | "website"
  | "download"
  | "article"
  | "course"
  | "tool"
  | "social"
  | "custom";

export type ResourceRow = {
  id: string;
  slug: string;
  aliases: string[];
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ResourceInsert = {
  id?: string;
  slug: string;
  aliases?: string[];
  title: string;
  description?: string | null;
  thumbnail_url?: string | null;
  category?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ResourceUpdate = {
  id?: string;
  slug?: string;
  aliases?: string[];
  title?: string;
  description?: string | null;
  thumbnail_url?: string | null;
  category?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ResourceItemRow = {
  id: string;
  resource_id: string;
  type: ResourceItemType;
  title: string;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
  metadata: Record<string, unknown> | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ResourceItemInsert = {
  id?: string;
  resource_id: string;
  type?: ResourceItemType;
  title: string;
  description?: string | null;
  url: string;
  thumbnail_url?: string | null;
  metadata?: Record<string, unknown> | null;
  sort_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ResourceItemUpdate = {
  id?: string;
  resource_id?: string;
  type?: ResourceItemType;
  title?: string;
  description?: string | null;
  url?: string;
  thumbnail_url?: string | null;
  metadata?: Record<string, unknown> | null;
  sort_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ResourceClickRow = {
  id: string;
  resource_id: string | null;
  resource_item_id: string | null;
  clicked_at: string;
  referrer: string | null;
  user_agent: string | null;
};

export type ResourceClickInsert = {
  id?: string;
  resource_id?: string | null;
  resource_item_id?: string | null;
  clicked_at?: string;
  referrer?: string | null;
  user_agent?: string | null;
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
      resources: {
        Row: ResourceRow;
        Insert: ResourceInsert;
        Update: ResourceUpdate;
        Relationships: [];
      };
      resource_items: {
        Row: ResourceItemRow;
        Insert: ResourceItemInsert;
        Update: ResourceItemUpdate;
        Relationships: [
          {
            foreignKeyName: "resource_items_resource_id_fkey";
            columns: ["resource_id"];
            isOneToOne: false;
            referencedRelation: "resources";
            referencedColumns: ["id"];
          }
        ];
      };
      resource_clicks: {
        Row: ResourceClickRow;
        Insert: ResourceClickInsert;
        Update: Record<string, never>;
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
  resources?: { total: number; published: number; drafts: number };
}

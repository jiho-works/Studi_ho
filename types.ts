
export interface RecordEntry {
  id: string;
  imageUrl: string;
  title: string;
  content: string;
  date: string;
}

export interface FeaturedContent {
  imageUrl: string;
  youtubeId: string;
}

export type Page = 'home' | 'records';

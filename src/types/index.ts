export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface ResourceMetadata {
  chapter?: number;
  verse?: number;
  book?: string;
  page?: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'quran' | 'hadith' | 'tafsir' | 'fiqh';
  content: string;
  metadata: ResourceMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reference {
  resourceId: string;
  metadata: ResourceMetadata;
}

export interface Question {
  id: string;
  text: string;
  answer?: string;
  references?: Reference[];
  createdAt: Date;
}

export interface SearchResponse {
  answer: string;
  references: Reference[];
}
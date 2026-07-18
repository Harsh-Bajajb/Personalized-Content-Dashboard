export type DefaultResponse = {
  success: boolean;
  message?: string;
};

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  category: string;
  publishedAt: string;
}

export interface Recommendation {
  id: string;
  title: string;
  overview: string;
  posterPath?: string;
  voteAverage: number;
  releaseDate: string;
}

export interface SocialPost {
  id: string;
  author: string;
  content: string;
  hashtags: string[];
  likes: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  isEmpty: boolean;
}

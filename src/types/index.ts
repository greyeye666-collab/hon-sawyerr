export type PageView = 
  | 'home'
  | 'about'
  | 'impact'
  | 'project-detail'
  | 'news'
  | 'article-detail'
  | 'gallery'
  | 'contact';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: 'Education' | 'Healthcare' | 'Women & Economy' | 'Infrastructure' | 'Youth & Skills';
  impactMetric: string;
  image: string;
  completionYear: string;
  location: string;
  beneficiariesCount: string;
  fullDescription: string;
  keyHighlights: string[];
  galleryImages: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: 'Press Release' | 'Education' | 'Healthcare' | 'Parliament' | 'Community';
  readTime: string;
  thumbnail: string;
  excerpt: string;
  content: string[];
  featured?: boolean;
  author: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Community' | 'Education' | 'Parliament' | 'Healthcare' | 'Festivals';
  image: string;
  date: string;
  location: string;
  caption: string;
}

export interface CoreValue {
  title: string;
  description: string;
  iconName: 'heart' | 'book' | 'shield' | 'users' | 'trending-up' | 'scale';
}

export interface TimelineMilestone {
  year: string;
  title: string;
  role: string;
  description: string;
}

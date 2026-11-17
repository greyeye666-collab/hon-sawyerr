import { createContext } from 'react';
import type {
  BlogPost,
  CoreValue,
  GalleryItem,
  HeroSlide,
  MPProfile,
  NewsArticle,
  Project,
  QuickStat,
  TimelineMilestone,
} from '../types';

export interface ContactInquiryInput {
  fullName: string;
  email: string;
  phone: string;
  town: string;
  category: string;
  message: string;
  volunteer: boolean;
}

export interface SiteDataContextValue {
  mpDetails: MPProfile;
  heroSlides: HeroSlide[];
  quickStats: QuickStat[];
  coreValues: CoreValue[];
  timelineMilestones: TimelineMilestone[];
  projects: Project[];
  newsArticles: NewsArticle[];
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
  constituencyTowns: string[];
  isLoading: boolean;
  isLiveConnected: boolean;
  refreshData: () => Promise<void>;
  submitContactInquiry: (
    input: ContactInquiryInput
  ) => Promise<{ ok: boolean; referenceNumber?: string; error?: string }>;
  subscribeNewsletter: (
    email: string,
    source: 'blog' | 'footer'
  ) => Promise<{ ok: boolean; alreadySubscribed?: boolean; error?: string }>;
}

export const SiteDataContext = createContext<SiteDataContextValue | null>(null);

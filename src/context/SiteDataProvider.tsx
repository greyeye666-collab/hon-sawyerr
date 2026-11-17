import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  BLOG_POSTS,
  CONSTITUENCY_TOWNS,
  CORE_VALUES,
  GALLERY_ITEMS,
  MP_DETAILS,
  NEWS_ARTICLES,
  PROJECTS,
  QUICK_STATS,
  TIMELINE_MILESTONES,
} from '../data/mockData';
import { DEFAULT_HERO_SLIDES } from '../data/heroSlides';
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
import { SiteDataContext, type ContactInquiryInput } from './siteDataContext';

const DEFAULT_ABOUT_QUOTE =
  'Leadership is about service to the vulnerable. When we empower a child with education and support a mother with dignity, we build a nation.';

interface SupabaseSnapshot {
  mpDetails?: MPProfile;
  constituencyTowns?: string[];
  heroSlides?: HeroSlide[];
  quickStats?: QuickStat[];
  coreValues?: CoreValue[];
  timelineMilestones?: TimelineMilestone[];
  projects?: Project[];
  newsArticles?: NewsArticle[];
  blogPosts?: BlogPost[];
  galleryItems?: GalleryItem[];
  isLiveConnected: boolean;
}

async function querySupabaseSnapshot(): Promise<SupabaseSnapshot> {
  if (!supabase) {
    return { isLiveConnected: false };
  }

  const [
    profileRes,
    slidesRes,
    statsRes,
    valuesRes,
    timelineRes,
    projectsRes,
    newsRes,
    blogRes,
    galleryRes,
  ] = await Promise.all([
    supabase.from('mp_profile').select('*').limit(1).maybeSingle(),
    supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    supabase.from('quick_stats').select('*').order('sort_order', { ascending: true }),
    supabase.from('core_values').select('*').order('sort_order', { ascending: true }),
    supabase.from('timeline_milestones').select('*').order('sort_order', { ascending: true }),
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('is_flagship', { ascending: false })
      .order('sort_order', { ascending: true }),
    supabase
      .from('news_articles')
      .select('*')
      .eq('is_published', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false }),
    supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false }),
    supabase
      .from('gallery_items')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true }),
  ]);

  const snapshot: SupabaseSnapshot = { isLiveConnected: false };

  if (!profileRes.error && profileRes.data) {
    snapshot.isLiveConnected = true;
    const p = profileRes.data;
    snapshot.mpDetails = {
      fullName: p.full_name || MP_DETAILS.fullName,
      shortName: p.short_name || MP_DETAILS.shortName,
      popularTitle: p.popular_title || MP_DETAILS.popularTitle,
      slogan: p.slogan || MP_DETAILS.slogan,
      heroTagline: p.hero_tagline || MP_DETAILS.heroTagline,
      role: p.role || MP_DETAILS.role,
      party: p.party || MP_DETAILS.party,
      constituency: p.constituency || MP_DETAILS.constituency,
      region: p.region || MP_DETAILS.region,
      tenure: p.tenure || MP_DETAILS.tenure,
      parliamentEmail: p.parliament_email || MP_DETAILS.parliamentEmail,
      officeEmail: p.office_email || MP_DETAILS.officeEmail,
      constituencyPhone: p.constituency_phone || MP_DETAILS.constituencyPhone,
      hotlinePhone: p.hotline_phone || MP_DETAILS.hotlinePhone,
      officeAddress: p.office_address || MP_DETAILS.officeAddress,
      parliamentAddress: p.parliament_address || MP_DETAILS.parliamentAddress,
      portraitHero: p.portrait_hero_url || MP_DETAILS.portraitHero,
      portraitAbout: p.portrait_about_url || MP_DETAILS.portraitAbout,
      portraitCommunity: p.portrait_community_url || MP_DETAILS.portraitCommunity,
      aboutQuote: p.about_quote || DEFAULT_ABOUT_QUOTE,
      socialLinks: p.social_links || undefined,
    };
    if (Array.isArray(p.constituency_towns) && p.constituency_towns.length > 0) {
      snapshot.constituencyTowns = p.constituency_towns;
    }
  }

  if (!slidesRes.error && slidesRes.data && slidesRes.data.length > 0) {
    snapshot.isLiveConnected = true;
    snapshot.heroSlides = slidesRes.data.map((s: any) => ({
      id: s.id,
      type: s.type === 'paired-portrait' ? 'paired-portrait' : 'landscape',
      tag: s.tag,
      badgeColor: s.badge_color === 'red' ? 'red' : 'green',
      title: s.title,
      titleHighlight: s.title_highlight,
      description: s.description,
      landscapeImage: s.landscape_image ?? undefined,
      portraitImages: Array.isArray(s.portrait_images) ? s.portrait_images : undefined,
    }));
  }

  if (!statsRes.error && statsRes.data && statsRes.data.length > 0) {
    snapshot.isLiveConnected = true;
    snapshot.quickStats = statsRes.data.map((st: any) => ({
      value: st.value,
      label: st.label,
      subtext: st.subtext,
    }));
  }

  if (!valuesRes.error && valuesRes.data && valuesRes.data.length > 0) {
    snapshot.isLiveConnected = true;
    snapshot.coreValues = valuesRes.data.map((v: any) => ({
      title: v.title,
      description: v.description,
      iconName: v.icon_name as CoreValue['iconName'],
    }));
  }

  if (!timelineRes.error && timelineRes.data && timelineRes.data.length > 0) {
    snapshot.isLiveConnected = true;
    snapshot.timelineMilestones = timelineRes.data.map((m: any) => ({
      year: m.year,
      title: m.title,
      role: m.role,
      description: m.description,
    }));
  }

  if (!projectsRes.error && projectsRes.data && projectsRes.data.length > 0) {
    snapshot.isLiveConnected = true;
    snapshot.projects = projectsRes.data.map((proj: any) => ({
      id: proj.id,
      title: proj.title,
      shortDescription: proj.short_description,
      category: proj.category as Project['category'],
      impactMetric: proj.impact_metric,
      image: proj.image,
      completionYear: proj.completion_year,
      location: proj.location,
      beneficiariesCount: proj.beneficiaries_count,
      fullDescription: proj.full_description,
      keyHighlights: Array.isArray(proj.key_highlights) ? proj.key_highlights : [],
      galleryImages: Array.isArray(proj.gallery_images) ? proj.gallery_images : [],
      slideshowImages:
        Array.isArray(proj.gallery_images) && proj.gallery_images.length > 0
          ? proj.gallery_images
          : undefined,
      isFlagship: Boolean(proj.is_flagship),
      testimonial: proj.testimonial ?? undefined,
    }));
  }

  if (!newsRes.error && newsRes.data && newsRes.data.length > 0) {
    snapshot.isLiveConnected = true;
    snapshot.newsArticles = newsRes.data.map((n: any) => ({
      id: n.id,
      title: n.title,
      date: n.published_date,
      category: n.category as NewsArticle['category'],
      readTime: n.read_time,
      thumbnail: n.thumbnail,
      excerpt: n.excerpt,
      content: Array.isArray(n.content) ? n.content : [],
      featured: Boolean(n.featured),
      author: n.author,
      tags: Array.isArray(n.tags) ? n.tags : [],
    }));
  }

  if (!blogRes.error && blogRes.data && blogRes.data.length > 0) {
    snapshot.isLiveConnected = true;
    snapshot.blogPosts = blogRes.data.map((b: any) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      category: b.category as BlogPost['category'],
      publishDate: b.publish_date,
      readTime: b.read_time,
      coverImage: b.cover_image,
      excerpt: b.excerpt,
      content: Array.isArray(b.content) ? b.content : [],
      featured: Boolean(b.featured),
      author: {
        name: b.author_name || MP_DETAILS.fullName,
        role: b.author_role || MP_DETAILS.role,
        avatar: b.author_avatar || undefined,
      },
      featuredQuote: b.featured_quote || undefined,
      tags: Array.isArray(b.tags) ? b.tags : [],
    }));
  }

  if (!galleryRes.error && galleryRes.data && galleryRes.data.length > 0) {
    snapshot.isLiveConnected = true;
    snapshot.galleryItems = galleryRes.data.map((g: any) => ({
      id: g.id,
      title: g.title,
      category: g.category as GalleryItem['category'],
      image: g.image,
      date: g.date,
      location: g.location,
      caption: g.caption,
    }));
  }

  return snapshot;
}

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mpDetails, setMpDetails] = useState<MPProfile>({
    ...MP_DETAILS,
    aboutQuote: DEFAULT_ABOUT_QUOTE,
    socialLinks: {
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
    },
  });
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [quickStats, setQuickStats] = useState<QuickStat[]>(QUICK_STATS);
  const [coreValues, setCoreValues] = useState<CoreValue[]>(CORE_VALUES);
  const [timelineMilestones, setTimelineMilestones] = useState<TimelineMilestone[]>(TIMELINE_MILESTONES);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(NEWS_ARTICLES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [constituencyTowns, setConstituencyTowns] = useState<string[]>(CONSTITUENCY_TOWNS);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(supabase));
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  const applySnapshot = useCallback((snapshot: SupabaseSnapshot) => {
    if (snapshot.mpDetails) setMpDetails(snapshot.mpDetails);
    if (snapshot.constituencyTowns) setConstituencyTowns(snapshot.constituencyTowns);
    if (snapshot.heroSlides) setHeroSlides(snapshot.heroSlides);
    if (snapshot.quickStats) setQuickStats(snapshot.quickStats);
    if (snapshot.coreValues) setCoreValues(snapshot.coreValues);
    if (snapshot.timelineMilestones) setTimelineMilestones(snapshot.timelineMilestones);
    if (snapshot.projects) setProjects(snapshot.projects);
    if (snapshot.newsArticles) setNewsArticles(snapshot.newsArticles);
    if (snapshot.blogPosts) setBlogPosts(snapshot.blogPosts);
    if (snapshot.galleryItems) setGalleryItems(snapshot.galleryItems);
    setIsLiveConnected(snapshot.isLiveConnected);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    querySupabaseSnapshot()
      .then((snapshot) => {
        if (!cancelled) {
          applySnapshot(snapshot);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsLiveConnected(false);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [applySnapshot]);

  const refreshData = useCallback(async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const snapshot = await querySupabaseSnapshot();
      applySnapshot(snapshot);
    } catch {
      setIsLiveConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [applySnapshot]);

  const submitContactInquiry = useCallback(async (input: ContactInquiryInput) => {
    const referenceNumber = `AE-${Math.floor(100000 + Math.random() * 900000)}`;
    if (!supabase) {
      return { ok: true, referenceNumber };
    }

    const { error } = await supabase.from('contact_inquiries').insert({
      reference_number: referenceNumber,
      full_name: input.fullName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      town: input.town,
      category: input.category,
      message: input.message.trim(),
      volunteer: input.volunteer,
      status: 'new',
      internal_notes: '',
    });

    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true, referenceNumber };
  }, []);

  const subscribeNewsletter = useCallback(async (email: string, source: 'blog' | 'footer') => {
    const cleaned = email.trim().toLowerCase();
    if (!cleaned) {
      return { ok: false, error: 'Please enter a valid email address.' };
    }
    if (!supabase) {
      return { ok: true };
    }

    const { error } = await supabase.from('newsletter_subscribers').insert({
      email: cleaned,
      source,
    });

    if (error) {
      // Unique constraint violation means email is already subscribed
      if (error.code === '23505') {
        return { ok: true, alreadySubscribed: true };
      }
      return { ok: false, error: error.message };
    }

    return { ok: true };
  }, []);

  return (
    <SiteDataContext.Provider
      value={{
        mpDetails,
        heroSlides,
        quickStats,
        coreValues,
        timelineMilestones,
        projects,
        newsArticles,
        blogPosts,
        galleryItems,
        constituencyTowns,
        isLoading,
        isLiveConnected,
        refreshData,
        submitContactInquiry,
        subscribeNewsletter,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

import { MotionConfig } from 'motion/react';
import { useState } from 'react';
import type { PageView, Project, NewsArticle, BlogPost } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ImpactSection } from './components/ImpactSection';
import { StatsBar } from './components/StatsBar';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { DedicatedAboutPage } from './components/DedicatedAboutPage';
import { DedicatedImpactPage } from './components/DedicatedImpactPage';
import { DedicatedNewsPage } from './components/DedicatedNewsPage';
import { DedicatedBlogPage } from './components/DedicatedBlogPage';
import { BlogDetailPage } from './components/BlogDetailPage';
import { DedicatedGalleryPage } from './components/DedicatedGalleryPage';
import { DedicatedContactPage } from './components/DedicatedContactPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Sync window scroll on page transition
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setCurrentPage('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentPage('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-cream)' }}>
      {/* Persistent Elegant Sticky Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onScrollToSection={handleScrollToSection}
      />

      <main style={{ flex: 1 }}>
        {/* VIEW: HOME PAGE */}
        {currentPage === 'home' && (
          <>
            <Hero
              onNavigate={handleNavigate}
              onExploreProjects={() => handleScrollToSection('impact')}
            />
            <AboutSection onNavigate={handleNavigate} />
            <ImpactSection
              onSelectProject={handleSelectProject}
              onNavigate={handleNavigate}
            />
            <StatsBar />
            <NewsSection
              onSelectArticle={handleSelectArticle}
              onNavigate={handleNavigate}
            />
            <GallerySection onNavigate={handleNavigate} />
            <ContactSection />
          </>
        )}

        {/* VIEW: DEDICATED ABOUT PAGE */}
        {currentPage === 'about' && (
          <DedicatedAboutPage
            onBack={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: DEDICATED IMPACT / GOOD WORKS PAGE */}
        {currentPage === 'impact' && (
          <DedicatedImpactPage
            onBack={() => handleNavigate('home')}
            onSelectProject={handleSelectProject}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: INDIVIDUAL PROJECT DETAIL PAGE */}
        {currentPage === 'project-detail' && selectedProject && (
          <ProjectDetailPage
            project={selectedProject}
            onBack={() => handleNavigate('impact')}
            onSelectProject={handleSelectProject}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: DEDICATED NEWS & UPDATES PAGE */}
        {currentPage === 'news' && (
          <DedicatedNewsPage
            onBack={() => handleNavigate('home')}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: INDIVIDUAL ARTICLE DETAIL PAGE */}
        {currentPage === 'article-detail' && selectedArticle && (
          <ArticleDetailPage
            article={selectedArticle}
            onBack={() => handleNavigate('news')}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: DEDICATED BLOG PAGE */}
        {currentPage === 'blog' && (
          <DedicatedBlogPage
            onBack={() => handleNavigate('home')}
            onSelectPost={handleSelectBlogPost}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: INDIVIDUAL BLOG POST DETAIL PAGE */}
        {currentPage === 'blog-detail' && selectedBlogPost && (
          <BlogDetailPage
            post={selectedBlogPost}
            onBack={() => handleNavigate('blog')}
            onSelectPost={handleSelectBlogPost}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: DEDICATED GALLERY PAGE */}
        {currentPage === 'gallery' && (
          <DedicatedGalleryPage
            onBack={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: DEDICATED CONTACT PAGE */}
        {currentPage === 'contact' && (
          <DedicatedContactPage
            onBack={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Persistent Luxury Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
    </MotionConfig>
  );
}

export default App;

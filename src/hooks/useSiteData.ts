import { useContext } from 'react';
import { SiteDataContext, type SiteDataContextValue } from '../context/siteDataContext';

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return ctx;
}

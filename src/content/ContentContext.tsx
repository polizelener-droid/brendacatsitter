import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_CONTENT,
  fetchSiteContent,
  type SiteContent,
} from './fetchContent';

type ContentContextValue = SiteContent & {
  loading: boolean;
  refresh: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const next = await fetchSiteContent();
    setContent(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      ...content,
      loading,
      refresh,
    }),
    [content, loading, refresh],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContent debe usarse dentro de ContentProvider');
  }
  return ctx;
}

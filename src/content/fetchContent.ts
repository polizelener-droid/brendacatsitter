import type {
  CatClient,
  ContactInfo,
  ServiceItem,
  ServiceRates,
  Testimonial,
} from '../data/catData';
import {
  CAT_CLIENTS,
  CONTACT_INFO,
  COVERAGE_NEIGHBORHOODS,
  SERVICE_RATES,
  SERVICES,
  TESTIMONIALS,
} from '../data/catData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export type SiteContent = {
  contact: ContactInfo;
  rates: ServiceRates;
  neighborhoods: string[];
  cats: CatClient[];
  testimonials: Testimonial[];
  services: ServiceItem[];
  source: 'remote' | 'local';
};

export const DEFAULT_CONTENT: SiteContent = {
  contact: CONTACT_INFO,
  rates: SERVICE_RATES,
  neighborhoods: [...COVERAGE_NEIGHBORHOODS],
  cats: CAT_CLIENTS,
  testimonials: TESTIMONIALS,
  services: SERVICES,
  source: 'local',
};

function mapContact(row: Record<string, unknown>): ContactInfo {
  return {
    whatsapp: String(row.whatsapp ?? ''),
    phoneFormatted: String(row.phone_formatted ?? ''),
    email: String(row.email ?? ''),
    instagram: String(row.instagram ?? ''),
    instagramUrl: String(row.instagram_url ?? ''),
    tiktok: String(row.tiktok ?? ''),
    tiktokUrl: String(row.tiktok_url ?? ''),
    whatsappBaseMessage: String(row.whatsapp_base_message ?? ''),
  };
}

function mapRates(row: Record<string, unknown>): ServiceRates {
  return {
    duration: String(row.duration ?? ''),
    periodNotice: String(row.period_notice ?? ''),
    weekday: String(row.weekday ?? ''),
    saturday: String(row.saturday ?? ''),
    sundayHoliday: String(row.sunday_holiday ?? ''),
    interview: String(row.interview ?? ''),
    interviewDesc: String(row.interview_desc ?? ''),
    keyHandover: String(row.key_handover ?? ''),
    paymentTerms: String(row.payment_terms ?? ''),
    cancellationPolicy: String(row.cancellation_policy ?? ''),
  };
}

function mapCat(row: Record<string, unknown>): CatClient {
  return {
    id: String(row.id),
    name: String(row.name ?? ''),
    owner: String(row.owner ?? ''),
    image: String(row.image_url ?? ''),
    story: String(row.story ?? ''),
    personality: Array.isArray(row.personality) ? (row.personality as string[]) : [],
    favoriteActivity: String(row.favorite_activity ?? ''),
    visitsCount: Number(row.visits_count ?? 0),
  };
}

function mapTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    id: String(row.id),
    quote: String(row.quote ?? ''),
    author: String(row.author ?? ''),
    verified: Boolean(row.verified ?? true),
    catName: row.cat_name ? String(row.cat_name) : undefined,
    avatarBg: String(row.avatar_bg ?? 'bg-emerald-100 text-emerald-800'),
    date: String(row.date_label ?? ''),
  };
}

function mapService(row: Record<string, unknown>): ServiceItem {
  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    iconName: String(row.icon_name ?? 'Heart'),
    highlight: row.highlight ? String(row.highlight) : undefined,
  };
}

export async function fetchSiteContent(): Promise<SiteContent> {
  if (!supabase || !isSupabaseConfigured) {
    return DEFAULT_CONTENT;
  }

  try {
    const [contactRes, ratesRes, hoodsRes, catsRes, testimonialsRes, servicesRes] =
      await Promise.all([
        supabase.from('site_contact').select('*').eq('id', 1).maybeSingle(),
        supabase.from('service_rates').select('*').eq('id', 1).maybeSingle(),
        supabase.from('neighborhoods').select('*').order('sort_order', { ascending: true }),
        supabase.from('cats').select('*').order('sort_order', { ascending: true }),
        supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
        supabase.from('services').select('*').order('sort_order', { ascending: true }),
      ]);

    const contact = contactRes.data ? mapContact(contactRes.data) : DEFAULT_CONTENT.contact;
    const rates = ratesRes.data ? mapRates(ratesRes.data) : DEFAULT_CONTENT.rates;
    const neighborhoods =
      hoodsRes.data && hoodsRes.data.length > 0
        ? hoodsRes.data.map((r) => String(r.name))
        : DEFAULT_CONTENT.neighborhoods;
    const remoteCats =
      catsRes.data && catsRes.data.length > 0 ? catsRes.data.map(mapCat) : [];
    const catsWithImages = remoteCats.filter((c) => c.image);
    const cats = catsWithImages.length > 0 ? catsWithImages : DEFAULT_CONTENT.cats;
    const testimonials =
      testimonialsRes.data && testimonialsRes.data.length > 0
        ? testimonialsRes.data.map(mapTestimonial)
        : DEFAULT_CONTENT.testimonials;
    const services =
      servicesRes.data && servicesRes.data.length > 0
        ? servicesRes.data.map(mapService)
        : DEFAULT_CONTENT.services;

    return {
      contact,
      rates,
      neighborhoods,
      cats,
      testimonials,
      services,
      source: 'remote',
    };
  } catch {
    return DEFAULT_CONTENT;
  }
}

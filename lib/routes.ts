import { compliance, escape } from '@/config/prize';

export type Route = { label: string; href: string };

// Route labels and paths used by the menu and the footer. Draws are named by destination.
export const routes = {
  escapes: [
    { label: 'All escapes', href: '/escapes' },
    { label: escape.destination, href: `/escapes/${escape.slug}` },
  ] satisfies Route[],
  information: [
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Why Trove', href: '/why' },
    { label: 'Free entry by post', href: '/free-entry-by-post' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
  ] satisfies Route[],
  legal: [
    { label: 'Terms', href: '/legal/terms' },
    { label: 'Significant conditions', href: compliance.significantConditionsPath },
    { label: 'Playing responsibly', href: '/legal/playing-responsibly' },
    { label: 'Privacy', href: '/legal/privacy' },
    { label: 'Cookies', href: '/legal/cookies' },
    { label: 'Complaints', href: '/legal/complaints' },
  ] satisfies Route[],
};

export const freePostalRoute = '/free-entry-by-post';
export const significantConditions = compliance.significantConditionsPath;

// DCMS Voluntary Code signposting. Names come from config; only the addresses live here.
export const signposting: Record<(typeof compliance.dcmsVoluntaryCode.signposting)[number], string> = {
  GamCare: 'https://www.gamcare.org.uk',
  GambleAware: 'https://www.gambleaware.org',
};

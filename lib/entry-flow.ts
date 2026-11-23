import { launch } from '@/config/launch';

// Whether the entry flow's routes exist on this deployment. On the live site only when
// config/launch.ts says so. On Vercel preview deployments always, so it can be reviewed, and
// locally when ENTRY_FLOW_PREVIEW=1. Off, the routes return 404 and nothing links to them.
export function entryFlowAvailable(): boolean {
  return launch.entryFlowLive || process.env.VERCEL_ENV === 'preview' || process.env.ENTRY_FLOW_PREVIEW === '1';
}

// True when the flow is showing only because this is a preview: no payment can be taken and
// the screens say so.
export function entryFlowIsPreview(): boolean {
  return !launch.entryFlowLive && entryFlowAvailable();
}

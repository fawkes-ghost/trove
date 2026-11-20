'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

type Props = {
  // Every string is built on the server from config: this component never sees a figure.
  title: string;
  text: string;
  url: string;
  label?: string;
  placement: string;
  className?: string;
};

// "Send it to your plus one." The prize is for two, so the natural way to pass Trove on is
// to the person you would take. On a phone this opens the system share sheet (Instagram,
// WhatsApp, Messages, TikTok); where there is none it copies the link and says so. Nothing
// is offered in return for sharing: a reward would change the terms of the draw.
export function ShareButton({ title, text, url, label = 'Send it to your plus one', placement, className = '' }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const shareUrl = `${url}${url.includes('?') ? '&' : '?'}utm_source=share&utm_medium=plus-one&utm_content=${encodeURIComponent(placement)}`;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url: shareUrl });
        trackEvent('share', { method: 'native', placement });
      } catch {
        // Closing the share sheet is a choice, not an error.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
      trackEvent('share', { method: 'copy', placement });
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.prompt('Copy this link', shareUrl);
    }
  }

  return (
    <button type="button" onClick={share} className={`btn inline-flex items-center justify-center gap-2.5 ${className}`} data-share={placement}>
      <span aria-hidden="true" className="relative block h-3.5 w-3.5 overflow-hidden">
        {/* The sun on the line, small: the same mark as the o. */}
        <span className="absolute bottom-[2px] left-1/2 block h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-sun" />
        <span className="absolute inset-x-0 bottom-0 block h-[2px] rounded-full bg-current" />
      </span>
      <span aria-live="polite">{copied ? 'Link copied. Send it on.' : label}</span>
    </button>
  );
}

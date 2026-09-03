'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

type Props = {
  onToken: (token: string | null) => void;
  onError: () => void;
  resetSignal: number;
};

// Cloudflare Turnstile, rendered explicitly so the widget mode set in the Cloudflare
// dashboard (managed) applies. Tokens arrive through onToken; a failed or expired
// challenge clears the token and reports an error. Bumping resetSignal asks for a fresh
// token after a submit. Nothing animates on our side; the widget draws itself.
export function Turnstile({ onToken, onError, resetSignal }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const callbacks = useRef({ onToken, onError });
  callbacks.current = { onToken, onError };

  const render = () => {
    const api = window.turnstile;
    if (!api || !container.current || widgetId.current) return;
    widgetId.current = api.render(container.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'light',
      size: 'flexible',
      appearance: 'always',
      callback: (token: string) => callbacks.current.onToken(token),
      'expired-callback': () => callbacks.current.onToken(null),
      'timeout-callback': () => callbacks.current.onToken(null),
      'error-callback': () => {
        callbacks.current.onToken(null);
        callbacks.current.onError();
      },
    });
  };

  useEffect(() => {
    render();
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resetSignal > 0 && widgetId.current) {
      window.turnstile?.reset(widgetId.current);
      callbacks.current.onToken(null);
    }
  }, [resetSignal]);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={render} />
      <div ref={container} data-turnstile className="min-h-[65px] w-full max-w-sm" />
    </>
  );
}

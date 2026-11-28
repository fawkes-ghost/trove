'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  execute: (widgetId: string) => void;
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
  // The check runs only once this is true (the visitor has given a valid email address), so a
  // challenge, when Cloudflare wants one, can never be the first thing on the page.
  run: boolean;
  theme?: 'light' | 'dark';
};

// Cloudflare Turnstile, rendered explicitly so the widget mode set in the Cloudflare
// dashboard (managed) applies. Since 28 November 2026 it is rendered with execution
// 'execute' and run only when `run` turns true, after the email step, instead of on page load. The check runs unseen and the box appears only if Cloudflare
// needs the person to do something, so the form is its fields and a button and nothing else
// for nearly everyone. Tokens arrive through onToken; a failed or expired challenge clears
// the token and reports an error. Bumping resetSignal asks for a fresh token after a
// submit. Nothing animates on our side; the widget draws itself.
export function Turnstile({ onToken, onError, resetSignal, run, theme = 'light' }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const runRef = useRef(run);
  runRef.current = run;
  const started = useRef(false);

  const execute = () => {
    if (!widgetId.current || !runRef.current) return;
    started.current = true;
    window.turnstile?.execute(widgetId.current);
  };
  const callbacks = useRef({ onToken, onError });
  callbacks.current = { onToken, onError };

  const render = () => {
    const api = window.turnstile;
    if (!api || !container.current || widgetId.current) return;
    widgetId.current = api.render(container.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme,
      execution: 'execute',
      // Flexible fills the column but never goes below 300px. On the narrowest phones the
      // column is narrower than that, so they get the compact box instead.
      size: container.current.clientWidth < 300 ? 'compact' : 'flexible',
      appearance: 'interaction-only',
      callback: (token: string) => callbacks.current.onToken(token),
      'expired-callback': () => callbacks.current.onToken(null),
      'timeout-callback': () => callbacks.current.onToken(null),
      'error-callback': () => {
        callbacks.current.onToken(null);
        callbacks.current.onError();
      },
    });
    execute();
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
    if (run && !started.current) execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  useEffect(() => {
    if (resetSignal > 0 && widgetId.current) {
      window.turnstile?.reset(widgetId.current);
      callbacks.current.onToken(null);
      started.current = false;
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={render} />
      <div ref={container} data-turnstile className="w-full max-w-sm overflow-hidden" />
    </>
  );
}

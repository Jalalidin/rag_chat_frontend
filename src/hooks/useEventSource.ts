import { useEffect, useState } from 'react';

interface EventSourceOptions {
  onMessage?: (event: MessageEvent) => void;
  onComplete?: () => void;
  onError?: (error: Event) => void;
}

export function useEventSource(url: string | null, options: EventSourceOptions = {}) {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event: MessageEvent) => {
      setData(event.data);
      options.onMessage?.(event);
    };

    eventSource.onerror = (error: Event) => {
      options.onError?.(error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      options.onComplete?.();
    };
  }, [url, options]);

  return { data };
} 
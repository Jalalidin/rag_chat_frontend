import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { darkModeAtom } from '../lib/theme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
}
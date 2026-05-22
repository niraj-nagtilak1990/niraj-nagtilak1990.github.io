import { createContext, useContext, useState, useEffect } from 'react';

export const themes = [
  { id: 'dark-prestige',  name: 'Dark Prestige',  dot: '#C8A96E', description: 'Gold & Red' },
  { id: 'modern-light',   name: 'Modern Light',   dot: '#1D4ED8', description: 'Blue & Amber' },
  { id: 'gradient-dark',  name: 'Gradient Dark',  dot: '#7C3AED', description: 'Violet & Cyan' },
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('nn-theme') || 'dark-prestige'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nn-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center gap-2" title="Switch theme">
      {themes.map((t) => (
        <button
          key={t.id}
          className={`theme-dot ${theme === t.id ? 'active' : ''}`}
          style={{ background: t.dot }}
          onClick={() => setTheme(t.id)}
          aria-label={`Switch to ${t.name} theme`}
          title={t.name}
        />
      ))}
    </div>
  );
}

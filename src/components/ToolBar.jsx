// src/components/ToolBar.jsx
import { memo } from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useDiagram } from '../context/DiagramContext';

const ToolBar = memo(function ToolBar() {
  const { isDark, toggleTheme, language, toggleLanguage, t } = useDiagram();

  return (
    <nav
      className="flex items-center p-1 sm:p-1.5
        bg-white/90 dark:bg-slate-800/90
        backdrop-blur-md rounded-full shadow-sm
        border border-slate-200 dark:border-slate-700
        transition-all duration-300"
      aria-label={language === 'ar' ? 'أدوات التحكم' : 'Diagram Controls'}
    >
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        className="focus-ring group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full
          hover:bg-slate-100 dark:hover:bg-slate-700
          text-slate-700 dark:text-slate-200
          transition-all duration-200 active:scale-95"
      >
        <Languages size={16} className="text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
        <span className="font-bold text-xs sm:text-sm">
          {language === 'ar' ? 'EN' : 'عربي'}
        </span>
      </button>

      <div className="w-px h-5 bg-slate-200 dark:bg-slate-600 mx-0.5" aria-hidden="true" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="focus-ring group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full
          hover:bg-slate-100 dark:hover:bg-slate-700
          text-slate-700 dark:text-slate-200
          transition-all duration-200 active:scale-95"
      >
        {isDark ? (
          <Moon size={16} className="text-indigo-400" />
        ) : (
          <Sun size={16} className="text-amber-500" />
        )}
        <span className="font-bold text-xs sm:text-sm">
          {isDark ? t.dark : t.light}
        </span>
      </button>
    </nav>
  );
});

export default ToolBar;

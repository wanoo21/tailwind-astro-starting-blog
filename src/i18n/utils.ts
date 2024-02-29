import { ui, defaultLang } from "./ui";

// Get the language from the URL, if it's not found, return the default language
// This function is not used in the starter blog, but it's a good example of how to use the URL to get the language
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

// This function is used in the starter blog to get the translations
export function useTranslations(lang: keyof typeof ui = defaultLang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang], tags?: Record<string, string>) {
    const translation = ui[lang][key] || ui[defaultLang][key];

    // If the translation is not found, return the key
    if (!translation) return key;
    
    // Replace the tags in the translation with the values passed, if any
    // example: t('components.themeSwitcher.toggleDarkMode', { darkMode: 'dark mode' })
    // where in the translation file we have: 'Toggle {darkMode}'
    return (ui[lang][key] || ui[defaultLang][key]).replace(/\{(\w+)\}/g, (_, match) => tags?.[match] || "");
  };
}

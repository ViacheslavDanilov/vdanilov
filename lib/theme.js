// The theme choice lives in localStorage; no key means the default dark theme
export const THEME_KEY = "theme";

export const THEME_COLORS = { dark: "#0a0e14", light: "#f4f6f9" };

// Runs in <head> before first paint, so a stored choice never flashes the other theme
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

// Dark is the default; only a stored "light" choice changes it
export const DEFAULT_THEME = "dark";

// Keeps the browser bar colour in step with the theme in use
export function applyThemeColor(theme) {
  const colour = THEME_COLORS[theme ?? DEFAULT_THEME];
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    if (meta.getAttribute("content") !== colour) {
      meta.setAttribute("content", colour);
    }
  }
}

export const currentTheme = () =>
  document.documentElement.dataset.theme || DEFAULT_THEME;

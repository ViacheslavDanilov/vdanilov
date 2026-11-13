// The theme choice lives in localStorage; no key means the system setting decides
export const THEME_KEY = "theme";

export const THEME_COLORS = { dark: "#0a0e14", light: "#f4f6f9" };

// Runs in <head> before first paint, so a stored choice never flashes the other theme
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

// Keeps the browser bar colour in step: an explicit choice sets both tags, null restores each to its media query
export function applyThemeColor(theme) {
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    const own = meta.media.includes("light") ? "light" : "dark";
    const colour = THEME_COLORS[theme ?? own];
    if (meta.getAttribute("content") !== colour) {
      meta.setAttribute("content", colour);
    }
  }
}

export const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

export const currentTheme = () =>
  document.documentElement.dataset.theme || systemTheme();

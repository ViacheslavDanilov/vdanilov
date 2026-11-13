// The theme choice lives in localStorage; no key means the system setting decides
export const THEME_KEY = "theme";

export const THEME_COLORS = { dark: "#0a0e14", light: "#f4f6f9" };

// Runs in <head> before first paint, so a stored choice never flashes the other theme
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

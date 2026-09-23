import { useCallback, useSyncExternalStore } from "react";

const CHANGE_EVENT = "filterparamchange";

const subscribe = (onChange) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

const readParam = () =>
  new URLSearchParams(window.location.search).get("filter");

// Filter kept in ?filter= so Back and shared links restore it; hydration uses the default
export function useFilterParam(defaultValue, options) {
  const value = useSyncExternalStore(subscribe, readParam, () => null);
  const filter = options.some((option) => option.id === value)
    ? value
    : defaultValue;

  const setFilter = useCallback(
    (next) => {
      const url = new URL(window.location.href);
      if (next === defaultValue) {
        url.searchParams.delete("filter");
      } else {
        url.searchParams.set("filter", next);
      }
      window.history.replaceState(null, "", url);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [defaultValue],
  );

  return [filter, setFilter];
}

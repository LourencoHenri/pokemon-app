import { useDark, useToggle } from "@vueuse/core";

export function useTheme() {
  const isDark = useDark({
    selector: "html",
    valueDark: "dark",
    valueLight: "",
    storageKey: "theme",
  });

  const toggle = useToggle(isDark);
  return { isDark, toggle };
}

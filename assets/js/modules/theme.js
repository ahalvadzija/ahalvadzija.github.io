// theme.js
const htmlElement = document.documentElement;

export function setTheme(isDark) {
  htmlElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

export function initThemeToggle(buttonSelector = "#theme-toggle") {
  const themeToggleBtn = document.querySelector(buttonSelector);
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isCurrentlyDark = htmlElement.classList.contains("dark");
      if (!document.startViewTransition) {
        setTheme(!isCurrentlyDark);
        return;
      }
      document.startViewTransition(() => setTheme(!isCurrentlyDark));
    });
  }
}

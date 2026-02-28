/* assets/js/modules/ui.js */

/**
 * Magnetic effect for social icons
 * Creates a parallax movement where the icon follows the cursor subtly.
 */


/**
 * Updates the scroll progress bar at the top of the page
 */
export function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress-bar");
  if (!progressBar) return;

  const updateBar = () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    // Using width for the progress bar calculation
    progressBar.style.width = `${scrolled}%`;
  };

  window.addEventListener("scroll", updateBar, { passive: true });
  updateBar();
}

/**
 * Global keyboard shortcuts (CMD/CTRL + K or / for Search)
 */
export function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Ignore if user is typing in an input or textarea
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    const isK = e.key.toLowerCase() === "k";
    const isSlash = e.key === "/";
    const modifier = e.ctrlKey || e.metaKey;

    if (isSlash || (modifier && isK)) {
      e.preventDefault();
      window.location.href = "/search/";
    }
  });
}

/**
 * Initializes Pagefind UI for search functionality
 */
export function initSearch() {
  if (!window.PagefindUI) return;

  const container = document.querySelector("#search");
  if (!container || container.dataset.initialized) return;
  
  container.dataset.initialized = "true";

  new PagefindUI({
    element: "#search",
    showSubResults: true,
    showFilters: false,
    showImages: false,
    resetStyles: false,
    bundlePath: "/pagefind/",
    translations: {
      placeholder: "Search projects, posts, snippets...",
    },
  });
}

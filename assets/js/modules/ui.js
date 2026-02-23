/* assets/js/modules/ui.js */

/**
 * Magnetic effect for social icons
 * Creates a parallax movement where the icon follows the cursor subtly.
 */
export function initMagneticEffect() {
  const icons = document.querySelectorAll(".social-icon-lucide");
  
  icons.forEach((icon) => {
    let frameId = null;
    const svg = icon.querySelector("svg");

    icon.addEventListener("mousemove", (e) => {
      const rect = icon.getBoundingClientRect();
      
      // Calculate cursor distance from the center of the icon
      // Multiplied by 0.3 to keep the movement subtle and controlled
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;

      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        // Smooth container (background) movement
        icon.style.transition = "transform 0.1s ease-out, background-color 0.2s ease, color 0.2s ease";
        icon.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        if (svg) {
          // Icon moves slower than the container to create a parallax effect
          // This adds depth without sacrificing SVG sharpness or causing blur
          svg.style.transition = "transform 0.2s ease-out";
          svg.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0)`;
        }
      });
    });

    icon.addEventListener("mouseleave", () => {
      if (frameId) cancelAnimationFrame(frameId);

      // Professional "Spring" return (back-out animation)
      // Prevents jitter and returns elements to origin with a slight, natural bounce
      const spring = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      
      icon.style.transition = `${spring}, background-color 0.2s ease, color 0.2s ease`;
      icon.style.transform = "translate3d(0, 0, 0)";

      if (svg) {
        svg.style.transition = spring;
        svg.style.transform = "translate3d(0, 0, 0)";
      }
    });
  });
}

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

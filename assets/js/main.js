// main.js
import * as UI from "./modules/ui.js";
import * as Theme from "./modules/theme.js";

function initAll() {
  UI.initMagneticEffect();
  UI.initScrollProgress();
  UI.initKeyboardShortcuts();
  UI.initSearch(); // Work with Swup
  Theme.initThemeToggle();
}

document.addEventListener("DOMContentLoaded", initAll);

document.addEventListener("swup:contentReplaced", () => {
  initAll(); // Called after Swup replaces content to reinitialize features
  window.scrollTo(0, 0);
});

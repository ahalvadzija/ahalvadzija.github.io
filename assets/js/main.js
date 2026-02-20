const themeToggleBtn = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

const setTheme = (isDark) => {
  htmlElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

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

window.initMagneticEffect = () => {
  document.querySelectorAll(".social-icon-lucide").forEach((icon) => {
    let frameId = null;

    icon.addEventListener("mousemove", (e) => {
      const rect = icon.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        icon.style.transition = "none";
        const svg = icon.querySelector("svg");
        if (svg) svg.style.transition = "none";

        icon.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
        if (svg) {
          svg.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) scale(1.1)`;
        }
      });
    });

    icon.addEventListener("mouseleave", () => {
      if (frameId) cancelAnimationFrame(frameId);

      const spring = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      icon.style.transition = spring;
      icon.style.transform = "translate3d(0, 0, 0) rotateX(0) rotateY(0)";

      const svg = icon.querySelector("svg");
      if (svg) {
        svg.style.transition = spring;
        svg.style.transform = "translate3d(0, 0, 0) scale(1)";
      }
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  initMagneticEffect();
});

document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    return;
  }

  const isK = e.key.toLowerCase() === "k";
  const isSlash = e.key === "/";
  const modifier = e.ctrlKey || e.metaKey;

  if (isSlash || (modifier && isK)) {
    e.preventDefault();
    window.location.href = "/search/";
  }
});

/* assets/js/main.js */

// English: Function to initialize Lucide icons
// Bosnian: Inicijalizacija Lucide ikona
export function initIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// English: Function for the magnetic effect on social icons
// Bosnian: Magnetni efekat za ikone društvenih mreža
export function initMagneticEffect() {
  document.querySelectorAll(".social-icon-lucide").forEach((icon) => {
    let frameId = null;

    icon.addEventListener("mousemove", (e) => {
      const rect = icon.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        icon.style.transition = "none";
        const svg = icon.querySelector("svg");
        if (svg) svg.style.transition = "none";

        icon.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
        if (svg) {
          svg.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) scale(1.1)`;
        }
      });
    });

    icon.addEventListener("mouseleave", () => {
      if (frameId) cancelAnimationFrame(frameId);
      const spring = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      icon.style.transition = spring;
      icon.style.transform = "translate3d(0, 0, 0) rotateX(0) rotateY(0)";
      const svg = icon.querySelector("svg");
      if (svg) {
        svg.style.transition = spring;
        svg.style.transform = "translate3d(0, 0, 0) scale(1)";
      }
    });
  });
}

// English: Function to handle scroll progress bar
// Bosnian: Funkcija za scroll progress bar
export function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress-bar");
  if (!progressBar) return;

  const updateBar = () => {
    const winScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + "%";
  };

  window.addEventListener("scroll", updateBar);
  updateBar();
}

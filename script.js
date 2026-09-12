const revealItems = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const siteNav = document.querySelector(".site-nav");
const languageSelect = document.querySelector(".language-select");

const syncMobileClass = () => {
  document.body.classList.toggle("is-compact-mobile", window.innerWidth <= 820);
  if (window.innerWidth > 820) {
    header?.classList.remove("is-menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
};

syncMobileClass();
window.addEventListener("resize", syncMobileClass);

menuToggle?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("is-menu-open") || false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    header?.classList.remove("is-menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

languageSelect?.addEventListener("change", () => {
  window.location.href = languageSelect.value;
});

const galleryMount = document.querySelector("[data-full-gallery]");

if (galleryMount) {
  const imageCount = 43;
  const altText = galleryMount.dataset.alt || "Bodrum beachfront luxury villa gallery";

  for (let index = 1; index <= imageCount; index += 1) {
    const imageNumber = String(index).padStart(2, "0");
    const link = document.createElement("a");
    const image = document.createElement("img");

    link.className = "full-gallery-item";
    link.href = `/assets/gallery-full-${imageNumber}.png`;
    link.target = "_blank";
    link.rel = "noopener";

    image.src = `/assets/gallery-full-${imageNumber}.png`;
    image.alt = `${altText} ${index}`;
    image.loading = "lazy";

    link.append(image);
    galleryMount.append(link);
  }
}

const form = document.querySelector(".contact-form");

form?.addEventListener("submit", (event) => {
  if (form.action && !form.dataset.demo) {
    return;
  }

  event.preventDefault();
  const button = form.querySelector("button");

  if (!button) {
    return;
  }

  const originalText = button.textContent;
  button.textContent = button.dataset.success || "Request received";
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    form.reset();
  }, 2200);
});

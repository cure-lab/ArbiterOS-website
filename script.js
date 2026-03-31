const header = document.querySelector(".site-header");
const revealTargets = document.querySelectorAll(
  ".feature-card, .scenario-card, .step, .flow-item, .cta-card, .hero-panel"
);

function handleHeaderState() {
  if (!header) return;
  if (window.scrollY > 8) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function setupReveal() {
  revealTargets.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  revealTargets.forEach((el) => io.observe(el));
}

window.addEventListener("scroll", handleHeaderState, { passive: true });
window.addEventListener("load", () => {
  handleHeaderState();
  setupReveal();
});

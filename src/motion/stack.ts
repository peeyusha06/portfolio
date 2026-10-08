import { gsap } from "gsap";

// research cards are CSS-sticky; each one sinks back and dims as the next card slides over it
export function cardStack() {
  const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    const st = { trigger: next, start: "top bottom", end: "top 88px", scrub: true };
    gsap.to(card, { scale: 0.94, ease: "none", scrollTrigger: st });
    gsap.to(card.querySelector("[data-shade]"), { opacity: 0.7, ease: "none", scrollTrigger: { ...st } });
  });
}

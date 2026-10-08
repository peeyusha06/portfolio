import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { dur, ease } from "./tokens";

// the intro: name rises line by line, polaroid drops in and settles at its tilt
export function heroIntro() {
  const q = (k: string) => document.querySelector<HTMLElement>(`[data-hero="${k}"]`);
  const name = q("name");
  const polaroid = q("polaroid");
  if (!name || !polaroid) return;

  const rest = ["eyebrow", "punch", "sub", "ctas"].map(q).filter(Boolean) as HTMLElement[];
  const tl = gsap.timeline({ defaults: { ease: ease.out } });

  SplitText.create(name, {
    type: "chars,lines",
    mask: "lines",
    linesClass: "line",
    autoSplit: true,
    onSplit(self) {
      gsap.set(name, { visibility: "visible" });
      return tl.from(self.chars, { yPercent: 130, duration: dur.cinematic, stagger: 0.035, ease: ease.signature }, 0);
    },
  });

  tl.fromTo(rest, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: dur.slow, stagger: 0.08 }, 0.45)
    .fromTo(
      polaroid,
      { autoAlpha: 0, yPercent: -18, rotate: -14 },
      { autoAlpha: 1, yPercent: 0, rotate: 4, duration: dur.cinematic, ease: "back.out(1.4)" },
      0.25,
    );
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { dur, ease } from "./tokens";

// section titles rise line by line; blocks fade up once when they enter
export function reveals() {
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 130,
          duration: dur.slow,
          stagger: 0.1,
          ease: ease.signature,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      },
    });
  });

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) =>
      gsap.fromTo(els, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: dur.slow, stagger: 0.08, ease: ease.out }),
  });
}

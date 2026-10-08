import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { smoothScroll } from "./scroll";
import { heroIntro } from "./hero";
import { reveals } from "./reveals";
import { cardStack } from "./stack";
import { creativeStrip } from "./strip";
import { magnetic, tilt } from "./pointer";
import { draggableNotes } from "./notes";
import { countUp } from "./count";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Draggable, InertiaPlugin);
CustomEase.create("signature", "0.625,0.05,0,1");

export async function initMotion() {
  await document.fonts.ready;
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    document.documentElement.classList.add("motion-live");
    const stopScroll = smoothScroll();
    heroIntro();
    reveals();
    countUp();
    // lazy images and fonts change the page height after triggers are measured; re-measure when it changes
    let h = document.body.offsetHeight;
    let t = 0;
    const ro = new ResizeObserver(() => {
      if (document.body.offsetHeight === h) return;
      h = document.body.offsetHeight;
      clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);
    return () => { ro.disconnect(); clearTimeout(t); stopScroll(); };
  });

  // the card stack only where the cards are sticky (matches the CSS breakpoint)
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 901px)", () => cardStack());

  // the creative strip is navigation, not decoration, so it works in every mode
  mm.add({ fine: "(hover: hover) and (pointer: fine)", all: "all" }, (ctx) => creativeStrip(!!ctx.conditions?.fine));

  mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
    const offMagnetic = magnetic();
    const offTilt = tilt();
    const offNotes = draggableNotes();
    return () => { offMagnetic(); offTilt?.(); offNotes?.(); };
  });

  // everything is visible without motion
  mm.add("(prefers-reduced-motion: reduce)", () => {
    document.documentElement.classList.remove("motion-ready");
  });
}

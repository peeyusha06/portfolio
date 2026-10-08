import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

// creative strip: native horizontal scroll, plus arrows, a progress bar and (on desktop) drag-to-throw
export function creativeStrip(canDrag: boolean) {
  const strip = document.querySelector<HTMLElement>("[data-strip]");
  const prev = document.querySelector<HTMLButtonElement>("[data-strip-prev]");
  const next = document.querySelector<HTMLButtonElement>("[data-strip-next]");
  const bar = document.querySelector<HTMLElement>("[data-strip-bar]");
  if (!strip || !prev || !next || !bar) return;

  const setBar = gsap.quickSetter(bar, "scaleX");
  const update = () => {
    const max = strip.scrollWidth - strip.clientWidth;
    const p = max > 0 ? strip.scrollLeft / max : 1;
    setBar(0.12 + p * 0.88);
    prev.disabled = strip.scrollLeft < 4;
    next.disabled = strip.scrollLeft > max - 4;
  };
  const step = (dir: number) => {
    const piece = strip.querySelector<HTMLElement>(".piece");
    const by = piece ? piece.offsetWidth + 40 : strip.clientWidth * 0.8;
    strip.scrollBy({ left: dir * by, behavior: "smooth" });
  };
  const onPrev = () => step(-1);
  const onNext = () => step(1);

  strip.addEventListener("scroll", update, { passive: true });
  prev.addEventListener("click", onPrev);
  next.addEventListener("click", onNext);
  window.addEventListener("resize", update);
  update();

  // dragging fights scroll-snap, so snapping is switched off while the hand is down
  const drag = canDrag
    ? Draggable.create(strip, {
        type: "scrollLeft",
        inertia: true,
        allowNativeTouchScrolling: true,
        onPress() { strip.style.scrollSnapType = "none"; strip.style.cursor = "grabbing"; },
        onRelease() { strip.style.cursor = ""; },
        onThrowComplete() { strip.style.scrollSnapType = ""; },
        onDragEnd() { if (!this.tween) strip.style.scrollSnapType = ""; },
      })
    : [];

  return () => {
    strip.removeEventListener("scroll", update);
    prev.removeEventListener("click", onPrev);
    next.removeEventListener("click", onNext);
    window.removeEventListener("resize", update);
    drag.forEach((d) => d.kill());
  };
}

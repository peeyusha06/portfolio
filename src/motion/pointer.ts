import { gsap } from "gsap";

// magnetic buttons: pulled a little toward the cursor, springs back on leave
export function magnetic() {
  const off: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    let r = el.getBoundingClientRect();
    const enter = () => (r = el.getBoundingClientRect());
    const move = (e: PointerEvent) => {
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.3);
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    off.push(() => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  });
  return () => off.forEach((f) => f());
}

// polaroid leans toward the cursor across the hero
export function tilt() {
  const el = document.querySelector<HTMLElement>("[data-tilt]");
  const area = el?.closest("section");
  if (!el || !area) return;
  const rx = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
  const ry = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
  gsap.set(el, { transformPerspective: 900 });
  const move = (e: PointerEvent) => {
    rx(((e.clientX / window.innerWidth) - 0.5) * 14);
    ry(((e.clientY / window.innerHeight) - 0.5) * -10);
  };
  const leave = () => { rx(0); ry(0); };
  area.addEventListener("pointermove", move);
  area.addEventListener("pointerleave", leave);
  return () => {
    area.removeEventListener("pointermove", move);
    area.removeEventListener("pointerleave", leave);
  };
}

import { gsap } from "gsap";

// numbers count up once, keeping the decimals and separators they were written with
export function countUp() {
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const final = el.textContent ?? "";
    const m = final.match(/[\d.,]+/);
    if (!m) return;
    const target = parseFloat(m[0].replace(/,/g, ""));
    const decimals = (m[0].split(".")[1] ?? "").length;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        const n = obj.v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        el.textContent = final.replace(m[0], n);
      },
      onComplete: () => { el.textContent = final; },
    });
  });
}

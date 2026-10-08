import { Draggable } from "gsap/Draggable";

// sticky notes can be thrown around the board (pointer devices only)
export function draggableNotes() {
  const board = document.querySelector<HTMLElement>("[data-board]");
  if (!board) return;
  const d = Draggable.create("[data-note]", { type: "x,y", bounds: board, inertia: true, edgeResistance: 0.8, zIndexBoost: true });
  return () => d.forEach((x) => x.kill());
}

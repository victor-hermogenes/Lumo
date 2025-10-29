export const slideIn = {
  hidden: { x: 24, opacity: 0 },
  show:   { x: 0,  opacity: 1, transition: { type: "spring", stiffness: 240, damping: 22 } },
  exit:   { x: -24, opacity: 0, transition: { duration: 0.18 } }
};

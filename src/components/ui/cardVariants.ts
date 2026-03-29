import { easeOut } from "motion";

export const cardVariants = {
  inactive: {
    opacity: 0.4,
    filter: "blur(6px)",
    scale: 0.95,
    y: 40,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
  active: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export type Direction = 1 | -1;

type SlideStyle = {
  x: string | number;
  position: "absolute" | "relative";
  width: string;
};

type SlideVariants = {
  enter: (direction: Direction) => SlideStyle;
  center: SlideStyle;
  exit: (direction: Direction) => SlideStyle;
};

export const slideVariants: SlideVariants = {
  enter: (direction) => ({
    x: direction === 1 ? "100%" : "-100%",
    position: "absolute",
    width: "100%",
  }),
  center: {
    x: 0,
    position: "relative",
    width: "100%",
  },
  exit: (direction) => ({
    x: direction === 1 ? "-100%" : "100%",
    position: "absolute",
    width: "100%",
  }),
};

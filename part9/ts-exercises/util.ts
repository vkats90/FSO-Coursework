export const errorHandler = (args: number[]): boolean => {
  args.map((x) => {
    if (isNaN(x)) {
      throw new Error("malformatted parameters");
    }
  });
  return true;
};

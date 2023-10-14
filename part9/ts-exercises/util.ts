export const errorHandler = (args: number[]): boolean => {
  args.map((x) => {
    if (isNaN(x)) {
      throw new Error("Some of your arguments are not numbers");
    }
  });
  return true;
};

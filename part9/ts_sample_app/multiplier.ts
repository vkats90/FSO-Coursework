const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);

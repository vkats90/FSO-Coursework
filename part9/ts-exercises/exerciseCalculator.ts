import { errorHandler } from "./util";

interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const calculateExercises = (hours: number[], target: number): ExerciseData => {
  if (hours.length < 5)
    throw new Error("Finish a week before getting your results");
  if (hours.length > 20)
    throw new Error("Period longer than a month, imput less hours");

  let average: number = hours.reduce((a, b) => a + b) / hours.length;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;
  switch (true) {
    case average < target:
      rating = 1;
      ratingDescription = "Try harder";
      break;
    case average == target:
      rating = 2;
      ratingDescription = "You did it!";
      break;
    case average > target:
      rating = 3;
      ratingDescription = "You outdid yourself!";
      break;
  }
  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h > 0).length,
    target,
    average,
    success: average > target,
    rating,
    ratingDescription,
  };
};

let args: number[] = process.argv.slice(2).map((x) => Number(x));
try {
  errorHandler(args);
  console.log(calculateExercises(args.slice(1), args[0]));
} catch (error: unknown) {
  if (error instanceof Error) console.log(error.message);
}
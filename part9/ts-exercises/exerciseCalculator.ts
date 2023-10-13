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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1.5));

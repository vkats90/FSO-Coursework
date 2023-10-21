import express from "express";
import { errorHandler } from "./util";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseData } from "./exerciseCalculator";
const app = express();

interface InputData {
  target: number;
  daily_exercises: number[];
}

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const args: number[] = [Number(req.query.height), Number(req.query.weight)];
  try {
    if (!req.query.height || !req.query.weight)
      throw new Error("Provide 2 arguments");
    errorHandler(args);
    res.json({
      height: req.query.height,
      weight: req.query.weight,
      bmi: calculateBmi(args[0], args[1]),
    });
  } catch (error: unknown) {
    if (error instanceof Error) res.json({ error: error.message });
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises }: InputData = req.body;
    if (!target || !daily_exercises) throw new Error("missing parameters");
    errorHandler([target, ...daily_exercises]);
    const result: ExerciseData = calculateExercises(daily_exercises, target);
    res.send(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.toString() });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

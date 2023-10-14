import express from "express";
import { errorHandler } from "./util";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  let args: number[] = [Number(req.query.height), Number(req.query.weight)];
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import { PhoneNumber } from './model/phonenumbers'
import { NextFunction, Request, Response } from 'express'

export const getAll = async (req: Request, res: Response) => {
  await PhoneNumber.find({}).then((numbers) => {
    res.json(numbers)
  })
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const person = await PhoneNumber.findOne({ _id: req.params.id })
    if (!person)
      res
        .status(404)
        .json({
          error: 'person does not exist',
        })
        .end()
    else res.json(person)
  } catch (err) {
    next(err)
  }
}

export const addOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body || !req.body.name || !req.body.number)
    res.status(400).json({ error: 'Missing fields, fill out all the fields' })
  else {
    try {
      const person = await PhoneNumber.findOne({ name: req.body.name })
      if (person) {
        console.log()
        await PhoneNumber.findOneAndUpdate(
          { name: req.body.name },
          { name: req.body.name, number: req.body.number }
        )
        res.json(person)
      } else {
        const pers = new PhoneNumber(req.body)
        await pers.save()
        res.json(pers)
      }
    } catch (err) {
      next(err)
    }
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const person = await PhoneNumber.findByIdAndDelete(req.params.id)
    res.json(person)
  } catch (err) {
    next(err)
  }
}

export const info = async (req: Request, res: Response) => {
  const length = await PhoneNumber.find({})
  res.send(`Phonebook has info for ${length.length} people <br/> ${Date()}`)
}

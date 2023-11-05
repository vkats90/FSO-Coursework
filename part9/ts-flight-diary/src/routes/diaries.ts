import express from 'express'
import diaryService from '../services/diaryService'
import toNewDiaryEntry from '../utils'

const diaryRouter = express.Router()

diaryRouter.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries())
})

diaryRouter.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id))

  if (diary) {
    res.send(diary)
  } else {
    res.sendStatus(404)
  }
})

diaryRouter.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addedEntry = diaryService.addDiary(newDiaryEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default diaryRouter

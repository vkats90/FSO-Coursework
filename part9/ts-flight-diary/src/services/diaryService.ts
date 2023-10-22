import diaryData from '../../data/entries'

import { NonSensitiveDiaryEntry, DiaryEntry } from '../types'

const diaries: DiaryEntry[] = diaryData

const getEntries = (): DiaryEntry[] => {
  return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }))
}

const addDiary = () => {
  return null
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
}

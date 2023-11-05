import axios from 'axios'

import { Diary, NewDiaryEntry } from '../types'

const baseURL = 'http://localhost:3000/api/diaries'

export const getDiaries = async () => {
  let diaries = await axios.get<Diary[]>(baseURL)
  return diaries.data
}

export const addNewEntry = async (newEntry: NewDiaryEntry) => {
  let addedEntry = await axios.post<Diary>(baseURL, newEntry)
  console.log(addedEntry.data)
}

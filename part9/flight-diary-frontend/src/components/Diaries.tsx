import { getDiaries } from '../services/diaryService'
import { Diary } from '../types'
import { useState, useEffect } from 'react'

const Diaries = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    getDiaries().then((res) => setDiaries(res))
  }, [])

  return (
    <div>
      <h1>Flight Diary</h1>
      <ul>
        {diaries &&
          diaries.map((x) => {
            return (
              <li key={x.id}>
                <h3 style={{ marginBottom: 1 }}>
                  <b>{x.date}</b>
                </h3>
                <div>Weather: {x.weather}</div>
                <div>Visibility: {x.visibility}</div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Diaries

import { addNewEntry } from '../services/diaryService'
import { NewDiaryEntry, Weather, Visibility } from '../types'
import { useState } from 'react'
import MessageContext from '../context'
import { useContext } from 'react'

const NewDiary = () => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState('')
  const { setMessage, setColor } = useContext(MessageContext)

  const handleSubmit = async (event: React.SyntheticEvent) => {
    if (!date) alert('Must add date')
    event.preventDefault()
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility,
      weather: weather,
      comment,
    }
    let res = await addNewEntry(newEntry)
    if (!res) {
      setMessage('added new entry for date: ' + newEntry.date)
      setColor('green')
      setTimeout(() => setMessage(''), 3000)
    } else {
      setMessage(res)
      setColor('red')
      setTimeout(() => setMessage(''), 3000)
    }

    setDate('')
    setComment('')
  }

  return (
    <div>
      <h1>Add New Entry</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date: </label>
        <input
          type="text"
          value={date}
          placeholder="enter entry date"
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        <label htmlFor="weather">Weather: </label>
        <select
          id="weather"
          name="Weather"
          onChange={({ target }) => setWeather(target.value as Weather)}
        >
          <option value="sunny">sunny</option>
          <option value="rainy">rainy</option>
          <option value="cloudy">cloudy</option>
          <option value="stormy">stormy</option>
          <option value="windy">windy</option>
        </select>
        <br />
        <label htmlFor="visibility">Visibility: </label>
        <select
          id="visibility"
          name="Visibility"
          onChange={({ target }) => setVisibility(target.value as Visibility)}
        >
          <option value="great">great</option>
          <option value="good">good</option>
          <option value="ok">ok</option>
          <option value="poor">poor</option>
        </select>
        <br />
        <label htmlFor="comment">Comment: </label>
        <input
          type="text"
          value={comment}
          placeholder="enter comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewDiary

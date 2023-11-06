import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Diaries from './components/Diaries'
import NewDiary from './components/NewDIary'
import MessageContext from './context'
import { useContext } from 'react'

function App() {
  const { message, color } = useContext(MessageContext)
  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/add-entry">
          New Entry
        </Link>
      </div>

      {message && (
        <p style={{ color, border: `1px solid ${color}`, padding: 5 }}>{message as string}</p>
      )}

      <Routes>
        <Route path="/" element={<Diaries />} />
        <Route path="/add-entry" element={<NewDiary />} />
      </Routes>

      <div>
        <br />
        <i>Flight Diary by Vlad Kats</i>
      </div>
    </Router>
  )
}

export default App

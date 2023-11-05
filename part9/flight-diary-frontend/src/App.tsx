import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Diaries from './components/Diaries'
import NewDiary from './components/NewDIary'

function App() {
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

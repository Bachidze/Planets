import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Planets from './Components/Planets/Planets'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/Mercury" />} />
        <Route path='/:id' element={<Planets />} />
      </Routes>
    </>
  )
}

export default App

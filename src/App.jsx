import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListTds from './components/ListTDs'
import TdDetails from './components/TdDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ListTds /> */}
      <TdDetails />
    </>
  )
}

export default App

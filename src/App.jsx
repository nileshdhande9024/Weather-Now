import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Weathernow from './components/Weathernow'
import backimage from './assets/backweather.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 */}
    {/* style={{ backgroundImage: `url(${backimage})`}} */}
      <div className="min-h-screen bg-gradient-to-b from-green-100 via-green-200 to-green-300 flex justify-center
      font-mono" >
        <Weathernow/>
      </div>    
    </>
  )
}

export default App

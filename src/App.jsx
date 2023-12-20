import { useState } from 'react'
import './App.css'
import { NavBar } from './components/NavBar'
import Hero from './components/Hero'
import { FeaturedProperties } from './components/FeaturedProperties'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='background1'>
     <NavBar />
     <Hero />
     <FeaturedProperties />
    </div> 
    </>
  )
}

export default App

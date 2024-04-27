import { useEffect } from 'react'
import './App.css'

import ListHeader from './components/ListHeader'

function App() {
  const userEmail = 'fu@rakut3n.com'
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      console.log(json)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => getData)

  return (
    <div className='app'>
      <ListHeader listName={'🐼 Rakuten'}/>
    </div>
  )
}

export default App

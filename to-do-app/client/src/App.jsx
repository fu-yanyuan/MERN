import { useEffect, useState } from 'react'
import './App.css'

import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'

function App() {
  const userEmail = 'fu@rakut3n.com'
  const authed = false
  const [tasks, setTasks] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      // console.log(json)
      console.log(response)
      setTasks(json)
    } catch (err) {
      console.log(err)
    }
  }

  // set dependencies to []
  // //Runs only on the first render
  // useEffect(() => getData, [])
  useEffect(() => {
    if (authed) {
      getData()
    }
  }, [])

  console.log(tasks)

  const sortedTasks = tasks?.sort((a, b) => a.date.localeCompare(b.date))
  console.log(sortedTasks)
  console.log('hi')

  return (
    <div className='app'>
      {!authed && <Auth />}
      {authed &&
      <>
        <ListHeader listName={userEmail} getData={getData}/>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
      </> }

    </div>
  )
}

export default App

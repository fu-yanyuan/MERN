import { React, useState } from "react"
import { useCookies } from 'react-cookie'

const Modal = ({mode, setShowModal, task, getData}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const editMode = mode === 'edit' ? true : false

  const getDateStr = () => {
    // Get current date
    const currentDate = new Date();

    // Get year, month, and day components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Create the YYYYMMDD string
    const dateString = `${year}${month}${day}`;

    return dateString
  }

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : getDateStr()
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setData(data => ({
      ...data,
      [name] : value
    }))

    console.log(data)
    // console.log(getDateStr())
  } 

  const postData = async (e) => {
    e.preventDefault()
  
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData); // Log the parsed JSON data
        setShowModal(false)
        // reload items
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const editData = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status == 200) {
        const responseData = await response.json();
        console.log(responseData); // Log the parsed JSON data
        setShowModal(false)
        // reload items
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label>Drag to select your progress</label>
          <input 
            required
            type="range"
            min={0}
            max={100}
            name="progress"
            value={data.progress}
            onChange={handleChange}  
          />
          <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
        </form>
      </div>
    </div>
  )

}
  
export default Modal
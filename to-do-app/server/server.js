const PORT = 8000
const express = require('express')
const app = express()
const pool = require('./db');

// otherwise, will be blocked
const cors = require('cors')
app.use(cors())
app.use(express.json())

// psql has no auto increment
const { v4: uuidv4 } = require('uuid')

app.get('/', (req, res) => {
    res.send('🏝️ holiday!')
})

// read data
app.get('/todos/:userEmail', async (req, res) => {
    // const userEmail = 'fu@rakut3n.com'  // this should be from font-end.
    // let's read the userEmail from request 
    // console.log(req)
    const { userEmail } = req.params
    console.log(userEmail)

    try {
        // await
        const result = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(result.rows)
        // console.log(res)
    } catch (err) {
        console.error(err)
    }
})

// create a new todo task
app.post('/todos', (req, res) => {
    const {user_email, title, progress, date} = req.body
    console.log(user_email, title, progress, date)
    // console.log(res)
    const id = uuidv4()
    try {
        pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)', 
        [id, user_email, title, progress, date])
        // res.status(200).json({message: 'Data received successfully'});
        res.status(200).json({message: 'Data received successfully'})
        // console.log(res)
    } catch (err) {
        console.log(err)
    }
})

// update 
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    const {user_email, title, progress, date} = req.body
    try {
        pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;', 
        [user_email, title, progress, date, id])
        res.status(200).json({message: 'Data updated successfully'})
    } catch (err) {
        console.log(err)
    }
})

// delete
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        pool.query('DELETE FROM todos WHERE id = $1', [id])
        res.status(200).json({message: 'Data updated successfully'})
    } catch (err) {
        console.log(err)
    }
})



app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
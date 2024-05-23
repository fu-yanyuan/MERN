const PORT = 8000
const express = require('express')
const app = express()
const pool = require('./db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

// signup
app.post('/signup', async (req, res) => {
    const {email, password} = req.body

    console.log(email, password)

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        const signUp = await pool.query('INSERT INTO users (email, hashed_password) VALUES ($1, $2)', 
        [email, hashedPassword])

        const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr'})
        res.status(200).json({email, token})
        console.log(token)
    } catch (err) {
        // console.log(err)
        if (err) {
            res.status(409).json({errMsg : err.detail})
        }
    }
})

// login
app.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        // empty
        if (!user.rows.length) return res.status(409).json({errMsg : 'User does not exist!'})

        const success = await bcrypt.compare(password, user.rows[0].hashed_password)
        if (success) {
            const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr'})
            res.status(200).json({email, token})
        } else {
            res.status(401).json({errMsg : 'Invalid password'})
        }


    } catch (err) {
        console.log(err) 
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
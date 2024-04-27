const PORT = 8000
const express = require('express')
const app = express()
const pool = require('./db');

// otherwise, will be blocked
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.send('🏝️ holiday!')
})

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
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
const PORT = 8000
const express = require('express')
const app = express()
const pool = require('./db');

app.get('/', (req, res) => {
    res.send('🏝️ holiday!')
})

app.get('/todos', async (req, res) => {
    const userEmail = 'fu@rakut3n.com'  // this should be from font-end.

    try {
        // await
        const result = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(result.rows)
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
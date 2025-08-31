const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin:'https://codereview-zz9b.onrender.com',
    credentials:true
}))

app.get('/', (req, res) => {
    res.send("HEllo world");
})

app.use('/ai', aiRoutes)

module.exports = app

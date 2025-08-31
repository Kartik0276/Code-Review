const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.get('/', (req, res) => {
    res.send("HEllo world");
})

app.use('/ai', aiRoutes)

module.exports = app
import express from 'express'
const app = express()

app.use(express.static(`./dist`))

app.get(`/*`, function(req, res) {
    res.sendFile(`index.html`, {root: `dist`})
})

app.listen(process.env.PORT || 80, function() {
    console.log(`Listening: Server on port: `, process.env.PORT || 80)
})
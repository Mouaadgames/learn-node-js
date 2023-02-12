const ardCom = require("./arduinoComunication")
const express = require("express")
const path = require('path')
const app = express()
app.use(express.static("./public"))
app.get('/api/ledState', async function (req, res) {
    let LEDState = ardCom.getCurrentState()
    res.json({ status: LEDState })
})
app.get('/api/setStateTo/:sta', async function (req, res) {
    let sta = req.params.sta
    const isDone = await ardCom.setStateTo(Number(sta))
    res.json({ stateOfRequest: isDone })
})
app.all("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/notFound.html'))
})
app.listen(2999, () => { console.info("I'm listening at 2999") })

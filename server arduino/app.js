const ardCom = require("./arduinoComunication")
const express = require("express")
const path = require('path')
const app = express()
app.use(express.static("./public"))

app.get('/api/ledState', async function (req, res) { // no need for async fun
    let LEDState = ardCom.getCurrentState()
    res.json({ status: LEDState })
}) // done 

app.get('/api/setStateTo/:sta', async function (req, res) {
    let sta = req.params.sta
    const isDone = await ardCom.setStateTo(Number(sta))
    res.json({ stateOfRequest: isDone })
})//done

app.get('/api/light', async function (req, res) { // no need for async
    let mainLightState = ardCom.GetLightState()
    res.json({ status: mainLightState })
})

app.get('/api/light/toggle', async function (req, res) {
    const isDone = await ardCom.toggleLightState()
    res.json({ stateOfRequest: isDone })
})

app.get('/api/buzzer', async function (req, res) {
    const isDone = await ardCom.buzzer()
    res.json({ stateOfRequest: isDone })
})

app.all("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/notFound.html'))
})

app.listen(2999, () => { console.info("I'm listening at 2999") })

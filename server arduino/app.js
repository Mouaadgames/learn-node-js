const arduinoCom = require("./arduinoComunication")
const express = require("express")
const fl = require("./writeData.js")
const app = express()
//the get status page
app.get("/", (req, res) => {
    res.send(`hello, world! ${arduinoCom.getCurrentState()}`)
    // .then((respond) => {
    //     res.send(`hello, world! ${ respond }`)
    // })

})
//the change page
app.get("/change", (req, res) => {
    arduinoCom.changeState().then((sta) => {
        res.send(`hello, world! ${sta}`)
    })
    // .then((respond) => {
    //     res.send(`hello, world! ${ respond }`)
    // })   
})

app.all("*", (req, res) => {
    res.status(404).send("<h1>Not Found</h1>")
})
app.listen(2999, () => {
    console.log("start listening at 2999")
})

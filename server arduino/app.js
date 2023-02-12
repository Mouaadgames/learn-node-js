//const arduinoCom = require("./arduinoComunication")
const express = require("express")
const fl = require("./writeData.js")
const app = express()
app.listen(2999, () => {
    console.log("start listening at 2999")
})
app.use(express.static("web site"))
console.log(fl.getData())
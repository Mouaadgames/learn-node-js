const arduinoCom = require("./arduinoComunication")
const express = require("express")
const app = express()
app.listen(2999, () => {
    console.log("start lesning to 2999")
})
app.use(express.static("web site"))
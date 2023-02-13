const express = require("express")
const path = require("path")

const app = express()

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, "./public/postTest.html")) })
app.get("/login", (req, res) => {
    console.log(req)
    res.send("hello get")
})
app.post("/login", (req, res) => {
    console.log(req)
    res.json({ state: "recived" })
})
app.listen(3000, () => { console.log("port : 3000") })
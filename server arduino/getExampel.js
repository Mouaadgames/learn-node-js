const express = require("express")
const path = require("path")

const app = express()
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, "./public/postTest.html")) })
app.get("/login", (req, res) => {
    console.log(req)
    res.send("hello get")
})
app.post("/login", (req, res) => {
    res.json({ state: "recived", data: req.body.email })
})
app.listen(3000, () => { console.log("port : 3000") })
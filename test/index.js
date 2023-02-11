const express = require("express")
const app = express()
app.listen(3001, () => console.log("listening at port 3001"))
app.use(express.static("folder"))
app.use(express.json({ limit: "100b" }))
app.post('/api', (request, response) => {
    console.log(request)
    response.redirect("/")
})
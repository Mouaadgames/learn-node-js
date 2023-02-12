const { readFileSync, writeFileSync } = require("fs")
function save(data) {

}
function getData() {
    let file = readFileSync("./logs/numberOfPress.txt", "utf-8")
    return file
}


module.exports = { getData, save }
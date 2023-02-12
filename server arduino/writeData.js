const { readFileSync, writeFileSync } = require("fs")
function save(data, flag) {
    writeFileSync(
        "./logs/numberOfPress.txt",
        data,
        { flag })
}
function getData() {
    let file = readFileSync("./logs/numberOfPress.txt", "utf-8")
    return file
}


module.exports = { getData, save }
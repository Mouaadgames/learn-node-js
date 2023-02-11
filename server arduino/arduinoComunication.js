const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({
    path: 'COM7',
    baudRate: 9600,
})

const parser = new ReadlineParser()
let state = 0
port.pipe(parser)

port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }
})

port.on('open', function () {
    console.log("init comunication")
})

parser.on("data", (line) => {
    let data = line.slice(0, -1)

    console.log(`the data geted: ${data}`)
    if (data === "ok") { //
        getCurrentState()
    }
    else if (data === "0" || data === "1" || data === "2") {
        state = parseInt(data)
        console.log(`the state var: ${state}`)
    }
    if (data === "k") {

        console.log(`data send: start`)
        port.write("start")
    }


})


//export those functions
function changeState() {
    state = (state + 1) % 3
    sendState()
}
function setStateTo(value) {
    state = value % 3
    sendState()
}
function getCurrentState() {
    port.write("get")
}


function sendState() {
    console.log("send data:" + String(state))
    port.write(String(state))
}



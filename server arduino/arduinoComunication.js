const { rejects } = require('assert')
const { resolve } = require('path')
const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({
    path: 'COM7',
    baudRate: 9600,
})

const parser = new ReadlineParser()
let state = 0
let data
try {
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
        data = line.slice(0, -1)

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
        return sendState()

    }
    function setStateTo(value) {
        state = value % 3
        return sendState()
    }
    function getCurrentState() {
        return state

        // port.write("get")
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => { resolve(state) }, 1000)
        // })
    }

    let allReadyWitten = false
    function sendState() {
        if (!allReadyWitten) {
            console.log("send data:" + String(state))
            port.write(String(state))
            allReadyWitten = true
            return new Promise((res, rej) => {
                //need better way to check
                setTimeout(() => {
                    res("done")
                    allReadyWitten = false
                }, 1000)
            })
        }
    }

} catch (error) {
}

module.exports = { getCurrentState, setStateTo, changeState, state }
const { rejects } = require('assert')
const { write } = require('fs')
const { resolve } = require('path')
const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({
    path: 'COM7',
    baudRate: 9600,
})

const parser = new ReadlineParser()
let state = 0
let lightState = true;
let data
let comuncationIsStarted = false
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

        console.log(`arduino: ${data}`)
        if (data === "ok") { // comunication is started
            getCurrentState()
            comuncationIsStarted = true
        }
        if (data === "0" || data === "1" || data === "2") {
            state = parseInt(data)
            console.log(`the state var: ${state}`)
            GetLightState()
        }
        if (data === "on" || data === "off") {
            lightState = data === "on" // yes == true else false and its false
        }
        if (data === "k") {

            console.log(`start comuncation: start`)
            port.write("start")
        }


    })

    let allReadyWitten = false
    function GetLightState() {
        return lightState
    }

    function toggleLightState() {
        return Write("toggleLight")
    }

    function buzzer() {
        return Write("buzzer")
    }
    //export those functions
    // first not used 
    function changeState() {
        state = (state + 1) % 3
        return Write(state)
    }

    function setStateTo(value) {
        state = value % 3
        return Write(state)
    }

    function getCurrentState() {
        Write("get")
        return state

        // return new Promise((resolve, reject) => {
        //     setTimeout(() => { resolve(state) }, 1000)
        // })
    }

    function Write(dataToWrite) {
        if (!allReadyWitten && comuncationIsStarted) {
            console.log("mouaad: " + dataToWrite)
            port.write(String(dataToWrite))
            allReadyWitten = true
            return new Promise((res, rej) => {
                //need better way to check
                setTimeout(() => {
                    res("done")
                    allReadyWitten = false
                }, 2000)
            })
        }
        else {
            return "too fast for the arduino"
        }
    }

} catch (error) {
}

module.exports = { getCurrentState, setStateTo, changeState, toggleLightState, GetLightState, buzzer }
// const { parse } = require('path')
// const serialPort = require("serialport")

// const port = new serialPort.SerialPort(
//     "COM7",
//     { baudRate: 9600 }
// )

// const parser = new serialPort.parser.Readline()

// port.pipe(parser)

// parser.on('data', (line) => {
//     console.log(line)
// })

const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({
    path: 'COM7',
    baudRate: 9600,
    autoOpen: false,
})

const parser = new ReadlineParser()
port.pipe(parser)

port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }

    // Because there's no callback to write, write errors will be emitted on the port:
    port.write('main screen turn on')
})

// The open event is always emitted
port.on('open', function () {
    // open logic
})

parser.on("data", console.log)

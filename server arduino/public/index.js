dataPar = document.querySelector(".LEDState")
setInterval(getData, 1000)
async function getData() {
    let fData = await fetch("/api/ledState")
    let jData = await fData.json()
    console.log(jData)
    editDOM(jData.status)
}

async function setDataTo(state) {
    await fetch(`/api/setStateTo/${state}`)
    editDOM(state)
}

function editDOM(state) {
    switch (state) {
        case 0:
            dataPar.setAttribute("style", "background-color:blue;")
            break;
        case 1:
            dataPar.setAttribute("style", "background-color:green;")
            break;
        case 2:
            dataPar.setAttribute("style", "background-color:red;")
            break;

        default:
            break;
    }
}
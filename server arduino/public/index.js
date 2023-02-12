const MainColor = document.querySelector(".LEDState")
const MainBuzzer = document.querySelector(".buzzer")
const MainLight = document.querySelector(".mainLight")
let lightState = true;
// setInterval(() => {
//     getStateData()

// }, 5000)

async function getStateData() {
    let fData = await fetch("/api/ledState")
    let jData = await fData.json()
    console.log(jData)
    editLEDDOM(jData.status)
    getLightData()
}
async function setDataTo(state) {
    await fetch(`/api/setStateTo/${state}`)
    editLEDDOM(state)
    getStateData()
}

// -------- //
let globaljData;
async function getLightData() {
    let fData = await fetch("/api/light")
    globaljData = await fData.json()
}
async function toggleLightState() {
    await fetch(`/api/light/toggle`)
    update() // replace get with update
}
//-------
function buzzer() {
    fetch(`/api/buzzer`)

}

function editLEDDOM(state) {
    switch (state) {
        case 0:
            MainColor.setAttribute("style", "background-color:blue;")
            break;
        case 1:
            MainColor.setAttribute("style", "background-color:green;")
            break;
        case 2:
            MainColor.setAttribute("style", "background-color:red;")
            break;

        default:
            break;
    }
}
function editmainLightDOM(on_off) {
    MainLight.setAttribute("style", (!!on_off) ? "background-color:#005a05 ;" : "background-color:#5a0000 ;")
}

function update() {
    setTimeout(() => {
        getStateData()
        editmainLightDOM(state)
        editmainLightDOM(globaljData.status)
    }, 1000)
}
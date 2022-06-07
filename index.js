const colorChooser = document.getElementById('color-chooser')
const colorMode = document.getElementById('color-mode')
const resultBox = document.querySelector('.results')

let chosenColor = colorChooser.value.substring(1)
let chosenColorMode = colorMode.value


document.getElementById('color-picker-form').addEventListener('submit', e => {
    e.preventDefault()
    chosenColor = colorChooser.value.substring(1)
    chosenColorMode = colorMode.value
    fetchData(chosenColor, chosenColorMode)
})

function fetchData(color, mode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            resultBox.innerHTML = ''
            let colorPalette = data.colors
            for(let color of colorPalette) {
                resultBox.innerHTML += `
                    <div class="result-wrapper flex">
                        <div class="color-box" style="background-color:${color.hex.value};"></div>
                        <p class="color-hex" onclick="copyToClipboard('${color.hex.value}')">${color.hex.value}</p>
                    </div>
                `
            }
        })
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard: ' + text)
}

fetchData(chosenColor, chosenColorMode)
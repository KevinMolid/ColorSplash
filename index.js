// Form
const colorForm = document.getElementById('color-form')

// Color panels
const color1 = document.getElementById('color-1')
const color2 = document.getElementById('color-2')
const color3 = document.getElementById('color-3')
const color4 = document.getElementById('color-4')
const color5 = document.getElementById('color-5')
const color6 = document.getElementById('color-6')
const colorPanelsArr = [color1, color2, color3, color4, color5, color6]

// Color hexes
const hex1 = document.getElementById('color-1-hex')
const hex2 = document.getElementById('color-2-hex')
const hex3 = document.getElementById('color-3-hex')
const hex4 = document.getElementById('color-4-hex')
const hex5 = document.getElementById('color-5-hex')
const hex6 = document.getElementById('color-6-hex')
const colorHexesArr = [hex1, hex2, hex3, hex4, hex5, hex6]

// Copied modal
const copiedModal = document.getElementById('copied-modal')


function setColor(index, color){
    colorPanelsArr[index].style.background = color
    colorHexesArr[index].innerText = color
}


// Add event listener to form
colorForm.addEventListener('submit', function(e){
    e.preventDefault()

    const colorFormData = new FormData(colorForm)

    // Get color from form
	const color = colorFormData.get('color')
    const colorNumber = color.slice(1)

    // Get color from form
	const mode = colorFormData.get('mode')

    let colors = []

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorNumber}&mode=${mode}&count=6`)
        .then(response => response.json())
        .then(data => {
            colors = data.colors

            // Real function
            for (let i = 0; i < colors.length; i++){
                const color = colors[i].hex.value
                setColor(i, color)
            }

            // Test function
            /*colors.forEach(color => {
                console.log(color.hex.value)
            }); */
        })
})

// add event listener to panels
for (let i = 0; i < colorPanelsArr.length; i++){
    colorPanelsArr[i].addEventListener('click', function(){
        const color = colorHexesArr[i].innerText
        copyColor(color)
    })
}

// add event listener to hexes
for (let i = 0; i < colorHexesArr.length; i++){
    colorHexesArr[i].addEventListener('click', function(){
        const color = colorHexesArr[i].innerText
        copyColor(color)
    })
}


function copyColor(color){
    colorToClipboard(color)
    copiedMessage()
}


function colorToClipboard(color){
    navigator.clipboard.writeText(color)
}


function copiedMessage(){
    copiedModal.style.display = 'block'

    setTimeout(() => {
        copiedModal.style.display = 'none'
      }, "1000")
}
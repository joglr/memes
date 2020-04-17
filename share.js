// Read query parameters
const params = Object.fromEntries(new URL(window.location).searchParams.entries())

// Hook into DOM nodes
const textInput = document.getElementById('text')
const link = document.getElementById('link')
const copy = document.getElementById('copy')

// Apply CSS variables
const root = document.documentElement
root.style.setProperty('--size', `${params.size}%`)
root.style.setProperty('--color', params.color)

const container = document.getElementById('add-text')

// Generate chosen image. 

// If template is chosen, load template. 
// Otherwise, load from localStorage
const img = createImageFromTemplate(params.template ? _TEMPLATES[params.template] : [
    params.file,
    localStorage.getItem(params.file)
])

container.appendChild(img)



// Apply query parameters to fields
textInput.textContent = params.text

// Generate shareable link
link.value = 'https://mems.joglr.dev' + '/share.html' + window.location.search
const selectLink = () => link.select()
link.onclick = selectLink

// Copy functionality
copy.onclick = () => {
    selectLink()
    document.execCommand('copy')
}

// If no template is used, assume custom image. 
if (!params.template) {
    // Disable link sharing 
    
    link.remove()
    copy.remove()
    
    // Show message
    const note = document.createElement('p')
    note.innerHTML = 'Vi kan desværre ikke oprette links til memes med egne billeder endnu 😥<br>Men du kan tage et screenshot!'
    note.style.setProperty('text-align', 'center')
    note.style.setProperty('font-size', '200%')
    document.getElementById('container').appendChild(note)
    
}
const templatesContainer = document.getElementById("templates")
const fileInput = document.getElementById("file")
const nextButton = document.getElementById("nextButton")
const templateForm = document.getElementById("templateForm")

templatesContainer.innerHTML = ""

// Generate templates from data file

window._TEMPLATES.forEach((template, index) => {
  // Generate dom nodes
  const templateContainer = document.createElement("div")
  templateContainer.classList.add("template")

  const radioInput = document.createElement("input")
  const id = `m${index}`
  radioInput.type = "radio"
  radioInput.required = true
  radioInput.name = "template"
  radioInput.value = index
  radioInput.id = id

  // Add event listeners to radio inputs
  radioInput.onchange = () => {
    fileInput.value = ""
    templateForm.submit()
  }

  // Mix it all together
  const label = document.createElement("label")
  label.htmlFor = id

  templateContainer.appendChild(radioInput)
  templateContainer.appendChild(label)

  const img = createImageFromTemplate(template)
  label.appendChild(img)
  templatesContainer.appendChild(templateContainer)
})

// Listen for fileInput change events
fileInput.addEventListener("change", (e) => {
  const files = e.currentTarget.files
  document.querySelectorAll(".template input").forEach((input) => {
    const required = files.length == 0
    input.required = required
  })

  // If files were selected, store them locally and reference them by file name
  if (files.length > 0) {
    filePreview(fileInput).then((file) => {
      localStorage.setItem(files[0].name, file)
      templateForm.submit()
    })
  }
})

// Given function
function filePreview(input) {
  return new Promise((resolve, reject) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.onerror = () => {
        reject()
      }
      reader.readAsDataURL(input.files[0])
    } else {
      reject()
    }
  })
}

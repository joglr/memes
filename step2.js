const params = Object.fromEntries(
  new URL(window.location).searchParams.entries()
)

const root = document.documentElement

if ((params.template && _TEMPLATES[params.template]) || params.file) {
  const container = document.getElementById("add-text")

  const img = createImageFromTemplate(
    params.template
      ? _TEMPLATES[params.template]
      : [params.file, localStorage.getItem(params.file)]
  )
  container.appendChild(img)

  if (params.template) {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "template"
    input.value = params.template

    container.appendChild(input)
  } else {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "file"
    input.value = params.file

    container.appendChild(input)
  }
}
const updateColor = () => root.style.setProperty("--color", colorInput.value)
const updateSize = () => root.style.setProperty("--size", `${sizeInput.value}%`)

const sizeInput = document.getElementById("size")
const colorInput = document.getElementById("color")
sizeInput.addEventListener("input", updateSize)
colorInput.addEventListener("input", updateColor)

if (params.text) {
  document.getElementById("text").textContent = params.text
}

if (params.color) {
  colorInput.value = params.color
  updateColor()
}

if (params.size) {
  sizeInput.value = params.size
  updateSize()
}

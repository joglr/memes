function createImageFromTemplate(template) {
  const img = document.createElement("img");
  img.alt = template[0];
  img.src = template[1];
  return img;
}

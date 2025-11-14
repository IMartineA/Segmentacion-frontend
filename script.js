// ⚠ USA TU URL DE RENDER AQUÍ:
const backendURL = "https://mineproy.onrender.com/";

function updateVal(id, value) {
  document.getElementById(id).textContent = value;
}

async function procesarImagen() {
  const fileInput = document.getElementById('imageInput');
  if (!fileInput.files[0]) {
    alert("Por favor selecciona una imagen primero.");
    return;
  }

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);
  formData.append('min_distance', document.getElementById('min_distance').value);
  formData.append('min_area', document.getElementById('min_area').value);
  formData.append('max_area', document.getElementById('max_area').value);
  formData.append('sigma_canny', document.getElementById('sigma_canny').value);
  formData.append('weight_texture', document.getElementById('weight_texture').value);

  const button = document.querySelector("button");
  button.disabled = true;
  button.textContent = "Procesando...";

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error("Error del servidor: " + text);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById('resultado').src = imageUrl;
  } catch (err) {
    console.error(err);
    alert("Ocurrió un error: " + err.message);
  } finally {
    button.disabled = false;
    button.textContent = "Ejecutar Segmentación";
  }
}
setTimeout(function () {
    // Fetch HTML content from external file
    fetch('./index-content.html')
      .then(response => response.text())
      .then(html => {
        // Insert the fetched HTML content into the document
        document.querySelector("#index-content").innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching HTML:', error);
      });
}, 1000);

// Modals
function actualizarInfoModal(pokemon) {
    let tipo = "";
    let habilidades = "";

    switch (pokemon) {
        case "kyurem":
            tipo = "Dragon, Hielo";
            habilidades = "Presión, Turbo Llama, Terravoltaje";
            break;
        case "mewtwo":
            tipo = "Psíquico";
            habilidades = "Presión"
            break;
        case "lucario":
            tipo = "Lucha, Acero";
            habilidades = "Impasible, Fuerza Mental, Justiciero";
            break;
        case "rayquaza":
            tipo = "Dragón, Volador";
            habilidades = "Esclusa de aire, Levitación";
            break;
        default:
            break;
    }

    document.getElementById("tipo").innerText = tipo;
    document.getElementById("habilidades").innerText = habilidades;
}
// Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
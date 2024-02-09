// Spinner of index.html
setTimeout(async function () {
    if (document.querySelector("#index-content")) {
        // Fetch HTML content from external file
        await fetch('./index-content.html')
          .then(response => response.text())
          .then(html => {
            // Insert the fetched HTML content into the document
            document.querySelector("#index-content").innerHTML = html;
          })
          .catch(error => {
            console.error('Error fetching HTML:', error);
          });
          initMap();
    }
}, 1000);

// Function to capitalize the first letter of each word
function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

// Modals
async function actualizarInfoModal(pokemon) {
    try {
        // Call getOnePokemon function to retrieve Pokemon data
        const pokemonData = await getOnePokemon(pokemon);

        // Extract necessary information from the retrieved data
        let tipo = "";
        let habilidades = "";

        if (pokemonData) {
            // Extract type and capitalize first letter of each word
            tipo = pokemonData.types.map(element => capitalizeFirstLetter(element.type.name)).join(", ");

            // Extract abilities and capitalize first letter of each word
            habilidades = pokemonData.abilities.map(element => capitalizeFirstLetter(element.ability.name)).join(", ");
        } else {
            // If Pokemon data is not found, display a default message or handle it accordingly
            tipo = "Unknown";
            habilidades = "Unknown";
        }

        // Update modal with extracted information
        document.getElementById("tipo").innerText = tipo;
        document.getElementById("habilidades").innerText = habilidades;
    } catch (error) {
        console.error("Error updating modal:", error);
    }
}

// Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

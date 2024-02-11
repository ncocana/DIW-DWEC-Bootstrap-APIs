function addPokemonRowToTable(favPokemon, favPokemonTableBody, index) {
    const row = favPokemonTableBody.insertRow();
    const cellSprite = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellType = row.insertCell(2);
    const cellStatus = row.insertCell(3);
    const cellActions = row.insertCell(4);

    cellSprite.innerHTML = "<img src='" + favPokemon.data.sprites.front_default + "'></img>";

    cellName.textContent = capitalizeFirstLetter(favPokemon.data.name);
    cellName.className = "align-middle";

    cellType.textContent = capitalizeFirstLetter(favPokemon.data.types[0].type.name);
    cellType.className = "align-middle";

    cellStatus.innerHTML = `<span id="pokemonStatus_${index}" class="align-middle tableWrap">${favPokemon.status ? capitalizeFirstLetter(favPokemon.status) : 'No status'}</span>`;

    cellActions.innerHTML = `
        <button type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Click elsewhere to update" class="btn btn-warning mt-2" onclick="toggleStatusEdit(${index})">Update</button>
        <button type="button" class="btn btn-danger mt-2" onclick="deleteFavPokemon('${favPokemon.data.name}')">Delete</button>
    `;
    cellActions.className = "align-middle";
}

function toggleStatusEdit(index) {
    const statusSpan = document.getElementById(`pokemonStatus_${index}`);
    const status = statusSpan.textContent;

    // Replace status span with input field
    statusSpan.innerHTML = `<input type="text" id="inputPokemonStatus_${index}" class="form-control" value="${status}"/>`;

    // Focus on the input field
    const inputField = document.getElementById(`inputPokemonStatus_${index}`);
    inputField.focus();

    // Add event listener for input field blur to update status
    inputField.addEventListener('blur', () => {
        const updatedStatus = inputField.value;
        statusSpan.innerHTML = updatedStatus || 'No status';
        updateFavPokemon(updatedStatus, index);
    });
}

async function loadFavoritePokemonsTable() {
    try {
        const favPokemonTableBody = document.getElementById("favoritePokemonTableBody");
        const favPokemonList = await getAllFavPokemon();

        favPokemonTableBody.innerHTML = '';

        favPokemonList.forEach((favPokemon, index) => {
            addPokemonRowToTable(favPokemon, favPokemonTableBody, index);
        });
    } catch (error) {
        console.error("Error", error.message);
    }
}

async function showFavoritePokemons() {
    try {
        const favoritePokemonSection = document.getElementById("favoritePokemonSection");
        const favPokemonTableBody = document.getElementById("favoritePokemonTableBody");

        if (favoritePokemonSection && favPokemonTableBody) {
            favoritePokemonSection.style.display = "block";

            await loadFavoritePokemonsTable();
        } else {
            console.error("Element with ID 'favoritePokemonSection' or 'favoritePokemonTableBody' not found.");
        }
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", showFavoritePokemons());

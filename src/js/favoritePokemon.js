function addPokemonRowToTable(favPokemon, favPokemonTableBody) {
    const row = favPokemonTableBody.insertRow();
    const cellSprite = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellType = row.insertCell(2);
    const cellStatus = row.insertCell(3);
    const cellActions = row.insertCell(4);

    
    cellSprite.innerHTML = "<img src='"+favPokemon.data.sprites.front_default+"'></img>"

    cellName.textContent = capitalizeFirstLetter(favPokemon.data.name);
    cellName.className = "align-middle";

    cellType.textContent = capitalizeFirstLetter(favPokemon.data.types[0].type.name);
    cellType.className = "align-middle";

    if (favPokemon.status) {
        cellStatus.innerHTML = `<input type="text" id="inputPokemonStatus" class="form-control" value='`+capitalizeFirstLetter(favPokemon.status)+`'/>`;
    } else {
        cellStatus.innerHTML = `<input type="text" id="inputPokemonStatus" class="form-control" value='No status'/>`;
    }
    cellStatus.className = "align-middle";

    cellActions.innerHTML = `
        <button type="button" class="btn btn-warning mt-2" onclick="updateFavPokemon('`+favPokemon.data.name+`')">Update</button>
        <button type="button" class="btn btn-danger mt-2" onclick="deleteFavPokemon('`+favPokemon.data.name+`')">Delete</button>
    `;
    cellActions.className = "align-middle";
}

async function loadFavoritePokemonsTable() {
    try {
        const favPokemonTableBody = document.getElementById("favoritePokemonTableBody");
        const favPokemonList = await getAllFavPokemon();

        favPokemonTableBody.innerHTML = '';

        favPokemonList.forEach((favPokemon) => {
            addPokemonRowToTable(favPokemon, favPokemonTableBody);
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

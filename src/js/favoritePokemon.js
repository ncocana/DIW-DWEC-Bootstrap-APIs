function addPokemonRowToTable(favPokemon, favPokemonTableBody) {
    const row = favPokemonTableBody.insertRow();
    const cellName = row.insertCell(0);
    const cellType = row.insertCell(1);

    cellName.textContent = favPokemon.data.name;
    cellType.textContent = favPokemon.data.types[0].type.name;
}

async function getAllFavPokemon() {
    try {
        const db = await openDatabase();  // Obtén la base de datos utilizando la función openDatabase()
        const transaction = db.transaction(DB_TABLE_FAV_POKEMONS, 'readonly');
        const objectStore = transaction.objectStore(DB_TABLE_FAV_POKEMONS);
        const request = objectStore.openCursor();

        return new Promise((resolve, reject) => {
            const result = [];

            request.onsuccess = function (ev) {
                const cursor = ev.target.result;
                if (cursor) {
                    result.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(result);
                }
            };

            request.onerror = function (ev) {
                reject(new Error("Failed to get all favorite Pokemon data."));
            };
        });
    } catch (error) {
        console.error(error.message);
    }
}

function openDatabase() {
    return new Promise((resolve, reject) => {
        const db_openRequest = indexedDB.open(DB_NAME, 1);

        db_openRequest.onsuccess = function (ev) {
            const db = ev.target.result;
            resolve(db);
        };

        db_openRequest.onerror = function (ev) {
            reject(new Error("Error opening database: " + ev.target.error));
        };
    });
}

async function loadFavoritePokemonsTable() {
    try {
        const db = await openDatabase();
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

document.addEventListener("DOMContentLoaded", async()=>{
    await showFavoritePokemons();
});

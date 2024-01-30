// const DB_NAME = "pokemons";
// const DB_TABLE_POKEMONS = "pokemons";
// const DB_TABLE_FAV_POKEMONS = "fav_pokemons"

const INPUT_POKEMON_NAME = "pokemonName";
const INPUT_POKEMON_STATUS = "pokemonStatus";

const db_openRequest = indexedDB.open(DB_NAME, 1);

function getAllPokemon() {
    const transaction = db_openRequest.result.transaction(DB_TABLE_POKEMONS, 'readonly');
    
    const getAllData = transaction.objectStore(DB_TABLE_POKEMONS).getAll();

    getAllData.onsuccess = function(ev) {
        const data = ev.target.result;

        console.log(data);
    }
}

async function getOnePokemon(name = '') {
    return new Promise((resolve, reject) => {
        let transaction = db_openRequest.result.transaction(DB_TABLE_POKEMONS, 'readonly');
        
        if (!name) {
            name = document.getElementById(INPUT_POKEMON_NAME).value;
        }

        name = name.toLowerCase();
        
        if (name) {
            const getData = transaction.objectStore(DB_TABLE_POKEMONS).index("Name").get(name);

            getData.onsuccess = function(ev) {
                const data = ev.target.result;
                resolve(data);

                // Can be showed on webpage with DOM (?)
                console.log(data);
            }

            getData.onerror = function(ev) {
                reject(new Error("Failed to get Pokemon data."));
            }
        } else {
            reject(new Error("Pokemon name is required."));
        }
    });
}

async function getAllFavPokemon() {
    return new Promise((resolve, reject) => {
        const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readonly');
        const getAllData = transaction.objectStore(DB_TABLE_FAV_POKEMONS).getAll();

        getAllData.onsuccess = function(ev) {
            const data = ev.target.result;
            resolve(data);
            
            console.log(data);
        }

        getAllData.onerror = function(ev) {
            reject(new Error("Failed to get all favorite Pokemon data."));
        }
    });
}

async function getOneFavPokemon(name = '') {
    return new Promise((resolve, reject) => {
        const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readonly');
        
        if (!name) {
            name = document.getElementById(INPUT_POKEMON_NAME).value;
        }

        name = name.toLowerCase();

        if (name) {
            const getData = transaction.objectStore(DB_TABLE_FAV_POKEMONS).get(name);

            getData.onsuccess = function(ev) {
                const data = ev.target.result;
                resolve(data);

                console.log(data);
            }

            getData.onerror = function(ev) {
                reject(new Error("Failed to get favorite Pokemon data."));
            }
        } else {
            reject(new Error("Pokemon name is required."));
        }
    });
}

async function insertFavPokemon() {
    let valuePokemonName = document.getElementById(INPUT_POKEMON_NAME).value;
    let valuePokemonStatus = document.getElementById(INPUT_POKEMON_STATUS).value;

    try {
        const valueData = await getOnePokemon(valuePokemonName);

        if (valueData) {
            const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readwrite');

            // Modify the structure of the object to be inserted
            const favPokemonObject = {
                data: valueData,
                status: valuePokemonStatus
            };

            transaction.objectStore(DB_TABLE_FAV_POKEMONS).add(favPokemonObject);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function updateFavPokemon() {
    let valuePokemonName = document.getElementById(INPUT_POKEMON_NAME).value;
    let valuePokemonStatus = document.getElementById(INPUT_POKEMON_STATUS).value;

    try {
        const valueData = await getOneFavPokemon(valuePokemonName);

        if (valueData) {
            // Modify the data
            valueData.status = valuePokemonStatus;

            const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readwrite');
            transaction.objectStore(DB_TABLE_FAV_POKEMONS).put(valueData);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function deleteFavPokemon() {
    let valuePokemonName = document.getElementById(INPUT_POKEMON_NAME).value;

    try {
        const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readwrite');
        transaction.objectStore(DB_TABLE_FAV_POKEMONS).delete(valuePokemonName);
    } catch (error) {
        console.error(error.message);
    }
}

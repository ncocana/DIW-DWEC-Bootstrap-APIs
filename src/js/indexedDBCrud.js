const INPUT_POKEMON_NAME = "pokemonName";
const INPUT_POKEMON_STATUS = "pokemonStatus";
const INPUT_SUBSCRIBER_EMAIL = "subscriberEmail";

const db_openRequest = indexedDB.open(DB_NAME, 1);

async function getAllPokemon() {
    return new Promise((resolve, reject) => {
        const transaction = db_openRequest.result.transaction(DB_TABLE_POKEMONS, 'readonly');
        const objectStore = transaction.objectStore(DB_TABLE_POKEMONS);
        const request = objectStore.openCursor();

        const result = [];

        request.onsuccess = function (ev) {
            const cursor = ev.target.result;
            if (cursor) {
                result.push(cursor.value);
                cursor.continue();
            } else {
                resolve(result);
                // console.log(result);
            }
        };

        request.onerror = function (ev) {
            reject(new Error("Failed to get all Pokemon data."));
        };
    });
}

async function getOnePokemon(name = '') {
    return new Promise((resolve, reject) => {
        const transaction = db_openRequest.result.transaction(DB_TABLE_POKEMONS, 'readonly');
        const objectStore = transaction.objectStore(DB_TABLE_POKEMONS);

        const index = objectStore.index('Name');
        if (!name) {
            name = document.getElementById(INPUT_POKEMON_NAME).value;
        }
        const request = index.openCursor(IDBKeyRange.only(name.toLowerCase()));

        request.onsuccess = function (ev) {
            const cursor = ev.target.result;
            if (cursor) {
                resolve(cursor.value);
                // console.log(cursor.value);
            } else {
                resolve(null); // Pokemon not found
            }
        };

        request.onerror = function (ev) {
            reject(new Error("Failed to get Pokemon data."));
        };
    });
}

async function getAllFavPokemon() {
    return new Promise((resolve, reject) => {
        const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readonly');
        const objectStore = transaction.objectStore(DB_TABLE_FAV_POKEMONS);
        const request = objectStore.openCursor();

        const result = [];

        request.onsuccess = function (ev) {
            const cursor = ev.target.result;
            if (cursor) {
                result.push(cursor.value);
                cursor.continue();
            } else {
                resolve(result);
                // console.log(result);
            }
        };

        request.onerror = function (ev) {
            reject(new Error("Failed to get all favorite Pokemon data."));
        };
    });
}

async function getOneFavPokemon(name = '') {
    return new Promise((resolve, reject) => {
        const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readonly');
        const objectStore = transaction.objectStore(DB_TABLE_FAV_POKEMONS);

        const index = objectStore.index('Name');
        if (!name) {
            name = document.getElementById(INPUT_POKEMON_NAME).value;
        }
        const request = index.openCursor(IDBKeyRange.only(name.toLowerCase()));

        request.onsuccess = function (ev) {
            const cursor = ev.target.result;
            if (cursor) {
                resolve(cursor.value);
                // console.log(cursor.value);
            } else {
                resolve(null); // Pokemon not found
            }
        };

        request.onerror = function (ev) {
            reject(new Error("Failed to get favorite Pokemon data."));
        };
    });
}

async function insertFavPokemon() {
    let valuePokemonName = document.getElementById(INPUT_POKEMON_NAME).value;
    let valuePokemonStatus = document.getElementById(INPUT_POKEMON_STATUS).value;

    try {
        const valueData = await getOnePokemon(valuePokemonName);

        if (valueData) {
            const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readwrite');
            const objectStore = transaction.objectStore(DB_TABLE_FAV_POKEMONS);
            
            // Modify the structure of the object to be inserted
            const favPokemonObject = {
                data: valueData,
                status: valuePokemonStatus
            };

            // Add a new record
            objectStore.add(favPokemonObject);
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
            const objectStore = transaction.objectStore(DB_TABLE_FAV_POKEMONS);
            
            // Update an existing record
            objectStore.put(valueData);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function deleteFavPokemon() {
    let valuePokemonName = document.getElementById(INPUT_POKEMON_NAME).value;

    try {
        const transaction = db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS, 'readwrite');
        const objectStore = transaction.objectStore(DB_TABLE_FAV_POKEMONS);

        // Delete an existing record
        objectStore.delete(valuePokemonName);
    } catch (error) {
        console.error(error.message);
    }
}

function insertSubscriber() {
    let valueEmail = document.getElementById(INPUT_SUBSCRIBER_EMAIL).value;

    try {
        if (valueEmail) {
            const transaction = db_openRequest.result.transaction(DB_TABLE_SUBSCRIBERS, 'readwrite');
            const objectStore = transaction.objectStore(DB_TABLE_SUBSCRIBERS);
            
            // Modify the structure of the object to be inserted
            const subscriber = {
                email: valueEmail
            };

            // Add a new record
            objectStore.add(subscriber);
        }
    } catch (error) {
        console.error(error.message);
    }
}

function deleteSubscriber() {
    let valueEmail = document.getElementById(INPUT_SUBSCRIBER_EMAIL).value;

    try {
        const transaction = db_openRequest.result.transaction(DB_TABLE_SUBSCRIBERS, 'readwrite');
        const objectStore = transaction.objectStore(DB_TABLE_SUBSCRIBERS);

        // Delete an existing record
        objectStore.delete(valueEmail);
    } catch (error) {
        console.error(error.message);
    }
}

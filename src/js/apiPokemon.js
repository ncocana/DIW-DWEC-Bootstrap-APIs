/*
    Create IndexedDB database, fetch the data from the API, and insert it.
    Total of Pokemon inserted (as of 26/01/2024): 1025.
*/

const DB_NAME = "pokemons";
const DB_TABLE_POKEMONS = "pokemons";
const DB_TABLE_FAV_POKEMONS = "fav_pokemons"
const API_FETCH_LINK = "https://pokeapi.co/api/v2/";

async function getPokemon(parameter) {
    try {
        // FETCH POKEMON
        const pokemonFetch = await fetch(API_FETCH_LINK + "pokemon/" + parameter);

        // If Pokemon is not found or there's an error, return an Error.
        if (!pokemonFetch.ok) {
            if (pokemonFetch.status === 404) {
                throw new Error("Pokemon not found.");
            } else {
                throw new Error(`Failed to fetch Pokemon. Status: ${pokemonFetch.status}`);
            }
        }

        const pokemonJson = await pokemonFetch.json();
        // console.log(pokemonJson);

        let pokemonObject = {
            abilities: pokemonJson['abilities'],
            base_experience: pokemonJson['base_experience'],
            forms: pokemonJson['forms'],
            game_indices: pokemonJson['game_indices'],
            height: pokemonJson['height'],
            held_items: pokemonJson['held_items'],
            id: pokemonJson['id'],
            is_default: pokemonJson['is_default'],
            location_area_encounters: pokemonJson['location_area_encounters'],
            moves: pokemonJson['moves'],
            name: pokemonJson['name'],
            order: pokemonJson['order'],
            past_abilities: pokemonJson['past_abilities'],
            past_types: pokemonJson['past_types'],
            species: pokemonJson['species'],
            sprites: pokemonJson['sprites'],
            stats: pokemonJson['stats'],
            types: pokemonJson['types'],
            weight: pokemonJson['weight']
        }

        return pokemonObject;
    } catch (error) {
        console.error(error);
        return { error: "Failed to fetch Pokemon. Check the console for details." };
    }
}

// Data formatted for when it is added inside a table.
function dataAddPokemon(pokemonObject) {
    return {
        abilities: pokemonObject.abilities,
        base_experience: pokemonObject.base_experience,
        forms: pokemonObject.forms,
        game_indices: pokemonObject.game_indices,
        height: pokemonObject.height,
        held_items: pokemonObject.held_items,
        id: pokemonObject.id,
        is_default: pokemonObject.is_default,
        location_area_encounters: pokemonObject.location_area_encounters,
        moves: pokemonObject.moves,
        name: pokemonObject.name,
        order: pokemonObject.order,
        past_abilities: pokemonObject.past_abilities,
        past_types: pokemonObject.past_types,
        species: pokemonObject.species,
        sprites: pokemonObject.sprites,
        stats: pokemonObject.stats,
        types: pokemonObject.types,
        weight: pokemonObject.weight
    };
}

async function addPokemonUntilNoMore(database) {
    let idPokemon = 1;

    while (true) {
        const pokemonObject = await getPokemon(idPokemon);

        if (pokemonObject.id === undefined) {
            // console.log("No more Pokemon to fetch. Exiting loop.");
            break;
        }

        const transaction = database.transaction([DB_TABLE_POKEMONS], "readwrite");
        const table = transaction.objectStore(DB_TABLE_POKEMONS);

        table.add(dataAddPokemon(pokemonObject));

        // Increment id for the next Pokemon
        idPokemon++;
    }
}

(async function() {
    const db_openRequest = indexedDB.open(DB_NAME, 1);

    // Solo entra si la versión es superior a la que hay instalada en el navegador.
    db_openRequest.onupgradeneeded = async function(ev) {
        const database = ev.target.result;

        // Create an object store if it doesn't exist
        if (!database.objectStoreNames.contains(DB_TABLE_POKEMONS)) {
            let store = database.createObjectStore(DB_TABLE_POKEMONS, { autoIncrement: true });
            store.createIndex('Name', 'name', {unique: true});
        }
        if (!database.objectStoreNames.contains(DB_TABLE_FAV_POKEMONS)) {
            let store = database.createObjectStore(DB_TABLE_FAV_POKEMONS, { keyPath: 'data.name' });
            store.createIndex('Name', 'data.name', {unique: true});
        }
        
        // Open the database and start fetching and adding Pokemon
        await addPokemonUntilNoMore(database);
    }
})()

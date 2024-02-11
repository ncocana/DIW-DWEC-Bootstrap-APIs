const INPUT_POKEMON_NAME="inputPokemonName",INPUT_POKEMON_STATUS="inputPokemonStatus",INPUT_SUBSCRIBER_EMAIL="subscriberEmail",db_openRequest=indexedDB.open(DB_NAME,1);async function openDatabase(){return new Promise((o,t)=>{var e=indexedDB.open(DB_NAME,1);e.onsuccess=function(e){e=e.target.result;o(e)},e.onerror=function(e){t(new Error("Error opening database: "+e.target.error))}})}async function getAllPokemon(){return new Promise((o,t)=>{var e=db_openRequest.result.transaction(DB_TABLE_POKEMONS,"readonly").objectStore(DB_TABLE_POKEMONS).openCursor();const n=[];e.onsuccess=function(e){e=e.target.result;e?(n.push(e.value),e.continue()):o(n)},e.onerror=function(e){t(new Error("Failed to get all Pokemon data."))}})}async function getOnePokemon(n=""){return new Promise((o,t)=>{var e=db_openRequest.result.transaction(DB_TABLE_POKEMONS,"readonly").objectStore(DB_TABLE_POKEMONS).index("Name"),e=(n=n||document.getElementById(INPUT_POKEMON_NAME).value,e.openCursor(IDBKeyRange.only(n.toLowerCase())));e.onsuccess=function(e){e=e.target.result;o(e?e.value:null)},e.onerror=function(e){t(new Error("Failed to get Pokemon data."))}})}async function getAllFavPokemon(){try{const e=(await openDatabase()).transaction(DB_TABLE_FAV_POKEMONS,"readonly").objectStore(DB_TABLE_FAV_POKEMONS).getAll();return new Promise((o,t)=>{e.onsuccess=e=>{e=e.target.result;o(e)},e.onerror=e=>{t(new Error("Failed to get all favorite Pokemon data."))}})}catch(e){console.error(e.message)}}async function getOneFavPokemon(n=""){return new Promise((o,t)=>{var e=db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS,"readonly").objectStore(DB_TABLE_FAV_POKEMONS).index("Name"),e=(n=n||document.getElementById(INPUT_POKEMON_NAME).value,e.openCursor(IDBKeyRange.only(n.toLowerCase())));e.onsuccess=function(e){e=e.target.result;o(e?e.value:null)},e.onerror=function(e){t(new Error("Failed to get favorite Pokemon data."))}})}async function insertFavPokemon(){var e=document.getElementById(INPUT_POKEMON_NAME).value;let o;o=document.getElementById(INPUT_POKEMON_STATUS)?document.getElementById(INPUT_POKEMON_STATUS).value:"";try{var t,n,r=await getOnePokemon(e);r&&(t=db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS,"readwrite").objectStore(DB_TABLE_FAV_POKEMONS),n={data:r,status:o},t.add(n).onsuccess=function(e){"/pokemonfavourite.html"==window.location.pathname||"/src/pokemonfavourite.html"==window.location.pathname||"/dist/pokemonfavourite.html"==window.location.pathname?location.reload():showMessage("Pokemon added successfully!")})}catch(e){console.error(e.message)}}async function updateFavPokemon(e,o){o=(await getAllFavPokemon())[o];try{o&&(o.status=e,db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS,"readwrite").objectStore(DB_TABLE_FAV_POKEMONS).put(o))}catch(e){console.error(e.message)}}async function deleteFavPokemon(e=""){try{(e=""==e?document.getElementById(INPUT_POKEMON_NAME).value.toLowerCase():e)?db_openRequest.result.transaction(DB_TABLE_FAV_POKEMONS,"readwrite").objectStore(DB_TABLE_FAV_POKEMONS).delete(e).onsuccess=function(e){location.reload()}:console.error("Element with ID 'inputPokemonName' not found.")}catch(e){console.error(e.message)}}function insertSubscriber(){var e,o,t=document.getElementById(INPUT_SUBSCRIBER_EMAIL).value;try{t&&(e=db_openRequest.result.transaction(DB_TABLE_SUBSCRIBERS,"readwrite").objectStore(DB_TABLE_SUBSCRIBERS),o={email:t},e.add(o))}catch(e){console.error(e.message)}}function deleteSubscriber(){var e=document.getElementById(INPUT_SUBSCRIBER_EMAIL).value;try{db_openRequest.result.transaction(DB_TABLE_SUBSCRIBERS,"readwrite").objectStore(DB_TABLE_SUBSCRIBERS).delete(e)}catch(e){console.error(e.message)}}function showMessage(e){alert(e)}
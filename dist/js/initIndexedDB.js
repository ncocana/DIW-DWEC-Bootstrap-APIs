const DB_NAME="pokemons",DB_TABLE_POKEMONS="pokemons",DB_TABLE_FAV_POKEMONS="fav_pokemons",DB_TABLE_SUBSCRIBERS="subscribers",API_FETCH_LINK="https://pokeapi.co/api/v2/";async function getPokemon(e){try{var t,a=await fetch(API_FETCH_LINK+"pokemon/"+e);if(a.ok)return{abilities:(t=await a.json()).abilities,base_experience:t.base_experience,forms:t.forms,game_indices:t.game_indices,height:t.height,held_items:t.held_items,id:t.id,is_default:t.is_default,location_area_encounters:t.location_area_encounters,moves:t.moves,name:t.name,order:t.order,past_abilities:t.past_abilities,past_types:t.past_types,species:t.species,sprites:t.sprites,stats:t.stats,types:t.types,weight:t.weight};throw 404===a.status?new Error("Pokemon not found."):new Error("Failed to fetch Pokemon. Status: "+a.status)}catch(e){return console.error(e),{error:"Failed to fetch Pokemon. Check the console for details."}}}function dataAddPokemon(e){return{abilities:e.abilities,base_experience:e.base_experience,forms:e.forms,game_indices:e.game_indices,height:e.height,held_items:e.held_items,id:e.id,is_default:e.is_default,location_area_encounters:e.location_area_encounters,moves:e.moves,name:e.name,order:e.order,past_abilities:e.past_abilities,past_types:e.past_types,species:e.species,sprites:e.sprites,stats:e.stats,types:e.types,weight:e.weight}}async function addPokemonUntilNoMore(e){let t=1;for(;;){var a=await getPokemon(t);if(void 0===a.id)break;e.transaction([DB_TABLE_POKEMONS],"readwrite").objectStore(DB_TABLE_POKEMONS).add(dataAddPokemon(a)),t++}}!async function(){indexedDB.open(DB_NAME,1).onupgradeneeded=async function(e){e=e.target.result;e.objectStoreNames.contains(DB_TABLE_POKEMONS)||e.createObjectStore(DB_TABLE_POKEMONS,{autoIncrement:!0}).createIndex("Name","name",{unique:!0}),e.objectStoreNames.contains(DB_TABLE_FAV_POKEMONS)||e.createObjectStore(DB_TABLE_FAV_POKEMONS,{keyPath:"data.name"}).createIndex("Name","data.name",{unique:!0}),e.objectStoreNames.contains(DB_TABLE_SUBSCRIBERS)||e.createObjectStore(DB_TABLE_SUBSCRIBERS,{keyPath:"email"}).createIndex("Email","email",{unique:!0}),await addPokemonUntilNoMore(e)}}();
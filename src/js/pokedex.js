const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeButton = document.querySelector('[data-poke-button]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    dark: '#D9D9D9',
    default: '#2A1A1F',
};


const searchPokemon = async event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    
    if (value) {
        const pokemonData = await getOnePokemon(value);
        if (pokemonData !== null) {
            renderPokemonData(pokemonData);
        } else {
            renderNotFound();
        }
    }
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = capitalizeFirstLetter(data.name);
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderButton();
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = (type.type.name != 'dark' ? typeColors[type.type.name] : typeColors.default);
        typeTextElement.textContent = capitalizeFirstLetter(type.type.name);
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = capitalizeFirstLetter(stat.stat.name);
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderButton = () => {
    pokeButton.innerHTML = '';
    const buttonElement = document.createElement("button");

    buttonElement.onclick = insertFavPokemon;
    buttonElement.innerHTML = "Add to favorites";

    pokeButton.appendChild(buttonElement);
}

const renderNotFound = () => {
    pokeName.textContent = 'Not found. Try again later!';
    pokeImg.setAttribute('src', './assets/imgPokemon/poke-shadow.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    pokeButton.innerHTML = '';
}

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    let types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    let [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokemonSelect(pokeDetail){
    const pokemonSelecionado = new Pokemon()
    pokemonSelecionado.number = pokeDetail.id
    pokemonSelecionado.name = pokeDetail.name
    let types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    let [type] = types
    pokemonSelecionado.types = types
    pokemonSelecionado.type = type
    let abilitys = pokeDetail.abilities.map((abltsSlot) => abltsSlot.ability.name)
    let [ability] = abilitys
    pokemonSelecionado.abilitys = abilitys
    pokemonSelecionado.ability = ability
    pokemonSelecionado.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemonSelecionado.height = pokeDetail.height
    pokemonSelecionado.weight = pokeDetail.weight
    let stats = pokeDetail.stats.map((status) => status)
    pokemonSelecionado.stats = stats
    pokemonSelecionado.base_stat = stats.base_stat
    pokemonSelecionado.nameStatus = stats.stat

    return pokemonSelecionado
    
}

function convertPokemonLocale(pokeLocale){
    const PokemonLocal = new Pokemon()
    let locales = pokeLocale.map((local) => local.location_area.name)
    let [locale] = locales
    PokemonLocal.locales = locales
    PokemonLocal.locale = locale

    return PokemonLocal
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonSelect = (id) => {
    const urlSelect = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(urlSelect)
        .then((response) => response.json())
        .then(convertPokemonSelect)
        
}

pokeApi.getPokemonLocale = (id) => {
    const urlLocale = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`
    

    return fetch(urlLocale)
        .then((response) => response.json())
        .then(convertPokemonLocale)
        .catch((error) => {
            console.log(error)
        })
        
}


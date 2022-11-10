const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const contentPokedex = document.getElementById('contentPokedex')
const contentPrinciapl = document.getElementById('contentPrinciapl')
const body = document.getElementById('body')
const teste = false;



const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}" >
            </div>
        </li>
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function back(){
    contentPokedex.innerHTML = ''
    $(contentPokedex).fadeOut(800)
    $(contentPrinciapl).fadeIn(800)
    
}

 pokemonList.addEventListener('click', (e) => {

    $(contentPrinciapl).fadeOut(800)
        $(contentPokedex).fadeIn(800)
        
        
        pokeApi.getPokemonSelect(e.path[2].children[1].textContent).then((pokemon) => {
            contentPokedex.innerHTML += `
            <div class="topo ${pokemon.type}">
                <div class="buttons">
                    <span class="back" >
                        <img onclick="back()" src="assets/images/free_icon_1.svg" alt="Botão para Voltar">
                    </span>
                    <span class="favorite">
                        <img src="assets/images/free_icon_2.svg" alt="Botão para favoritar">
                    </span>
                </div>
                <div class="info">
                    <div class="info-esq">
                        <span class="name">${pokemon.name}</span>
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                         </ol>
                    </div>
                    <div class="info-dir">
                        <span class="number">#${pokemon.number}</span>
                    </div>
                </div>
                <div class="imagem">
                    <img src="${pokemon.photo}" alt="${pokemon.photo}">     
                </div>    
            </div>
        
            `

        })

        pokeApi.getPokemonLocale(e.path[2].children[1].textContent).then((local) => {

            if (local.locales.length === 0 ) {
                pokeApi.getPokemonSelect(e.path[2].children[1].textContent).then((pokemon) => {

                    contentPokedex.innerHTML += `
                        <div class="fundo">
                        <div class="tab">
                            <button class="tablinks" onclick="openCity(event, 'Sobre')">Sobre</button>
                            <button class="tablinks" onclick="openCity(event, 'statusBase')">Status Base</button>
                            <button class="tablinks" onclick="openCity(event, 'Locais')">Locais de Captura</button>
                        </div>
                        <div id="Sobre" class="tabcontent">
                            <div class="sobreContent">
                                <p> Nome : ${pokemon.name} </p>
                                <p> Altura : ${pokemon.height}  </p>
                                <p> Peso : ${pokemon.weight} </p>
                            </div>
                            <div class="abilitysContent">    
                                <ol class="type">
                                    Tipo:
                                    ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
                                </ol>
                                <ol class="abilitys">
                                    Habilidades:
                                    ${pokemon.abilitys.map((ability) => `<li>${ability}</li>`).join('')}
                                </ol>
                            </div>
                        </div>
                        <div id="statusBase" class="tabcontent">
                            <ul class="status">
                            ${pokemon.stats.map((stat) => `<li> ${stat.stat.name} - ${stat.base_stat}`).join('')}
                            </ul>
                        </div>
                        <div id="Locais" class="tabcontent">
                            <ol class="locais">
                                <li> Não é possivel capturar </li>
                            </ol>
                        </div>
                    </div>
            `
                    
                })
            } 
            else {

                pokeApi.getPokemonSelect(e.path[2].children[1].textContent).then((pokemon) => {

                    contentPokedex.innerHTML += `
                        <div class="fundo">
                        <div class="tab">
                            <button class="tablinks" onclick="openCity(event, 'Sobre')">Sobre</button>
                            <button class="tablinks" onclick="openCity(event, 'statusBase')">Status Base</button>
                            <button class="tablinks" onclick="openCity(event, 'Locais')">Locais de Captura</button>
                        </div>
                        <div id="Sobre" class="tabcontent">
                            <div class="sobreContent">
                                <p> Nome : ${pokemon.name} </p>
                                <p> Altura : ${pokemon.height}  </p>
                                <p> Peso : ${pokemon.weight} </p>
                        </div>
                            <div class="abilitysContent">  
                                <ol class="type">
                                    Tipo:
                                    ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
                                </ol>
                                <ol class="abilitys">
                                    Habilidades:
                                    ${pokemon.abilitys.map((ability) => `<li>${ability}</li>`).join('')}
                                </ol>
                            </div>
                        </div>
                        <div id="statusBase" class="tabcontent">
                            <ul class="status">
                            ${pokemon.stats.map((stat) => `<li> ${stat.stat.name} - ${stat.base_stat}`).join('')}
                            </ul>
                        </div>
                        <div id="Locais" class="tabcontent">
                            <ol class="locais">
                                ${local.locales.map((locale) => `<li>${locale}</li>`).join('')}
                            </ol>
                        </div>
                    </div>
            `
                    
                })
                
            }


        })

    }



)


function openCity(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " active";

    
 }
    
    
        
function getRandom(max) {
    return Math.floor(Math.random() * max);
}
let imageID = getRandom(500);
let pokemonImage = document.querySelector("#pokemon-img");
pokemonImage.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageID
  .toString()
  .padStart(3, "0")}.png`;

function verifyString(strVerify) {
    searchName = strVerify.replace(/\s/g, "-");
    searchName = strVerify.toString().toLowerCase();
    let displayName = searchName[0].toUpperCase() + searchName.slice(1);
    namesArray = [searchName, displayName];
    return namesArray;
}
let namesArray = [];
let searchName;
let infoTab = document.querySelector("#infoTab");

async function pikamon(pokeName) {
    verifyString(pokeName);
    const pokemonStuff = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${namesArray[0]}/`
    );
    const pokeInfo = await pokemonStuff.json();
    imageID = pokeInfo.id;
    pokemonImage.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageID
    .toString()
    .padStart(3, "0")}.png`;
    changeHeadder.innerHTML = namesArray[1];
    return pokeInfo;
}
let infoChange = document.querySelector("#infoTab");
let pokeAbilities = document.querySelector("#abilities");
let pokeStats = document.querySelector("#stats");
let pokeTypes = document.querySelector("#types");
let pokeIds = document.querySelector("#pokemonId");
let pokeWeight = document.querySelector("#weight");

async function fillInfoTab() {
    let allInfo = await pikamon(namesArray[0]);
    let idAbilities = allInfo.abilities;
    let idStats = allInfo.stats;
    let idType = allInfo.types;
    let idID = allInfo.id;
    let idWeight = allInfo.weight;
    pokeAbilities.innerHTML = "Abilities: ";
    idAbilities.forEach((element) => {
        pokeAbilities.append(element.ability.name + ", ");
    });
    idStats.forEach((element) => {
        pokeStats.append(element.stat.name + ":" + element.base_stat + ", ");
    });
    idType.forEach((element) => {
        pokeTypes.append(element.type.name + ", ");
    });
    pokeIds.append(idID);
    pokeWeight.append(idWeight);

    console.log(allInfo);
}
// this part will take care of searching for pokemon and changing the header to the pokemon name searched
let searchPokemon = document.querySelector("#search-bar");
let changeHeadder = document.querySelector("#box2");
let submitButton = document.querySelector("#submit");

let searchedInfo;

function pokeSearch(event) {
    console.info(`pokeSearch(${event}) start`);
    return (searchedInfo = event.target.value);
}

searchPokemon.addEventListener("keyup", pokeSearch);

function clickSubmit() {
    pikamon(searchedInfo);
}
submitButton.addEventListener("click", clickSubmit);
submitButton.addEventListener("click", fillInfoTab);

const pokeImg = document.querySelector("#box2");

let easterEgg = document.querySelector("#pokemon-info");
let foundEgg = document.querySelector("#theEgg");

function foundEasterEgg() {
    // foundEgg.src = `./img/pokemon${getRandom(5)}.gif`;
    foundEgg.src = `http://127.0.0.1:5500/.github/img/pokemon${getRandom(5)}.gif`;
}
easterEgg.addEventListener("click", foundEasterEgg);
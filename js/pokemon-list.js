let currentList = [];

const typeColors = new Map([
  ["normal", "#BCBCAC"],
  ["fighting", "#BC5442"],
  ["flying", "#669AFF"],
  ["poison", "#AB549A"],
  ["ground", "#DEBC54"],
  ["rock", "#BCAC66"],
  ["bug", "#ABBC1C"],
  ["ghost", "#6666BC"],
  ["steel", "#ABACBC"],
  ["fire", "#FF421C"],
  ["water", "#2F9AFF"],
  ["grass", "#78CD54"],
  ["electric", "#FFCD30"],
  ["psychic", "#FF549A"],
  ["ice", "#78DEFF"],
  ["dragon", "#7866EF"],
  ["dark", "#785442"],
  ["fairy", "#FFACFF"],
  ["shadow", "#0E2E4C"],
]);

function updatePokemonList() {
  let containerDiv = document.getElementById("pokedex-list-render-container");

  currentList.forEach((poky) => {
    let cardDiv_ = createPokeCard(poky);
    containerDiv.appendChild(cardDiv_);
  });
}

function createPokeCard(poky) {
  div_ = document.createElement("div");
  div_.addEventListener("click", function () {
    openInfo(poky.id);
  });
  div_.classList.add(
    "pokemon-render-result-container",
    "container",
    "center",
    "column"
  );

  img1_ = document.createElement("img");
  img1_.classList.add("search-pokemon-image");
  img1_.src =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
    poky.id +
    ".png";

  span_ = document.createElement("span");
  span_.classList.add("bold", "font-size-12");
  span_.textContent = "N° " + poky.id;

  h3_ = document.createElement("h3");
  h3_.textContent = dressUpPayloadValue(poky.name);

  div_.appendChild(img1_);
  div_.appendChild(span_);
  div_.appendChild(h3_);
  div_.appendChild(getTypeContainers(poky.types));

  return div_;
}

function dressUpPayloadValue(str) {
  return str.replace("-", " ").toUpperCase();
}

function getTypeContainers(types) {
  div__ = document.createElement("div");
  div__.classList.add("row");

  types.forEach((type) => {
    div___ = document.createElement("div");
    div___.classList.add("type-container");
    div___.textContent = dressUpPayloadValue(type.type.name);
    div___.style.background = typeColors.get(type.type.name);
    div__.appendChild(div___);
  });

  return div__;
}

function search() {
  let pokeSrc = document.getElementById("search-input").value.toLowerCase();
  currentList = pokeArray.filter((poke) =>
    poke.name.toLowerCase().includes(pokeSrc)
  ).sort((a, b) => a.id - b.id);

  let containerDiv = document.getElementById("pokedex-list-render-container");

  while (containerDiv.firstChild) {
    containerDiv.removeChild(containerDiv.firstChild);
  }

  updatePokemonList();
}

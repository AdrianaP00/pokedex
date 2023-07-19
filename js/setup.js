let pokeArray = [];

async function getAllPokemons() {
  try {
    let pokeObj = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=898");
    let result = await pokeObj.json();
    let pokeResults = result.results;

    for (let i = 0; i < pokeResults.length; i++) {
      let pokeUrl = pokeResults[i].url;
      let response = await fetch(pokeUrl);
      let pokeData = await response.json();
      pokeArray.push(pokeData);
    }

    loadingCompletion();
  } catch (error) {
    console.log("pokError", error);
  }
}

function loadingCompletion() {
  const loadingDiv = document.getElementById("loading-div");
  loadingDiv.classList.add("hideLoading");

  setTimeout(function () {
    loadingDiv.classList.replace("hideLoading", "hide");
    document.body.style.overflow = "unset";
  }, 500);

  currentList = pokeArray.sort((a, b) => a.id - b.id);

  updatePokemonList();
}

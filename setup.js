let pokeArray = [];

async function getAllPokemons() {
  let pokeObj = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((error) => console.log("error", error));

  pokeObj.forEach((poke) => {
    fetch(poke.url)
      .then((response) => response.json())
      .then((result) => pokeArray.push(result))
      .catch((error) => console.log("error", error));
  });


  setTimeout(() => {
    loadingCompletion();
  }, 1000);
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

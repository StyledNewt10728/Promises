document.addEventListener("DOMContentLoaded", function () {
  const pokeAPI = "https://pokeapi.co/api/v2";

  const button = document.querySelector("button");
  let tall_grass = document.getElementById("Tall_Grass");

  button.addEventListener("click", catchPokemon);

  async function catchPokemon() {
    try {
      tall_grass.innerHTML = "";

      let pokemonData = await axios.get(`${pokeAPI}/pokemon/?limit=1000`);
      let URLdata = [];

      for (let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * pokemonData.data.results.length);
        let endURL = pokemonData.data.results.splice(index, 1)[0].url;
        URLdata.push(endURL);
      }

      let pokemon = await Promise.all(
        URLdata.map((endURL) => axios.get(endURL))
      );

      let pokemonSpecies = await Promise.all(
        pokemon.map((p) => axios.get(p.data.species.url))
      );

      pokemonSpecies.forEach((d, i) => {
        let speciesLan = d.data.flavor_text_entries.find(function (entry) {
          return entry.language.name === "en";
        });

        let speciesDescription = speciesLan ? speciesLan.flavor_text : "";
        let name = pokemon[i].data.name;
        let img = pokemon[i].data.sprites.front_default;

        tall_grass.insertAdjacentHTML(
          "beforeend",
          caughtPokemons(name, img, speciesDescription)
        );
      });
      // pokemon.forEach((p) => console.log(p.data));
    } catch (err) {
      console.error("Failed to catch a Pokemon", err);
    }
  }

  function caughtPokemons(name, img, speciesDescription) {
    return `
         <div class="card">
        <h1>${name}</h1>
        <img src=${img} />
        <p>${speciesDescription}</p>
      </div>
    `;
  }
});

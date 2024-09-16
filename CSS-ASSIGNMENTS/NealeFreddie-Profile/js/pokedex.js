(function () {
  let pokemonIndex = 0;
  let pokemonList = [];

  // Fetch Pokémon data from the API
  function fetchPokemonData() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
      .then((response) => response.json())
      .then((data) => {
        pokemonList = data.results;
        populatePokemonData(pokemonIndex); // Initially load the first Pokémon
        setupAutocomplete(); // Initialize autocomplete after fetching the data
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }

  // Function to show the data of the current Pokémon
  function populatePokemonData(index) {
    const pokemon = pokemonList[index];
    if (pokemon) {
      const nameElement = document.getElementById("pokemon-name");
      const typeElement = document.getElementById("pokemon-types");
      const imageElement = document.getElementById("pokemon-img");
      const abilitiesElement = document.getElementById("pokemon-abilities");
      const statsElement = document.getElementById("pokemon-stats");
      const heightElement = document.getElementById("pokemon-height");
      const weightElement = document.getElementById("pokemon-weight");

      // Check if elements exist in the DOM
      if (
        nameElement &&
        typeElement &&
        imageElement &&
        abilitiesElement &&
        statsElement &&
        heightElement &&
        weightElement
      ) {
        // Set the name
        nameElement.textContent = pokemon.name.toUpperCase();

        // Fetch additional Pokémon details for the selected Pokémon
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((details) => {
            // Display types
            typeElement.innerHTML = details.types
              .map(
                (typeInfo) =>
                  `<span class="pokemon-type ${typeInfo.type.name.toLowerCase()}">${typeInfo.type.name.toUpperCase()}</span>`
              )
              .join("");

            // Display the image
            const spriteUrl = details.sprites.front_default;
            imageElement.src = spriteUrl || "fallback-image.png"; // Use a fallback if the image doesn't exist

            // Fetch abilities
            const abilities = details.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .join(", ");
            abilitiesElement.textContent = abilities;

            // Fetch stats
            const stats = details.stats
              .map(
                (statInfo) =>
                  `${statInfo.stat.name.toUpperCase()}: ${statInfo.base_stat}`
              )
              .join(", ");
            statsElement.textContent = stats;

            // Additional details
            const height = details.height;
            const weight = details.weight;
            heightElement.textContent = `${height} dm`;
            weightElement.textContent = `${weight} hg`;
          })
          .catch((error) => {
            console.error("Error fetching Pokémon details:", error);
          });
      } else {
        console.error("Required elements not found in the DOM");
      }
    }
  }

  // Navigate to the next Pokémon
  function showNextPokemon() {
    pokemonIndex = (pokemonIndex + 1) % pokemonList.length; // Wrap around when reaching the end
    populatePokemonData(pokemonIndex);
  }

  // Navigate to the previous Pokémon
  function showPreviousPokemon() {
    pokemonIndex = (pokemonIndex - 1 + pokemonList.length) % pokemonList.length; // Wrap around to the last Pokémon
    populatePokemonData(pokemonIndex);
  }

  // Autocomplete setup
  function setupAutocomplete() {
    const searchInput = document.getElementById("pokemon-search");
    if (searchInput) {
      autocomplete(
        searchInput,
        pokemonList.map((pokemon) => pokemon.name)
      );

      // Set a random Pokémon name as the placeholder
      const randomPokemonName =
        pokemonList[Math.floor(Math.random() * pokemonList.length)].name;
      searchInput.placeholder = `Search Pokémon (e.g., ${randomPokemonName})`;
    }
  }

  // Autocomplete function
  function autocomplete(inputElement, pokemonNames) {
    inputElement.addEventListener("input", function () {
      let val = this.value;
      closeAllLists();
      if (!val) return false;
      const autocompleteContainer =
        document.getElementById("autocomplete-list");
      pokemonNames.forEach((pokemonName) => {
        if (
          pokemonName.substr(0, val.length).toUpperCase() === val.toUpperCase()
        ) {
          const item = document.createElement("div");
          item.innerHTML =
            "<strong>" + pokemonName.substr(0, val.length) + "</strong>";
          item.innerHTML += pokemonName.substr(val.length);
          item.addEventListener("click", function () {
            inputElement.value = pokemonName;
            searchPokemonByName(pokemonName);
            closeAllLists();
          });
          autocompleteContainer.appendChild(item);
        }
      });
    });

    function closeAllLists() {
      const items = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < items.length; i++) {
        items[i].innerHTML = "";
      }
    }

    document.addEventListener("click", function (e) {
      closeAllLists();
    });
  }

  // Function to search and display the Pokémon by name
  function searchPokemonByName(name) {
    const index = pokemonList.findIndex(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
    if (index !== -1) {
      pokemonIndex = index;
      populatePokemonData(index);
    } else {
      console.error("Pokémon not found:", name);
    }
  }

  // Wait for the DOM to load before adding event listeners
  document.addEventListener("DOMContentLoaded", function () {
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");

    if (leftButton && rightButton) {
      // Add event listeners to the buttons
      leftButton.addEventListener("click", showPreviousPokemon);
      rightButton.addEventListener("click", showNextPokemon);

      // Load Pokémon data when the page is loaded
      fetchPokemonData();
    } else {
      console.error("Buttons not found in the DOM");
    }
  });
})();

const btnSearch = document.querySelector("#btn_search");
const pokeTypes = document.querySelector('#btn_types');
let pokeList = [];
const btnParent = document.querySelector(".buttons")
btnParent.addEventListener("click", (e) => {
  userInput.value = "";
  const gen = e.target.id
  pokemon(generations[gen].limit, generations[gen].offset)
})
const userInput = document.querySelector('#user_input');
const cardParent = document.querySelector('.card')

const generations = {
  generation1: { limit: 151, offset: 0 },
  generation2: { limit: 100, offset: 151 },
  generation3: { limit: 135, offset: 251 },
  generation4: { limit: 107, offset: 386 },
  generation5: { limit: 156, offset: 493 },
  generation6: { limit: 72, offset: 649 },
  generation7: { limit: 88, offset: 721 },
  generation8: { limit: 96, offset: 809 },
  generation9: { limit: 110, offset: 905 },
};


const pokemon = (limit, offset) => {
  const pokemonData = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  cardParent.innerHTML = "";
  pokeList = [];
  fetch(pokemonData)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(item => {
        fetch(item.url)
          .then(res => res.json())
          .then(data => {
            const pokemonImg = data.sprites.other.dream_world.front_default;
            const pokemonId = data.id;
            const pokemonName = data.name;
            const pokemonType = data.types.map(type => type.type.name);
            const obj = {
              img: pokemonImg,
              id: pokemonId,
              name: pokemonName,
              type: pokemonType
            }
            pokeList.push(obj);
            renderPoke(pokemonImg, pokemonId, pokemonName, pokemonType);

          })
      })
    });
}


function renderPoke(img, id, name, type) {
  const html = `<li>
  <img src="${img}"/> 
  <h3>${id}</h3>
  <h2>${name}</h2>
  <h3>${type.join(", ")}</h3> 
  </li>`

  cardParent.insertAdjacentHTML("beforeend", html)
}
btnSearch.addEventListener("click", () => {
  const searchName = userInput.value;
  const foundPokemon = pokeList.filter(item => {
    return item.name.includes(searchName);

  });
  cardParent.innerHTML = "";
  foundPokemon.forEach(item => renderPoke(item.img, item.id, item.name, item.type));
});


pokeTypes.addEventListener('click', (e) => {
  const searchType = e.target.id;
  const pokemonTypes = pokeList.filter(item => {
    return item.type.includes(searchType);
  })
  userInput.value = ""
  cardParent.innerHTML = "";
  pokemonTypes.forEach(item => renderPoke(item.img, item.id, item.name, item.type));
})
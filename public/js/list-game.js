const container = document.getElementById("container");
const genreSelect = document.getElementById("genre");

let allGames = [];

function displayGames(games) {
  container.innerHTML = "";
  games.forEach((dataGame) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <a href="/top-up/${dataGame.id}">
        <img id="gambar" src="${dataGame.gambar.logo}" alt="${dataGame.nama}" />
        <h3 class="namaGame">${dataGame.nama} <span class="dev">${dataGame.dev}</span></h3>
      </a>
    `;
    container.appendChild(card);
  });
}

fetch("/api/game.json")
  .then((res) => res.json())
  .then((game) => {
    allGames = game;
    displayGames(allGames);
  });

genreSelect.addEventListener("change", () => {
  const selectedGenre = genreSelect.value;
  if (selectedGenre === "all") {
    displayGames(allGames);
  } else {
    const filtered = allGames.filter(game => game.genre === selectedGenre);
    displayGames(filtered);
  }
});

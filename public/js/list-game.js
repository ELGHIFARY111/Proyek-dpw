let listGame = [];

function displayGames(games) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  games.forEach((dataGame) => {
    console.log(dataGame.gambar.logo);
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

function filterBtn(games) {
  const filterContainer = document.getElementById("filter");

  const genres = [...new Set(games.map((game) => game.genre))];

  const allButton = document.createElement("button");
  allButton.textContent = "Semua";
  allButton.classList.add("active");
  allButton.onclick = () => {
    displayGames(listGame);
    setActive(allButton);
  };
  filterContainer.appendChild(allButton);

  genres.forEach((genre) => {
    const button = document.createElement("button");
    button.textContent = genre;
    button.onclick = () => {
      const filteredGames = listGame.filter((game) => game.genre === genre);
      displayGames(filteredGames);
      setActive(button);
    };
    filterContainer.appendChild(button);
  });
}

function setActive(activeBtn) {
  const allButtons = document.querySelectorAll("#filter button");
  allButtons.forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

fetch("/api/game.json")
  .then((res) => res.json())
  .then((game) => {
    listGame = game;
    displayGames(game);
    filterBtn(game);
  })
  .catch((error) => {
    console.error("Error loading games:", error);
  });

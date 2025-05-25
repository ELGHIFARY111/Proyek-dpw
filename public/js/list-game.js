fetch("/json/game.json")
  .then((res) => res.json())
  .then((game) => {
    game.forEach((dataGame) => {
      console.log(dataGame.gambar.logo);
      const container = document.getElementById("container");
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <a href="/roni/top-up/game-top-up.html?id=${dataGame.id}">
        <img id="gambar" src="${dataGame.gambar.logo}" alt="${dataGame.nama}" />
        <h3 class="namaGame">${dataGame.nama} <span class="dev">${dataGame.dev}</span></h3>
      </a>
      `;
      container.appendChild(card);
    });
  });

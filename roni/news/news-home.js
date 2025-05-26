fetch("/data/json/news.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector("main");
    data.forEach((news) => {
      const card = document.createElement("section");
      card.innerHTML = `
      <a href="#" target="__blank">
        <img src="${news.gambar}" alt="${news.judul}" />
        <div class="judul">${news.judul}</div>
      </a>
      `;
      container.appendChild(card);
    });
  });

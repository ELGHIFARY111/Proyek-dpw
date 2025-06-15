fetch("/api/news.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector("main");
    data.forEach((news) => {
      const card = document.createElement("section");
      card.innerHTML = `
      <a href="/news/${news.id}">
        <img src="${news.gambar}" alt="${news.judul}" />
        <div class="judul">${news.judul}</div>
      </a>
      `;
      container.appendChild(card);
    });
  });

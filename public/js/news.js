function createElement(
  tagName,
  container,
  content = "",
  className = "",
  id = ""
) {
  const el = document.createElement(tagName);
  el.innerHTML = content;
  if (className) el.className = className;
  if (id) el.id = id;
  container.appendChild(el);
  return el;
}

const container = document.querySelector("main");
fetch("/json/news.json")
  .then((res) => res.json())
  .then((data) => {
    const filtered = data.find(
      (news) => news.judul === "✨ SMAHATMA PROUDLY PRESENTS ✨"
    );

    if (!filtered) return;

    // Parse satu-satu field yang perlu markdown
    const parsedJudul = marked.parse(filtered.judul);
    const parsedDeskripsi = marked.parse(filtered.deskripsi);

    createElement("p", container, parsedJudul, "judul");

    const contImg = createElement("div", container, "", "container-img");
    const mainImg = createElement("img", contImg, "", "main-img");
    mainImg.src = filtered.gambar;
    mainImg.alt = filtered.judul;

    const contInfo = createElement("div", container, "", "container-info");
    createElement("p", contInfo, filtered.penulis);
    createElement("p", contInfo, filtered.publikasi);

    createElement("hr", container);

    createElement("p", container, parsedDeskripsi, "main-desk");
  })
  .catch((err) => console.log(err));

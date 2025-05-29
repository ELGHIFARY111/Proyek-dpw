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
      (news) => news.judul === "TECHNOTAINMENT 2025 IS BACK!"
    );

    if (!filtered) return;

    document.title = `SixFussion | Top Up ${filtered.judul}`;
    const parsedJudul = marked.parse(filtered.judul);
    const parsedDeskripsi = marked.parse(
      filtered.deskripsi.replace(/\n/g, "<br>")
    );

    createElement("p", container, parsedJudul, "judul");

    const contInfo = createElement("div", container, "", "container-info");
    createElement("p", contInfo, filtered.penulis);
    createElement("p", contInfo, filtered.publikasi);

    const sec = createElement("section", container);
    const mainImg = createElement("img", sec, "", "main-img");
    mainImg.src = filtered.gambar;
    mainImg.alt = filtered.judul;
    createElement("p", sec, parsedDeskripsi, "main-desk");
  })
  .catch((err) => console.log(err));

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
fetch("/api/news.json")
  .then((res) => res.json())
  .then((data) => {
    const newsId = window.location.pathname.split("/").pop();
    const filtered = data.find((news) => news.id === newsId);

    if (!filtered) return;

    const styledDeskripsi = filtered.deskripsi.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );

    document.title = `SixFussion | News - ${filtered.judul}`;
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

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
fetch("/api/artikel.json")
  .then((res) => res.json())
  .then((data) => {
    const filtered = data.find((a) => a.publikasi === "14 Mei 2025");
    console.log(filtered);
    createElement("p", container, filtered.publikasi);
    const img1 = createElement("img", container);
    img1.src = filtered.gambar1;
    createElement("p", container, filtered.judul1);
    createElement("p", container, filtered.deskripsi1);
    const img2 = createElement("img", container);
    img2.src = filtered.gambar2;
    createElement("p", container, filtered.judul2);
    createElement("p", container, filtered.deskripsi2);
    const img3 = createElement("img", container);
    img3.src = filtered.gambar3;
    createElement("p", container, filtered.judul3);
    createElement("p", container, filtered.deskripsi3);
  });

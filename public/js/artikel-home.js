function createElement(tag, parent, options = {}) {
  const el = document.createElement(tag);
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  if (options.className) el.className = options.className;
  if (options.id) el.id = options.id;
  if (options.src) el.src = options.src;
  if (options.alt) el.alt = options.alt;
  if (parent) parent.appendChild(el);
  return el;
}
fetch("/api/artikel.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("container");

    data.forEach((artikel) => {
      const artkl = createElement("section", container, {
        className: "artikel-card",
      });

      artkl.addEventListener("click", () => {
        window.location.href = "/artikel";
      });

      createElement("img", artkl, {
        src: artikel.gambar1,
        alt: "Gambar artikel",
      });
      createElement("div", artkl, {
        className: "judul",
        text: artikel.judul1,
      });
      createElement("div", artkl, {
        className: "deskripsi",
        text: artikel.deskripsi1,
      });
      createElement("div", artkl, {
        className: "publish",
        text: artikel.publikasi,
      });
    });
  })
  .catch((err) => console.error("Gagal load artikel:", err));

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
      const firstImage = artikel.konten.find(
        (konten) => konten.type === "image"
      );
      if (firstImage) {
        const artkl = createElement("section", container, {
          className: "artikel-card",
        });
        artkl.addEventListener("click", () => {
          window.top.location.href = `/artikel/${artikel.id}`;
        });
        createElement("img", artkl, {
          src: firstImage.url,
          alt: firstImage.caption,
        });
      }

      const heading = artikel.konten.find((k) => k.type === "heading2");
      const desc = artikel.konten.find((k) => k.type === "paragraph");
      const publikasi = artikel.konten.find((k) => k.type === "pblk");
      createElement("div", container.lastChild, {
        className: "judul",
        text: heading?.text || "Tanpa judul",
      });
      createElement("div", container.lastChild, {
        className: "deskripsi",
        text: desc?.text || "Tanpa deskripsi",
      });
      createElement("div", container.lastChild, {
        className: "publish",
        text: publikasi?.publikasi || "Tanpa tanggal",
      });
    });
  })
  .catch((err) => console.error("Gagal load artikel:", err));

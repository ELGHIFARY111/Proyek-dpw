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
    const headi2 = window.location.pathname.split("/").pop();
    const filtered = data.find((a) => a.id === headi2);
    if (!filtered) return;

    const contAtas = createElement("div", container, "", "contAtas");

    filtered.konten.forEach((konten) => {
      if (konten.type === "image") {
        const contImg = createElement("div", container, "", "cont-img");
        const img = createElement("img", contImg);
        img.src = konten.url;
        // caption bisa pakai markdown
        createElement("p", contImg, marked.parse(konten.caption));
      } else if (konten.type === "pblk") {
        createElement("p", contAtas, marked.parse(konten.publikasi), "pblks");
      } else if (konten.type === "pnls") {
        createElement("p", contAtas, marked.parse(konten.penulis), "pnls");
      } else if (konten.type === "heading2") {
        document.title = `SixFussion | Artikel - ${konten.text}`;
        createElement("h2", container, marked.parseInline(konten.text));
      } else if (konten.type === "heading3") {
        createElement("h3", container, marked.parseInline(konten.text));
      } else if (konten.type === "heading4") {
        createElement("h4", container, marked.parseInline(konten.text));
      } else if (konten.type === "paragraph") {
        createElement("p", container, marked.parse(konten.text));
      } else if (konten.type === "list") {
        const contList = createElement("ul", container);
        konten.text.forEach((text) => {
          createElement("li", contList, marked.parseInline(text));
        });
      }
    });
  });

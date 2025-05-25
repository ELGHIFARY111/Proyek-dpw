function createElement(
  tagName,
  container,
  content = "",
  className = "",
  id = ""
) {
  const el = document.createElement(tagName);
  el.textContent = content;
  if (className) el.className = className;
  if (id) el.id = id;
  container.appendChild(el);
  return el;
}

const container = document.querySelector("main");
fetch("/json/news.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((news) => {
      createElement("section", container, "anjay");
    });
  });

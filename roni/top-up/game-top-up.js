// membuat element
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

// game
fetch("/data/json/game.json")
  .then((res) => res.json())
  .then((data) => {
    const listTutor = document.getElementById("listTutor");
    const deskripsi = document.getElementById("deskripsi-game");
    const itemSpecl = document.getElementById("item-special");
    const itemBasc = document.getElementById("item-biasa");

    const game = data.find((item) => item.id === "mlbb");

    // list item
    game.list_item.spesial_item.forEach((itemSpesial) => {
      createElement(
        "div",
        itemSpecl,
        itemSpesial.nama_item,
        "list-top-up",
        "list-top-up"
      );
    });
    game.list_item.diamonds.forEach((basicItem) => {
      createElement(
        "div",
        itemBasc,
        basicItem.nama_item,
        "list-top-up",
        "list-top-up"
      );
    });

    // deskrisi
    createElement("p", deskripsi, game.deskripsi);

    // tutor
    game.tutor.forEach((step) => {
      createElement("li", listTutor, step);
    });
  })
  .catch((error) => {
    console.error("Gagal mengambil data:", error);
  });

// =================payment===================
fetch("/data/json/payment.json")
  .then((res) => res.json())
  .then((data) => {
    data.payment.forEach((pay) => {
      console.log("Kategori:", pay.kategori);
      console.log("Logo Kategori:", pay.logo);

      // Cek apakah ada list di dalam kategori
      if (pay.list) {
        pay.list.forEach((lstPay) => {
          console.log("  -", lstPay.nama);
          console.log("    Logo:", lstPay.logo);
        });
      }
    });
  })
  .catch((err) => {
    console.error("Gagal fetch:", err);
  });

// membuat element non void
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

// agar bisa akses id ml di game.json
const gameData = fetch("/data/json/game.json").then((res) => res.json());

function hr(container) {
  createElement("hr", container);
}

//====================GAME=======================//
gameData
  .then((data) => {
    const listTutor = document.getElementById("listTutor");
    const deskripsi = document.getElementById("deskripsi-game");
    const containerInp = document.getElementById("input");

    // selet 1 game saja utnuk styling sementara
    const selectedGame = data.find((item) => item.id === "mlbb");

    // list item
    const containerItem = document.getElementById("container-list-item");
    createElement("p", containerItem, "judul");
    const itemSpecl = document.getElementById("item-special");
    const itemBasc = document.getElementById("item-biasa");
    selectedGame.list_item.spesial_item.forEach((itemSpesial) => {
      createElement(
        "div",
        itemSpecl,
        `${itemSpesial.nama_item}\n${itemSpesial.harga}`,
        "item-special list-topUp",
        "itemSpecial"
      );
    });
    selectedGame.list_item.diamonds.forEach((basicItem) => {
      createElement(
        "div",
        itemBasc,
        `${basicItem.nama_item}\n${basicItem.harga}`,
        "item-biasa list-topUp",
        "itemBiasa"
      );
    });

    // input
    selectedGame.input.inputan.forEach((input, index) => {
      const inp = createElement("input", containerInp);
      inp.type = "text";
      inp.placeholder = input.placeholder;
      inp.id = "input-" + index;
      input.className = "input-field";
    });

    // petunjuk
    // console.log(selectedGame.gambar.petunjuk);

    // deskrisi
    createElement("p", deskripsi, selectedGame.deskripsi);

    // tutor
    selectedGame.tutor.forEach((step) => {
      createElement("li", listTutor, step);
    });
  })
  .catch((error) => {
    console.error("Gagal mengambil data:", error);
  });

// =================PAYMENT===================//
const containerPay = document.getElementById("container-pay");
fetch("/data/json/payment.json")
  .then((res) => res.json())
  .then((data) => {
    data.payment.forEach((item) => {
      // gabung ke pembungkus utama
      const divKategori = createElement("div", containerPay, "", item.kategori);

      // button
      const btn = createElement("button", divKategori, "", "dropdown-button");
      // ikon button
      const icn = createElement("i", btn, "", item.ikon);
      // juddul button
      const pKategori = createElement("p", btn, item.kategori);

      // jika list
      if (item.list && item.list.length > 0) {
        const dropdown = createElement(
          "div",
          containerPay,
          "",
          "dropdown-content"
        );

        item.list.forEach((payMethod) => {
          const payDiv = createElement(
            "div",
            dropdown,
            "",
            `pay ${payMethod.nama.toLowerCase()}`
          );

          // pembungkus bagian atas card
          const topPayment = createElement("div", payDiv, "", "top-payment");
          // tidak menggunakn func karena void
          const logo = document.createElement("img");
          logo.src = payMethod.logo;
          logo.id = "active";
          logo.className = "active";
          topPayment.appendChild(logo);

          const namaPay = createElement(
            "p",
            topPayment,
            payMethod.nama,
            "nama"
          );

          // const hr = createElement("hr", payDiv);
          hr(payDiv);

          const harga = createElement("div", payDiv, "Rp. 40.421", "harga");
        });
      }
    });
  })
  .catch((err) => console.error("Error fetching payment data:", err));

//======================TESTIMONIAL=========================//
const containerTesti = document.getElementById("container-testimonial");
fetch("/data/json/testimonial.json")
  .then((data) => data.json())
  .then((game) => {
    game.forEach((testi, i) => {
      gameData.then((dataGame) => {
        const cardTesti = createElement(
          "div",
          containerTesti,
          "",
          `testi ${i + 1}`
        );
        const cardTop = createElement("div", cardTesti, "", "top");
        const selectedGame = dataGame.find((item) => item.id === "mlbb");

        // nama game
        if (testi.id == selectedGame.id) {
          createElement("div", cardTop, selectedGame.nama, "nama-game");
        }
        // bintang
        const containerStar = createElement("div", cardTop, "", "rate");
        for (let i = 0; i < testi.rating; i++) {
          createElement("i", containerStar, "", "bi bi-star-fill");
        }

        hr(cardTesti);

        // commentar testi
        const cardDetail = createElement("div", cardTesti, "", "detail");
        cardDetail.innerHTML = `<i>${testi.comment}</i>`;

        hr(cardTesti);

        // history and date
        const cardBottom = createElement("div", cardTesti, "", "bottom");
        createElement("div", cardBottom, testi.product, "histori");
        createElement(
          "div",
          cardBottom,
          testi.time.hour + " | " + testi.time.date,
          "date"
        );
      });
      // console.log(testi.id);
      // console.log(testi.rating);
      // console.log(testi.comment);
      // console.log(testi.time.hour);
      // console.log(testi.time.date);
      // console.log(testi.product);
    });
  });

class Methd {
  createElement(tagName, container, content = "", className = "", id = "") {
    const el = document.createElement(tagName);
    el.textContent = content;
    if (className) el.className = className; // kasih class kalo ada
    if (id) el.id = id; // sama ini buat id-nya
    container.appendChild(el); // tempelin ke container
    return el;
  }
  hr(container) {
    this.createElement("hr", container); // bikin garis pemisah, biar rapi dikit
  }
  cleanAndUppercaseKey(key) {
    return key.replace(/[_\-=+]/g, " ").toUpperCase(); // ganti simbol jadi spasi terus di-uppercase
  }
}

const gameData = fetch("/data/json/game.json").then((res) => res.json());
const fungsi = new Methd();

gameData
  .then((data) => {
    const listTutor = document.getElementById("listTutor");
    const deskripsi = document.getElementById("deskripsi-game");
    const containerInp = document.getElementById("input");
    const contPetunjk = document.getElementById("container-petunjuk");
    const klikPtnjk = document.getElementById("petunjuk");
    const headerCont = document.querySelector("header");
    const deskTrnsk = document.getElementById("deskripsiTransaksi");

    // Ambil ID dari URL
    const urlParams = new URLSearchParams(window.location.search);
    // Cari data game berdasarkan ID
    const gameId = urlParams.get("id");

    const selectedGame = data.find((item) => item.id === gameId);

    // title
    if (selectedGame) {
      document.title = `SixFussion | Top Up ${selectedGame.nama}`;
    }

    // not found
    if (selectedGame) {
      console.log("Nama game:", selectedGame.nama);
      console.log("Deskripsi:", selectedGame.deskripsi);
      document.getElementById("game-not-found").style.display = "none";
    } else {
      document.querySelector("header").style.display = "none";
      document.querySelector("main").style.display = "none";
      document.title = "SixFussion | Page Not Found";
    }

    //tampilin logo + nama game
    const contLogo = fungsi.createElement("div", headerCont, "", "foto");
    const logo = fungsi.createElement("img", contLogo);
    logo.src = selectedGame.gambar.logo;

    const contNameH = fungsi.createElement("div", headerCont, "", "nama");
    fungsi.createElement("div", contNameH, selectedGame.nama, "judul");
    fungsi.createElement("div", contNameH, selectedGame.dev, "dev");
    headerCont.style.backgroundImage = `url('${selectedGame.gambar.background}')`;

    // deskripsi Cara transaksi
    const spanTrnsk = document.getElementById("spnTRnsk");
    spanTrnsk.textContent = selectedGame.nama;

    const containerItem = document.getElementById("container-list-item");
    const itemKeys = Object.keys(selectedGame.list_item);
    //buat list spesial item
    // Cek apakah semua kategori kosong
    const semuaKosong = itemKeys.every((key) => {
      const arr = selectedGame.list_item[key];
      return !Array.isArray(arr) || arr.length === 0;
    });

    // kalo semua kategori kosong
    if (semuaKosong) {
      const pesan = fungsi.createElement("div", containerItem, "", "not-found");
      pesan.innerHTML = `
      <i class="bi bi-exclamation-triangle-fill"></i>
      <p>Oops! Kami tidak menemukan item apa pun di sini.</p>`;
    } else {
      // Tampilkan per kategori yang ADA isinya aja
      itemKeys.forEach((key) => {
        const itemsArr = selectedGame.list_item[key];

        if (!Array.isArray(itemsArr) || itemsArr.length === 0) return; // skip key kosong

        // Judul kategori
        fungsi.createElement(
          "p",
          containerItem,
          fungsi.cleanAndUppercaseKey(key),
          "judul"
        );

        // Container isi item
        const containerItems = fungsi.createElement(
          "div",
          containerItem,
          "",
          `item ${key}`
        );

        // Tampilkan semua item dalam key
        itemsArr.forEach((item) => {
          fungsi.createElement(
            "div",
            containerItems,
            item.nama_item,
            "list-topUp"
          );
        });
      });
    }

    //inputan user
    selectedGame.input.inputan.forEach((input, index) => {
      const inp = fungsi.createElement(
        "input",
        containerInp,
        "",
        "input-field",
        `input-${index}`
      );
      inp.type = "text";
      inp.placeholder = input.placeholder;
    });

    //petunjuk gambar kalo butuh bantuan
    const ptnjk = fungsi.createElement(
      "img",
      contPetunjk,
      "",
      "img-petunjuk",
      "imgPetunjuk"
    );
    ptnjk.src = selectedGame.gambar.petunjuk;
    ptnjk.style.display = "none";
    klikPtnjk.addEventListener("click", () => {
      ptnjk.style.display =
        ptnjk.style.display === "none" || ptnjk.style.display === ""
          ? "block"
          : "none";
      setTimeout(() => {
        ptnjk.style.display = "none"; // otomatis ilang lagi setelah 10 detik
      }, 10000);
    });

    //biar paragraf panjangnya nggak numpuk, dibagi-bagi pake <br>
    let count = 0;
    let filterDesk = selectedGame.deskripsi.replace(/\./g, (match) => {
      count++;
      return count % 3 === 0 ? ".<br>" : match;
    });
    deskripsi.innerHTML = `<p>${filterDesk}</p>`;

    // highlight nama game dalam deskripsi, biar stand out
    const namaGame = selectedGame.nama.toLowerCase();
    let spanDeskripsi = document.querySelector("#deskripsi-game").innerHTML;
    if (typeof namaGame === "string" && namaGame.trim() !== "") {
      const regex = new RegExp(`\\b(${namaGame})\\b`, "gi");
      spanDeskripsi = spanDeskripsi.replace(regex, `<span>$1</span>`);
    }
    document.querySelector("#deskripsi-game").innerHTML = spanDeskripsi;

    //bagian tutorial cara top up
    selectedGame.tutor.forEach((step) => {
      fungsi.createElement("li", listTutor, step);
    });
  })
  .catch((error) => {
    console.error("Gagal mengambil data game:", error); // kalo gagal fetch
  });

//bagian dropdown metode pembayaran
const containerPay = document.getElementById("container-pay");
let openDropdown = null;
let oldBtn = null;
fetch("/data/json/payment.json")
  .then((res) => res.json())
  .then((data) => {
    data.payment.forEach((item) => {
      const divKategori = fungsi.createElement(
        "div",
        containerPay,
        "",
        `${item.kategori.toLowerCase().replace(/\s+/g, "-")} btn`
      );

      const btn = fungsi.createElement(
        "button",
        divKategori,
        "",
        "dropdown-button"
      );
      fungsi.createElement("i", btn, "", item.ikon); // ikon pembayaran
      fungsi.createElement("p", btn, item.kategori); // label kategorinya

      if (item.list && item.list.length > 0) {
        const dropdown = fungsi.createElement(
          "div",
          divKategori,
          "",
          "dropdown-content"
        );

        btn.style.borderRadius = "10px";
        dropdown.classList.remove("show");

        btn.addEventListener("click", () => {
          if (openDropdown && openDropdown !== dropdown) {
            openDropdown.classList.remove("show");
            oldBtn.style.borderRadius = "10px";
          }
          if (!dropdown.classList.contains("show")) {
            dropdown.classList.add("show");
            btn.style.borderRadius = "10px 10px 0 0";
            openDropdown = dropdown;
            oldBtn = btn;
          } else {
            dropdown.classList.remove("show");
            btn.style.borderRadius = "10px";
            openDropdown = null;
            oldBtn = null;
          }
        });

        // masukin metode bayar ke dropdown
        item.list.forEach((payMethod) => {
          const payDiv = fungsi.createElement(
            "div",
            dropdown,
            "",
            `pay ${payMethod.nama.toLowerCase()}`
          );

          const topPayment = fungsi.createElement(
            "div",
            payDiv,
            "",
            "top-payment"
          );

          const logo = fungsi.createElement("img", topPayment);
          logo.src = payMethod.logo;

          fungsi.createElement("p", topPayment, payMethod.nama, "nama");

          fungsi.hr(payDiv);

          fungsi.createElement("div", payDiv, "Rp. 40.421", "harga");
        });
      }
    });
  })
  .catch((err) => console.error("Error fetching payment data:", err));

const containerTesti = document.getElementById("container-testimonial");

fetch("/data/json/testimonial.json")
  .then((res) => res.json())
  .then((testimonialList) => {
    gameData.then((dataGame) => {
      const urlParams = new URLSearchParams(window.location.search);
      const gameId = urlParams.get("id");

      testimonialList.forEach((testi, index) => {
        const selectedGame = dataGame.find((game) => game.id === testi.id);
        console.log("Testi ID:", testi.id);
        console.log("Selected Game:", selectedGame);

        // Jika game ditemukan dan id game di url sesuai, tampilkan testimoni
        if (selectedGame && selectedGame.id === gameId) {
          const cardTesti = fungsi.createElement(
            "div",
            containerTesti,
            "",
            `testi ${index + 1}`
          );

          const cardTop = fungsi.createElement("div", cardTesti, "", "top");
          fungsi.createElement("div", cardTop, selectedGame.nama, "nama-game");

          const containerStar = fungsi.createElement(
            "div",
            cardTop,
            "",
            "rate"
          );
          for (let star = 0; star < testi.rating; star++) {
            fungsi.createElement("i", containerStar, "", "bi bi-star-fill");
          }

          fungsi.hr(cardTesti);

          const cardDetail = fungsi.createElement(
            "div",
            cardTesti,
            "",
            "detail"
          );
          cardDetail.innerHTML = `<i>${testi.comment}</i>`;

          fungsi.hr(cardTesti);
          document.getElementById("no-testi").style.display = "none";

          const cardBottom = fungsi.createElement(
            "div",
            cardTesti,
            "",
            "bottom"
          );
          fungsi.createElement("div", cardBottom, testi.product, "histori");
          fungsi.createElement(
            "div",
            cardBottom,
            `${testi.time.hour} - ${testi.time.date}`,
            "date"
          );
        } else {
          document.getElementById("no-testi").style.display = "flex";
        }
      });
    });
  })
  .catch((err) => console.log(`Gagal fetch data testimonial: ${err}`));

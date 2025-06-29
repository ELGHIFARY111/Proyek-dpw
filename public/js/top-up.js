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
  generateInv() {
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${timestamp}-${random}`;
  }
  timeUnderTen(value) {
    return value < 10 ? "0" + value : value;
  }
  showPopup({
    id,
    username,
    userId,
    kategori,
    produk,
    wa,
    voucher,
    metode,
    harga,
  }) {
    popup.innerHTML = `
      <main>
      <section>
        <div class="judul">
          <p>Konfirmasi Pesanan</p>
        </div>
        <div class="isi">
          <div class="disclaimer">
            <i class="bi bi-info-circle-fill"></i>&nbsp;&nbsp;Periksa kembali
            informasi pesanan Anda dengan teliti. Kesalahan dapat menyebabkan
            pengiriman yang tidak tepat atau tertunda
          </div>
          <div class="informasi">
            <p>Informasi Akun<span></span></p>
            <table>
              <tr>
                <td>Username:</td>
                <td>${username}</td>
                </tr>
                <tr>
                <td>User ID:</td>
                <td>${userId}</td>
                </tr>
                </table>
                <p>Ringkasan Pesanan <span></span></p>
                <table>
                <tr>
                <td>Kategori:</td>
                <td>${kategori}</td>
                </tr>
                <tr>
                <td>Produk:</td>
                <td>${produk}</td>
                </tr>
                <tr>
                <td>No. WhatsApp:</td>
                <td>${wa}</td>
                </tr>
                <tr>
                <td>Voucher:</td>
                <td>${voucher}</td>
                </tr>
                <tr>
                <td>Metode Pembayaran:</td>
                <td>${metode}</td>
                </tr>
                <tr>
                <td>Harga:</td>
                <td>${harga}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="tombol">
          <button class="cancel">Batalkan</button>
          <button class="payNow">Bayar Sekarang</button>
        </div>
      </section>
    </main>
  `;
    // clocse card
    popup.style.display = "flex";
    document.querySelector(".cancel").addEventListener("click", () => {
      const section = document.querySelector("#popUp section");
      section.style.animation = "slideClose 0.5s ease forwards";
      setTimeout(() => {
        popup.style.display = "none";
      }, 500);
    });

    // send ke endpoint
    const inv = this.generateInv();
    const now = new Date();
    document.querySelector(".payNow").addEventListener("click", () => {
      const sendData = {
        id,
        invoice: inv,
        username,
        userId,
        kategori,
        produk,
        wa,
        voucher,
        metode,
        harga,
        status: {
          pesanan: false,
          pembayaran: false,
        },
        time: {
          waktu: `${this.timeUnderTen(now.getHours())}:${this.timeUnderTen(
            now.getMinutes()
          )}:${this.timeUnderTen(now.getSeconds())}`,
          tanggal: `${this.timeUnderTen(now.getDate())}/${this.timeUnderTen(
            now.getMonth()
          )}/${now.getFullYear()}`,
        },
        expired: {
          waktu: `${this.timeUnderTen(now.getHours())}:${this.timeUnderTen(
            now.getMinutes()
          )}:${this.timeUnderTen(now.getSeconds())}`,
          tanggal: `${this.timeUnderTen(now.getDate() + 1)}/${this.timeUnderTen(
            now.getMonth()
          )}/${now.getFullYear()}`,
        },
      };

      fetch("/simpan-transaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
        .then((res) => res.text())
        .then((msg) => {
          console.log(msg);
          popup.style.display = "none";
          window.location.href = `/payment/${inv}`;
        })
        .catch((err) => console.error("Gagal kirim data:", err));
    });
  }
}
const dataPay = fetch("/api/payment.json").then((res) => res.json());
const gameData = fetch("/api/game.json").then((res) => res.json());
const fungsi = new Methd();

// reset popup konfirmasi pembayaran
const popup = document.getElementById("popUp");
popup.style.display = "none";

let selectPay = ""; //biar bisa dipake card confirmnya
let userIdInp = "";
let itemPopUp = "";
let wa = "";
const vchr = document.querySelector("#voucher").value || "-";
let totalPayment = "";
let kategoriPopUp = "";

// voucher
fetch("/api/voucher.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((dataVoucher) => {
      document.getElementById("addVchr").addEventListener("click", () => {
        if (dataVoucher.includes(vchr)) {
          console.log("bisa");
        }
      });
    });
  });

gameData
  .then((data) => {
    const listTutor = document.getElementById("listTutor");
    const deskripsi = document.getElementById("deskripsi-game");
    const containerInp = document.getElementById("input");
    const contPetunjk = document.getElementById("container-petunjuk");
    const klikPtnjk = document.getElementById("petunjuk");
    const headerCont = document.querySelector("header");

    // Ambil ID dari URL
    const ResGame = window.location.pathname.split("/").pop();

    const selectedGame = data.find((item) => item.id === ResGame);

    // title
    if (selectedGame) {
      document.title = `SixFussion | Top Up ${selectedGame.nama}`;
    }
    if (!selectedGame) {
      window.location.href = "/notfound";
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
          "a",
          containerItem,
          "",
          `item ${key}`
        );
        containerItems.href = "#payment";

        // Tampilkan semua item dalam key
        itemsArr.forEach((item) => {
          const itm = fungsi.createElement(
            "div",
            containerItems,
            "",
            "list-topUp"
          );
          // tambah harga list item
          itm.innerHTML = `${item.nama_item} <br>`;
          fungsi.createElement("span", itm, item.harga.toLocaleString("id-ID"));

          itm.addEventListener("click", () => {
            // Hapus semua harga yang ada sebelumnya dari SEMUA elemen .pay
            document.querySelectorAll(".pay .harga").forEach((hargaEl) => {
              hargaEl.remove();
            });
            // Tambahkan harga baru ke SEMUA elemen .pay yang ada
            document.querySelectorAll(".pay").forEach((payEl) => {
              fungsi.createElement(
                "div",
                payEl,
                item.harga.toLocaleString("id-ID"),
                "harga"
              );
            });

            document.querySelectorAll(".button").forEach((button) => {
              button.addEventListener("click", () => {
                const usrInput1 = document.getElementById(`input-0`);
                const usrInput2 = document.getElementById(`input-1`);

                wa = document.querySelector("#no").value || "-";
                const vchr = document.querySelector("#voucher").value || "-";

                let totalPayment = item.harga;
                const kategoriPopUp = selectedGame.nama;
                // user id
                // perbaiki ini
                const usrId1 = usrInput1 ? usrInput1.value : "";
                const usrId2 = usrInput2 ? usrInput2.value : "";
                userIdInp = usrId2 ? `${usrId1} (${usrId2})` : usrId1;
                itemPopUp = item.nama_item;

                switch (true) {
                  case !userIdInp:
                    alert("Masukkan ID gamenya dulu ya");
                    break;
                  case !kategoriPopUp:
                    alert(
                      "Silakan pilih item dulu, biar kami bisa proses pesananmu!"
                    );
                    break;
                  case !selectPay:
                    alert(
                      "Pilih metode pembayaran agar kamu segera memproses pesananmu!"
                    );
                    break;
                  case !wa:
                    alert(
                      "Masukkan nomor WhatsApp untuk konfirmasi pesananmu yaa"
                    );
                    break;
                  default:
                    fungsi.showPopup({
                      id: selectedGame.id,
                      username: "Devitaa",
                      userId: userIdInp,
                      kategori: kategoriPopUp,
                      produk: itemPopUp,
                      wa: wa,
                      voucher: vchr,
                      metode: selectPay,
                      harga: totalPayment.toLocaleString("id-ID"),
                    });
                }
              });
            });

            // Set active ketika untuk item yang diklik
            document.querySelectorAll(".list-topUp").forEach((el) => {
              el.classList.remove("active");
            });
            itm.classList.add("active");
          });
        });
      });
    }

    //inputan user
    const jumlahInput = selectedGame.input.inputan.length;
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
      if (jumlahInput === 1) {
        inp.style.width = "200%";
      }
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

    // highlight nama game dalam deskripsi
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
dataPay
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
      fungsi.createElement("p", btn, item.kategori); // label kategori

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
            // openDropdown.remove()
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
          const payA = fungsi.createElement("a", dropdown, "", "");
          payA.href = "#voucher";
          const payDiv = fungsi.createElement(
            "div",
            payA,
            "",
            `pay ${payMethod.nama.toLowerCase()}`
          );
          // return payDiv;

          payDiv.addEventListener("click", () => {
            selectPay = payMethod.nama;
            // console.log(selectPay);
            document.querySelectorAll(".pay").forEach((el) => {
              el.classList.remove("active");
            });
            payDiv.classList.add("active");
          });

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
        });
      }
    });
  })
  .catch((err) => console.error("Error fetching payment data:", err));

const containerTesti = document.getElementById("container-testimonial");
fetch("/api/testimonial.json")
  .then((res) => res.json())
  .then((testimonialList) => {
    gameData.then((dataGame) => {
      const gameId = window.location.pathname.split("/").pop();

      testimonialList.forEach((testi, index) => {
        const selectedGame = dataGame.find((game) => game.id === testi.id);

        // console.log("Testi ID:", testi.id);
        // console.log("Selected Game:", selectedGame);

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
          cardDetail.innerHTML = `<p>${testi.comment}</p>`;

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
        }
      });
    });
  })
  .catch((err) => console.log(`Gagal fetch data testimonial: ${err}`));

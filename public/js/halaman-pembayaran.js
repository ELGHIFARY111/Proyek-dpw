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

async function loadData() {
  const responseTransaksi = await fetch("/api/transaksi.json");
  const dataTransaksi = await responseTransaksi.json();

  const responseGame = await fetch("/api/game.json");
  const dataGame = await responseGame.json();

  const invoiceId = window.location.pathname.split("/").pop();
  console.log("Invoice dari URL:", invoiceId);

  // cari data transaksi sesuai invoice
  const invoiceData = dataTransaksi.find((item) => item.invoice === invoiceId);
  if (!invoiceData) {
    console.error("Invoice tidak ditemukan");
    return;
  }
  console.log("Data invoice:", invoiceData);

  // cari data game sesuai produk di invoice
  const filteredGame = dataGame.find((game) => game.id === invoiceData.id);
  console.log("Data game:", filteredGame);
  console.log(invoiceData);
  console.log(filteredGame);

  const statusCombo = `${invoiceData.status.pembayaran}-${invoiceData.status.pesanan}`;

  let prcbngBayar;
  switch (statusCombo) {
    case "false-false":
      prcbngBayar = "Menunggu Pembayaran";
      break;
    case "true-false":
      prcbngBayar = "Memproses Top-up";
      break;
    case "true-true":
      prcbngBayar = "Transaksi Berhasil";
      break;
    default:
      prcbngBayar = "Status Tidak Dikenal";
  }

  let prcbngInv;
  switch (statusCombo) {
    case "false-false":
      prcbngInv = " menunggu pembayaran sebelum dikirim.";
      break;
    case "true-false":
      prcbngInv = " sedang diproses untuk dikirim.";
      break;
    case "true-true":
      prcbngInv = " telah dikirim dan akan segera tiba.";
      break;
    default:
      prcbngInv = " dengan status tidak dikenal.";
  }

  const container = document.querySelector("main");
  const sec1 = createElement("section", container);
  const jdlSts = createElement("div", sec1, "", "judul-status");
  const pJudul = createElement("p", jdlSts, prcbngBayar);
  const contInvTop = createElement(
    "span",
    pJudul,
    "Pesanan Anda dengan No. Invoice "
  );
  createElement("span", contInvTop, invoiceData.invoice);
  const textNode = document.createTextNode(prcbngInv);
  contInvTop.appendChild(textNode);
  createElement("div", sec1, "Rincian Pesanan", "rincian");

  // waktunya
  let totalDetik = 24 * 3600 + 0 * 60 + 0;
  const contKadalrs = createElement("div", sec1, "", "kadaluarsa");
  if (invoiceData.status.pembayaran === true) {
    contKadalrs.remove();
  }
  const contKadalrs2 = createElement("div", contKadalrs, "", "space");
  const bungkusWaktu = createElement("div", contKadalrs2, "", "bungkus-waktu");
  createElement("p", bungkusWaktu, "Pesanan akan kadaluarsa dalam");
  const contWaktu = createElement("div", bungkusWaktu, "", "waktu");
  const jam = createElement("div", contWaktu, "", "jam");
  const menit = createElement("div", contWaktu, "", "menit");
  const detik = createElement("div", contWaktu, "", "detik");
  const updateCountdown = () => {
    const jamSisa = Math.floor(totalDetik / 3600);
    const menitSisa = Math.floor((totalDetik % 3600) / 60);
    const detikSisa = totalDetik % 60;

    jam.innerHTML = `<p>${jamSisa}<span>Jam</span></p>`;
    menit.innerHTML = `<p>${menitSisa}<span>Menit</span></p>`;
    detik.innerHTML = `<p>${detikSisa}<span>Detik</span></p>`;

    if (totalDetik <= 0) {
      clearInterval(timer);
    }

    totalDetik--;
  };

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

  const sec2 = createElement("section", container);
  const contKiri = createElement("div", sec2, "", "kiri");
  const contKiriAtas = createElement("div", contKiri, "", "kiri-atas");
  contKiriAtas.innerHTML = `
              <i class="bi bi-bag"></i>
              <p>
              ${
                invoiceData.status.pembayaran === true
                  ? "Terbayarkan Pada"
                  : "Pesanan Dibuat Pada"
              }
                <span>  ${invoiceData.time.tanggal} | <span>${
    invoiceData.time.waktu
  }</span></span>
              </p>
  `;

  // kategori
  const contKiriBawah = createElement("div", contKiri, "", "kiri-bawah");
  const kategori = createElement("div", contKiriBawah, "", "kategori");
  kategori.innerHTML = `
                <p>Kategori Game <span></span></p>
                <div class="detail">
                  <img src="${filteredGame.gambar.logo}" alt="" />
                  <p>${filteredGame.nama} <span>${filteredGame.dev}</span></p>
                </div>
  `;

  // informasi pesanan
  const informasi = createElement("div", contKiriBawah, "", "informasi");
  const judulInfo = createElement("p", informasi, "Informasi Pesanan ");
  createElement("span", judulInfo);
  const contTabel = createElement("div", informasi, "", "tabel");
  const tabel = createElement("table", contTabel);
  const tr1 = createElement("tr", tabel);
  createElement("td", tr1, `Nickname:`);
  createElement("td", tr1, `${invoiceData.username}`);
  const tr2 = createElement("tr", tabel);
  createElement("td", tr2, `User ID:`);
  createElement("td", tr2, `${invoiceData.userId}`);

  const contKanan = createElement("div", sec2, "", "kanan");
  const atas = createElement("div", contKanan, "", "atas");
  const invBawah = createElement("div", atas, "", "invoice");
  // buat salin inv
  const cpy = createElement("i", invBawah, "", "bi bi-copy", "copy");
  cpy.addEventListener("click", () => {
    navigator.clipboard
      .writeText(`${invoiceData.invoice}`)
      .then(() => {
        cpy.classList.remove("bi-copy");
        cpy.classList.add("bi-check-lg");
        setTimeout(() => {
          cpy.classList.remove("bi-check-lg");
          cpy.classList.add("bi-copy");
        }, 2500);
      })
      .catch((err) => {
        alert("Gagal menyalin teks: ", err);
      });
  });

  createElement("p", invBawah, `${invoiceData.invoice}`);
  createElement("hr", atas);

  const statusPesanan =
    invoiceData.status.pesanan == false ? "Pending" : "Success";
  const statusPembayaran =
    invoiceData.status.pembayaran == false ? "Unpaid" : "Paid";

  const tabelStatus = createElement("table", atas);
  const trStatus1 = createElement("tr", tabelStatus);
  createElement("td", trStatus1, "Status Pesanan:");
  createElement(
    "td",
    trStatus1,
    statusPesanan,
    statusPesanan === "Success" ? "status" : "pending"
  );
  const trStatus2 = createElement("tr", tabelStatus);
  createElement("td", trStatus2, "Status Pembayaran:");
  createElement(
    "td",
    trStatus2,
    statusPembayaran,
    statusPembayaran === "Paid" ? "status" : "unpaid"
  );
  const trStatus3 = createElement("tr", tabelStatus);
  // perbaiki
  createElement("td", trStatus3, "Kode Voucher:");
  createElement("td", trStatus3, "-");
  // =========
  const expr = invoiceData.time.tanggal;
  const trStatus4 = createElement("tr", tabelStatus);
  if (invoiceData.status.pembayaran === true) {
    trStatus4.remove();
  }
  createElement("td", trStatus4, "Kadaluarsa:");
  createElement(
    "td",
    trStatus4,
    `${invoiceData.expired.tanggal} | ${invoiceData.expired.waktu}`
  );
  createElement("hr", atas);

  const tabelItem = createElement("table", atas);
  const trItem1 = createElement("tr", tabelItem);
  createElement("td", trItem1, "Item:");
  createElement("td", trItem1, `${invoiceData.produk}`);
  const trItem2 = createElement("tr", tabelItem);
  createElement("td", trItem2, "Jumlah:");
  createElement("td", trItem2, "1 Qyt");
  const trItem3 = createElement("tr", tabelItem);
  createElement("td", trItem3, "Metode Pembayaran:");
  createElement("td", trItem3, `${invoiceData.metode}`);
  const trItem4 = createElement("tr", tabelItem);
  createElement("td", trItem4, "Total Pembayaran:");
  createElement("td", trItem4, `Rp. ${invoiceData.harga}`);

  const contBawah = createElement("div", contKanan, "", "bawah");
  invoiceData.status.pembayaran === true
    ? (contBawah.style.display = "none")
    : createElement("a", contBawah, "Bayar Sekarang", "bayar");
}
loadData();

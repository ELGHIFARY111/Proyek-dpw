const user = {
    saldo: 55000,
    transaksi: [
        { tanggal: "2025-05-25", produk: "Genshin 300 Crystals", harga: 50000, tujuan: "UID123456", status: "Berhasil" },
        { tanggal: "2025-05-24", produk: "Mobile Legends 86 Diamonds", harga: 20000, tujuan: "ID7891011", status: "Berhasil" },
        { tanggal: "2025-05-20", produk: "PUBG 60 UC", harga: 10000, tujuan: "PUBG001", status: "Gagal" },
    ]
    };

function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
    }

document.getElementById("saldo").textContent = formatRupiah(user.saldo);

const tbody = document.getElementById("riwayat-body");
user.transaksi.forEach((tx, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${tx.tanggal}</td>
    <td>${tx.produk}</td>
    <td>${formatRupiah(tx.harga)}</td>
    <td>${tx.tujuan}</td>
    <td>${tx.status}</td>
    `;
    tbody.appendChild(tr);
});
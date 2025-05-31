const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8000;

// midlware buat baca json
app.use(express.json());

// Static files tanpa prefix
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Routing
app.get("/notfound", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "pages", "not-found.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "HALAMAN_UTAMA.html"));
});
app.get("/top-up", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "top-up.html"));
});
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "halaman-pembayaran.html"));
});
app.get("/list-game", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "list-game.html"));
});
app.get("/artikel-home", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "artikel.html"));
});
app.get("/news-home", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "news-home.html"));
});
app.get("/detail", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "detail.html"));
});
app.get("/promo", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "promo.html"));
});
app.get("/referal", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "refreal.html"));
});
app.get("/saldo-dan-top-up", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "saldo-dan-top-up.html"));
});
app.get("/cek-pesanan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "cek-pesanan.html"));
});
app.get("/select-game", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "select-game.html"));
});
app.get("/flappy", (req, res) => {
  res.sendFile(path.join(__dirname, "game", "flappy bird", "index.html"));
});
app.get("/mengetik_cepat", (req, res) => {
  res.sendFile(
    path.join(__dirname, "game", "game mengetik cepat", "index.html")
  );
});
app.get("/game_reacttion_time", (req, res) => {
  res.sendFile(
    path.join(__dirname, "game", "game reaction time", "index.html")
  );
});
app.get("/tangkap_blok", (req, res) => {
  res.sendFile(path.join(__dirname, "game", "game tangkap blok", "index.html"));
});
app.get("/syaratDanKetentuan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "syaratKetentuan.html"));
});
app.get("/news", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "news.html"));
});
app.get("/about-us", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "aboutUs.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "register.html"));
});
app.get("/f-pass", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "f-pass.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});
app.get("/dashboard-user", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "dashboard-user.html"));
});
app.get("/laporkan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "laporkan.html"));
});
app.get("/syarat&ketentuan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "syaratKetentuan.html"));
});


// Endpoint transaksi baru
app.post("/simpan-transaksi", (req, res) => {
  const newData = req.body;
  console.log("Transaksi baru:", newData);

  const folderPath = path.join(__dirname, "public/api");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, "transaksi.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    let transaksiArray = JSON.parse(data);

    transaksiArray.push(newData); // tambah data baru
    fs.writeFile(filePath, JSON.stringify(transaksiArray, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal simpan transaksi");
      }
      res.send("Transaksi berhasil disimpan");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server nyala di http://localhost:${PORT}`);
});

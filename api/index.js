const express = require("express");
const fs = require("fs");
const path = require("path");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", express.static(path.join(__dirname, "../data")));
app.use("/node_modules", express.static(path.join(__dirname, "../node_modules")));

// Utility function
const getPage = (file) => path.join(__dirname, "../pages", file);

// === Routing HTML Pages ===
const htmlRoutes = {
    "/": "HALAMAN_UTAMA.html",
    "/faq": "faq.html",
    "/notfound": "not-found.html",
    "/list-game": "list-game.html",
    "/detail": "detail.html",
    "/promo": "promo.html",
    "/referal": "refreal.html",
    "/saldo-dan-top-up": "saldo-dan-top-up.html",
    "/cek-pesanan": "cek-pesanan.html",
    "/select-game": "select-game.html",
    "/syaratDanKetentuan": "syaratKetentuan.html",
    "/about-us": "aboutUs.html",
    "/register": "register.html",
    "/f-pass": "f-pass.html",
    "/login": "login.html",
    "/dashboard-user": "dashboard-user.html",
    "/laporkan": "laporkan.html",
    "/syarat&ketentuan": "syaratKetentuan.html",
    "/kebijakanPrivasi": "kebijakanPrivasi.html",
    "/dashboard-admin": "dashboard-admin.html",
    "/testimonial": "testimoni.html",
    "/live-chat": "live-chat.html",
    "/hubungi-kami": "hubungi_kami.html",
    "/halaman-form": "halaman-form.html",
    "/winrate": "winrate.html",
    "/form-testi": "formtesti.html",
    "/searching": "searching.html",
    "/artikel": "artikel-home.html",
    "/pay": "konfirmasi-pembayaran.html",
    "/news": "news-home.html"
};

for (const [route, file] of Object.entries(htmlRoutes)) {
    app.get(route, (req, res) => res.sendFile(getPage(file)));
}

// === Game pages ===
app.get("/flappy", (req, res) => {
    res.sendFile(path.join(__dirname, "../game/flappy bird/index.html"));
});
app.get("/mengetik_cepat", (req, res) => {
    res.sendFile(path.join(__dirname, "../game/game mengetik cepat/index.html"));
});
app.get("/game_reaction", (req, res) => {
    res.sendFile(path.join(__dirname, "../game/game reaction/index.html"));
});
app.get("/tangkap_blok", (req, res) => {
    res.sendFile(path.join(__dirname, "../game/game tangkap blok/index.html"));
});

// === Artikel ===
app.get("/artikel-home", (req, res) => {
    res.sendFile(getPage("artikel-home.html"));
});
app.get("/artikel/:heading2", (req, res) => {
    const head2 = req.params.heading2;
    const dataPath = path.join(__dirname, "../data/artikel.json");

    fs.readFile(dataPath, "utf-8", (err, jsonData) => {
        if (err || !JSON.parse(jsonData).find((j) => j.id === head2)) {
            return res.status(404).json({ error: "Artikel tidak ditemukan" });
        }
        res.sendFile(getPage("artikel.html"));
    });
});

// === News ===
app.get("/news/:judulId", (req, res) => {
    const id = req.params.judulId;
    const dataPath = path.join(__dirname, "../data/news.json");

    fs.readFile(dataPath, "utf-8", (err, jsonData) => {
        if (err || !JSON.parse(jsonData).find((j) => j.id === id)) {
            return res.status(404).json({ error: "News tidak ditemukan" });
        }
        res.sendFile(getPage("news.html"));
    });
});

// === Topup dan Payment ===
app.get("/top-up/:idGame", (req, res) => {
    res.sendFile(getPage("top-up.html"));
});

app.get("/payment/:invoice", (req, res) => {
    const invoice = req.params.invoice;
    const dataPath = path.join(__dirname, "../data/transaksi.json");

    fs.readFile(dataPath, "utf-8", (err, jsonData) => {
        const data = JSON.parse(jsonData || "[]");
        if (err || !data.find((x) => x.invoice === invoice)) {
            return res.status(404).json({ error: "Invoice tidak ditemukan" });
        }
        res.sendFile(getPage("halaman-pembayaran.html"));
    });
});

// === API GET ===
app.get("/api/pesan", (req, res) => {
    const dataPath = path.join(__dirname, "../data/pesan.json");
    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Gagal membaca data" });
        res.json(JSON.parse(data));
    });
});

app.get("/api/testimoni", (req, res) => {
    const dataPath = path.join(__dirname, "../data/testimonial.json");
    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Gagal membaca testimoni" });
        res.json(JSON.parse(data));
    });
});

// === Login & Register ===
app.post("/login-user", (req, res) => {
    const { email, password } = req.body;
    const dataPath = path.join(__dirname, "../data/users.json");
    const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return res.status(401).json({ error: "Login gagal" });

    res.json({ message: "Login sukses", user: found });
});

app.post("/register-user", (req, res) => {
  // Hanya simulasi — tidak akan bisa menyimpan di Vercel
    res.status(403).json({ error: "Vercel tidak mendukung simpan data lokal. Gunakan database." });
});

// === Exports ===
module.exports = serverless(app);

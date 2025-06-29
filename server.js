const { error } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const admin = require("firebase-admin");
require("dotenv").config();
const firebaseKey = process.env.FIREBASE_KEY;
const serviceAccount = JSON.parse(firebaseKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const pesanCollection = db.collection("pesan");
// midlware buat baca json
app.use(express.json());

// Static files tanpa prefix
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", express.static(path.join(__dirname, "data")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Routing
app.get("/notfound", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "pages", "not-found.html"));
});
app.get("/faq", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "pages", "faq.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "HALAMAN_UTAMA.html"));
});
app.get("/list-game", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "list-game.html"));
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
app.get("/HALAMAN_UTAMA", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "artikel-home.html"));
});

app.get("/cek-pesanan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "cek-pesanan.html"));
});
app.get("/code", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "code.html"));
});
app.get("/hissaldo", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "hissaldo.html"));
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
app.get("/game_reaction", (req, res) => {
  res.sendFile(path.join(__dirname, "game", "game reaction", "index.html"));
});
app.get("/tangkap_blok", (req, res) => {
  res.sendFile(path.join(__dirname, "game", "game tangkap blok", "index.html"));
});
app.get("/syaratDanKetentuan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "syaratKetentuan.html"));
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
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});
app.get("/dashboard-user",(req, res) => {
  res.sendFile(path.join(__dirname, "pages", "dashboard-user.html"));
});
app.get("/laporkan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "laporkan.html"));
});
app.get("/syarat&ketentuan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "syaratKetentuan.html"));
});
app.get("/kebijakanPrivasi", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "kebijakanPrivasi.html"));
});
app.get("/dashboard-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "dashboard-admin.html"));
});
app.get("/testimonial", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "testimoni.html"));
});
app.get("/live-chat", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "live-chat.html"));
});

app.get("/hubungi-kami", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "hubungi_kami.html"));
});
app.get("/halaman-form", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "halaman-form.html"));
});
app.get("/winrate", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "winrate.html"));
});
app.get("/testimoni", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "testimoni.html"));
});
app.get("/form-testi", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "formtesti.html"));
});
app.get("/searching", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "searching.html"));
});

app.get("/artikel", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "artikel-home.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "dashboard-user.html"));
});

app.get("/pay", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "konfirmasi-pembayaran.html"));
});

app.get("/kalkulasi-winrate", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "winrate.html"));
});

app.get("/saldo_dan_topup", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "saldo-dan-top-up.html"));
});
 
app.get("/halaman-pengaturan", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "Halaman-pengaturan.html"));
});

app.get("/hissaldo", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "hissaldo.html"));
});

// ========================================================================

// routing artikel
app.get("/artikel-home", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "artikel-home.html"));
});
app.get("/artikel/:heading2", (req, res) => {
  const head2 = req.params.heading2;
  const dataPath = path.join(__dirname, "data", "artikel.json");

  fs.readFile(dataPath, "utf-8", (err, jsonData) => {
    if (err)
      return res.status(500).json({ error: `Gagal membaca data ${dataPath}` });

    const data = JSON.parse(jsonData);
    const found = data.find((j) => j.id === head2);
    if (!found) {
      return res.status(404).json({ error: "Data news tidak di temukan" });
    }
    res.sendFile(path.join(__dirname, "pages", "artikel.html"));
  });
});

// routing news
app.get("/news", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "news-home.html"));
});
app.get("/news/:judulId", (req, res) => {
  const judul = req.params.judulId;
  const dataPath = path.join(__dirname, "data", "news.json");

  fs.readFile(dataPath, "utf-8", (err, jsonData) => {
    if (err)
      return res.status(500).json({ error: `Gagal membaca data ${dataPath}` });

    const data = JSON.parse(jsonData);
    const found = data.find((j) => j.id === judul);
    if (!found) {
      return res.status(404).json({ error: "Data news tidak di temukan" });
    }
    res.sendFile(path.join(__dirname, "pages", "news.html"));
  });
});

// routing list game => top-up
app.get("/top-up/:idGame", (req, res) => {
  const game = req.params.idGame;
  const dataPath = path.join(__dirname, "data", "game.json");
  console.log(dataPath);

  fs.readFile(dataPath, "utf-8", (err, jsonData) => {
    if (err)
      return res.status(500).json({ error: `Gagal membaca data ${dataPath}` });

    res.sendFile(path.join(__dirname, "pages", "top-up.html"));
  });
});

// routing topup => pay
app.get("/payment/:invoice", (req, res) => {
  const invoice = req.params.invoice;
  const dataPath = path.join(__dirname, "data", "transaksi.json");

  fs.readFile(dataPath, "utf-8", (err, jsonData) => {
    if (err) return res.status(500).json({ error: "Gagal membaca data Game" });

    const data = JSON.parse(jsonData);
    const found = data.find((x) => x.invoice === invoice);
    if (!found)
      return res.status(404).json({ error: "Invoice tidak ditemukan" });

    res.sendFile(path.join(__dirname, "pages", "halaman-pembayaran.html"));
  });
});

// Endpoint transaksi => transaksi.json
app.post("/simpan-transaksi", (req, res) => {
  const newData = req.body;
  console.log("Transaksi baru:", newData);

  const folderPath = path.join(__dirname, "data");

  const filePath = path.join(folderPath, "transaksi.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    let transaksiArray = JSON.parse(data);

    transaksiArray.push(newData);
    fs.writeFile(filePath, JSON.stringify(transaksiArray, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal simpan transaksi");
      }
      res.send("Transaksi berhasil disimpan");
    });
  });
});
app.delete("/deleteUser/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    await admin.auth().deleteUser(uid);
    res.status(200).json({ message: "Akun berhasil dihapus.", uid });
  } catch (error) {
    console.error("Gagal menghapus akun:", error);
    res.status(500).json({ error: "Gagal menghapus akun.", detail: error.message });
  }
});



// Endpoint testi 
app.get("/testimoni", (req, res) => {
    const dataPath = path.join(__dirname, "data", "testimonial.json");
    
    fs.readFile(dataPath, "utf8", (err, jsonData) => {
        if (err) {
            return res.status(500).json({ error: `Gagal membaca data ${dataPath}` });
        }
        
        try {
            const testimoniArray = JSON.parse(jsonData);
            res.json(testimoniArray); 
        } catch (parseErr) {
            return res.status(500).json({ error: "Gagal parsing data JSON" });
        }
    });
});

app.post("/simpan-testimonial", (req, res) => {
    const newData = req.body;
    const dataPath = path.join(__dirname, "data", "testimonial.json"); 

    fs.readFile(dataPath, "utf8", (err, jsonData) => {
        if (err) {
            return res.status(500).json({ error: "Gagal membaca file testimonial" });
        }

        try {
            let testimoniArray = JSON.parse(jsonData);
            testimoniArray.push(newData);
            
            fs.writeFile(dataPath, JSON.stringify(testimoniArray, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error(writeErr);
                    return res.status(500).json({ error: "Gagal simpan testimonial" });
                }
                res.json({ message: "Testimonial berhasil disimpan" }); 
            });
        } catch (parseErr) {
            return res.status(500).json({ error: "Gagal parsing data JSON" });
        }
    });
});

// login user admin 
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const snapshot = await db.collection("users")
      .where("email", "==", email)
      .where("password", "==", password)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ error: "Email atau password salah!" });
    }

    const userData = snapshot.docs[0].data();

    res.json({
      message: "Login sukses",
      user: {
        email: userData.email,
        nama: userData.nama,
        role: userData.role
      }
    });
  } catch (err) {
    console.error("Gagal login:", err);
    res.status(500).json({ error: "Server error saat login." });
  }
});



// register user admin
app.post("/register-user", async (req, res) => {
  const { nama, email, password, role } = req.body;

  if (!nama || !email || !password || !role) {
    return res.status(400).json({ error: "Semua field wajib diisi." });
  }

  try {
    const userRef = db.collection("users");
    const snapshot = await userRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      return res.status(400).json({ error: "Email sudah terdaftar." });
    }

    await userRef.add({ nama, email, password, role });
    res.json({ message: "Registrasi berhasil!" });
  } catch (err) {
    console.error("Gagal register user:", err);
    res.status(500).json({ error: "Server error saat register." });
  }
});


// forgot password
app.post('/api/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
    res.status(200).json({ message: 'Password berhasil diubah!' });
  } else {
    res.status(404).json({ message: 'Email tidak ditemukan!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server nyala di http://localhost:${PORT}`);
});
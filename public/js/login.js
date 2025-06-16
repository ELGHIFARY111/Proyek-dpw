document.getElementById("login").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  try {
    const response = await fetch("/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      // Tampilkan pesan sukses
      alert("Login sukses!");

      // Simpan user ke localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(result.user));

      // Cek role dan arahkan
      const role = result.user.role || "user";

      if (role === "admin") {
        window.location.href = "/dashboard-admin";
      } else {
        window.location.href = "/dashboard-user";
      }
    } else {
      // Jika login gagal
      alert(result.error || "Login gagal. Periksa kembali email dan password.");
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    alert("Terjadi kesalahan saat login. Coba lagi nanti.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const namaInput = document.getElementById("nama");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordForm = document.querySelector(".form-container-1");
    const profileForm = document.querySelector(".form-container");

    // Validasi Nama ≠ Username
    namaInput.addEventListener("input", () => {
        if (namaInput.value.trim().toLowerCase() === usernameInput.value.trim().toLowerCase()) {
            alert("Nama baru tidak boleh sama dengan Username!");
            namaInput.value = "";
        }
    });

    // Validasi Form Profil saat submit
    profileForm.addEventListener("submit", (e) => {
        if (!namaInput.value.trim() || !emailInput.value.trim()) {
            alert("Nama dan Email harus diisi!");
            e.preventDefault();
        } else {
            e.preventDefault(); // Mencegah reload halaman
            alert("Data profil berhasil diperbarui!");
        }
    });

    // Validasi Form Password saat submit
    passwordForm.addEventListener("submit", (e) => {
        const pwLama = document.getElementById("pwlama").value.trim();
        const pwBaru = document.getElementById("pwbaru").value.trim();
        const ulangPwBaru = document.getElementById("ulangpwbaru").value.trim();

        if (!pwLama || !pwBaru || !ulangPwBaru) {
            alert("Semua kolom password harus diisi!");
            e.preventDefault();
        } else if (pwBaru !== ulangPwBaru) {
            alert("Password Baru dan Ulangi Password Baru tidak sesuai!");
            e.preventDefault();
        }
    });
});


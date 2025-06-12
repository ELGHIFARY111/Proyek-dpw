const form = document.getElementById('register');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const confirmPassword = document.getElementById('pass-ulang').value;
    const role = document.getElementById('role').value;

    if (password !== confirmPassword) {
        alert('Password tidak cocok!');
        return;
    }

    const newUser = {
        nama: username,
        email,
        password,
        role
    };

    fetch("/register-user", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            form.reset();
            window.location.href = "/login";
        }
    })
    .catch(error => {
        console.error("Gagal daftar:", error);
        alert("Terjadi kesalahan saat mendaftar.");
    });
});

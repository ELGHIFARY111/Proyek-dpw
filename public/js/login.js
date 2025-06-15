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
        alert("Login sukses!");
        localStorage.setItem("loggedInUser", JSON.stringify(result.user));

        // Redirect berdasarkan role
        if (result.user.role === "admin") {
            window.location.href = "/";
        } else {
            window.location.href = "/";
        }
        } else {
        alert(result.error);
    }
    } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat login.");
    }
});

window.onload = function () {
    const form = document.getElementById('login');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            alert('Login Sukses!!');
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            form.reset();
            window.location.href = "/";
        } else {
            alert('Email atau password salah!');
        }
    });
};

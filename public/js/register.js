const users = JSON.parse(localStorage.getItem('users')) || [];
const form = document.getElementById('register');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const confirmPassword = document.getElementById('pass-ulang').value;

    if (password !== confirmPassword) {
        alert('Password tidak cocok!');
        return;
    }

    const newUser = {
        username,
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    form.reset();
    alert('Registrasi berhasil!');
    console.log('Users:', users);
});
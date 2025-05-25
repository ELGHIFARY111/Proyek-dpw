// window.onload = function () {
//     const form = document.getElementById('forgot-password');

//     form.addEventListener('submit', function (event) {
//     event.preventDefault();

//     const email = document.getElementById('email').value.trim();
//     const newPassword = document.getElementById('new').value.trim();

//     let users = JSON.parse(localStorage.getItem('users')) || [];

//     const userIndex = users.findIndex(user => user.email === email);

//     if (userIndex !== -1) {
//         users[userIndex].password = newPassword;
//         localStorage.setItem('users', JSON.stringify(users));
//         alert('Password berhasil diubah!');
//         form.reset();
//     } else {
//         alert('Email tidak ditemukan!');
//     }
//     });
// };
window.onload = function () {
    const form = document.getElementById('forgot-password');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const newPassword = document.getElementById('new').value.trim();

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userIndex = users.findIndex(user => user.email === email);

        if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Password berhasil diubah!');
        form.reset();
        } else {
        alert('Email tidak ditemukan!');
        }
    });
    };
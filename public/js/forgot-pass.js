window.onload = function () {
  const form = document.getElementById('forgot-password');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const newPassword = document.getElementById('new').value.trim();

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword })
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        form.reset();
        window.location.href = '/login';
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan!');
      console.error(error);
    }
  });
};
fetch("./game.json")
  .then((ress) => ress.json())
  .then((data) => {
    data.game.forEach((game) => {
      console.log(`Id Unik: ${game.id}`);
      console.log(`Nama Game: ${game.nama}`);
      console.log(`Developer: ${game.dev}`);
      console.log(game.deskripsi);
      console.log(game.tutor);
      console.log(`Direktori Gambar: ${game.gambar.logo}`);
      console.log(`Direktori Gambar: ${game.gambar.background}`);
      game.input.inputan.forEach((input) => {
        console.log(`Jumlah inputan: ${game.input.jumlah_input}`);
        console.log(`Input yang diperlukan: ${input.label}`);
      });
      game.list_item.forEach((items) => {
        console.log(`Item: ${items.nama_item}`);
        console.log(`Harga: ${items.harga}`);
      });
      game.payment_method.forEach((pay) => {
        console.log(`Metode Pembayaran: ${pay}`);
      });
    });
  });

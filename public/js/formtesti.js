document.getElementById("submitReview").addEventListener("click", function(){
    let namagame = document.getElementById("namagame").value.trim();
    let rating = parseInt(document.getElementById("rating").value);
    let ulasan = document.getElementById("reviewtext").value.trim();

    if (namagame === "") {
        alert("Nama game tidak boleh kosong!");
        return;
    }

    if (rating === "") {
        alert("Silakan pilih rating!");
        return;
    }

    if (ulasan === "") {
        alert("Ulasan tidak boleh kosong!");
        return;
    }

    // ini untuk mengambil waktu
    let waktuSubmit = new Date(); 
    let jam = waktuSubmit.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let tanggal = waktuSubmit.toLocaleDateString("id-ID"); 
    
    const data = {
        id: namagame.toLowerCase(),
        rating: rating,
        comment: ulasan,
        time: {
            hour: jam,
            date: tanggal
        },
        product: "1x qty " + namagame + " 70 Diamond" 
    };
    console.log("data yang dikirim",data);

    fetch("/simpan-testimonial",{
        method: "POST",
        headers:{
            "Content-type":"application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((msg) => {
        console.log("Respon dari server",msg);
        alert("Ulasan berhasil dikirim");
        window.location.href ="/HALAMAN-UTAMA" //diarahkan kemana
    })
})
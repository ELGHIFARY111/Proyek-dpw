function fetchTestimonial() {
    fetch("/api/testimonial.json") // Ambil data JSON
        .then(response => response.json()) // Parsing JSON
        .then(data => {
            let htmlContent = "";

            data.forEach(testi => {
                htmlContent += `
                <div class="testimonial">
                    <div class="testimonial-header">
                        <h3>${testi.id}</h3> 
                        <div class="rating">${"★".repeat(testi.rating)}</div>
                    </div>
                    <hr>
                    <blockquote>“${testi.comment}”</blockquote> 
                    <hr>
                    <div class="purchase-container">
                        <p class="purchase">${testi.product}</p> 
                        <p class="date">${testi.time.date} ${testi.time.hour}</p> 
                        <button onclick="hapusTestimonial('${testi.id}')">Hapus</button>
                    </div>
                    </div>`;
            });

            document.getElementById("testimonial-container").innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Terjadi kesalahan saat mengambil data:", error);
        });
}

fetchTestimonial();

function hapusTestimonial(id) {
    // Contoh: Hapus testimonial berdasarkan id
    // Implementasikan logika penghapusan data sesuai kebutuhan
    alert(`Testimonial dengan ID ${id} akan dihapus (fungsi belum terimplementasi).`);
}


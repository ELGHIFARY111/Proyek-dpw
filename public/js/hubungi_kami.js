// ini kategori untuk perusahaan dan individu 
function toggleinput() {
    let selectElement = document.getElementById("kategori");
    let labelrow = document.getElementById("kategoriform");
    let inputrow = document.getElementById("kategoriform_input")

    if (selectElement.value === "perusahaan") {
        labelrow.style.display = "table-row"; // Pastikan tampil sebagai baris tabel
        inputrow.style.display = "table-row";
    } else {
        labelrow.style.display = "none";
        inputrow.style.display = "none"; // Sembunyikan jika tidak perlu
    }
}

function tipetoggle(){
    let selectElement = document.getElementById("tipe");
    let labelrow = document.getElementById("transaksiform");
    let inputrow = document.getElementById("transaksiform_input");
    // refund
    let labelnotransrow = document.getElementById("notransform");
    let inputnotransrow = document.getElementById("notransform_input")
    let labelbuktirow = document.getElementById("buktiform");
    let inputbuktirow = document.getElementById("buktiform_input")

    if (selectElement.value === "masalah_transaksi") {
        labelrow.style.display = inputrow.style.display = "table-row";
    } else {
        labelrow.style.display = inputrow.style.display = "none";
    }

    if (selectElement.value === "refund") {
        labelnotransrow.style.display = inputnotransrow.style.display = labelbuktirow.style.display = inputbuktirow.style.display = "table-row";
    } else {
        labelnotransrow.style.display = inputnotransrow.style.display = labelbuktirow.style.display = inputbuktirow.style.display =  "none";
    }
}

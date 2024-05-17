$(document).ready(function () {
  // Inisialisasi variabel
  let isAnimating = false; // Menyimpan status animasi
  let shapes = []; // Menyimpan daftar bentuk yang telah ditambahkan
  let containerWidth = $(".shapeContainer").width(); // Mengambil lebar kontainer bentuk
  let currentX = 0; // Posisi X saat ini untuk menambahkan bentuk baru
  let currentY = 0; // Posisi Y saat ini untuk menambahkan bentuk baru
  let margin = 30; // Margin antar bentuk

  // Fungsi untuk menambahkan bentuk baru
  function addShape() {
    if (isAnimating) return; // Jika sedang animasi, hentikan fungsi
    isAnimating = true; // Set status animasi menjadi true

    // Mengambil nilai dari input pengguna
    let shapeType = $("#shapeType").val(); // Tipe bentuk
    let shapeColor = $("#shapeColor").val(); // Warna bentuk
    let shapeSize = parseInt($("#shapeSize").val()) || 50; // Ukuran bentuk, default adalah 50px

    // Membuat elemen HTML baru untuk bentuk
    let newShape = $("<div></div>")
      .addClass("shape")
      .addClass(shapeType)
      .css({
        width: shapeSize + "px",
        height: shapeSize + "px",
        "background-color": shapeColor,
      });

    // Menghitung tinggi total setelah menambahkan bentuk baru
    let totalHeight = currentY + shapeSize + margin;
    if (totalHeight > $(".shapeContainer").height()) {
      $(".shapeContainer").height(totalHeight); // Atur ulang tinggi kontainer jika perlu
    }

    // Cek jika bentuk baru melebihi lebar kontainer
    if (currentX + shapeSize + margin > containerWidth) {
      currentX = 0; // Reset posisi X ke 0
      currentY += shapeSize + margin; // Tambahkan posisi Y
    }

    // Atur posisi bentuk baru
    newShape.css({ top: currentY, left: currentX });

    // Tambahkan bentuk baru ke kontainer dan animasikan dari kiri ke posisi X
    $(".shapeContainer").append(newShape);
    newShape.css({ left: "-100px" }).animate({ left: currentX }, 500, function () {
      isAnimating = false; // Set status animasi menjadi false setelah animasi selesai
    });

    // Simpan bentuk baru ke array shapes
    shapes.push(newShape);

    // Perbarui posisi X untuk bentuk berikutnya
    currentX += shapeSize + margin;
  }

  // Fungsi untuk menghapus bentuk terakhir
  function removeShape() {
    if (isAnimating || shapes.length === 0) return; // Jika sedang animasi atau tidak ada bentuk, hentikan fungsi
    isAnimating = true; // Set status animasi menjadi true

    // Ambil dan hapus bentuk terakhir dari array
    let lastShape = shapes.pop();
    lastShape.fadeOut(500, function () {
      $(this).remove(); // Hapus elemen dari DOM
      isAnimating = false; // Set status animasi menjadi false

      // Perbarui posisi X dan Y setelah bentuk dihapus
      if (shapes.length > 0) {
        let prevShape = shapes[shapes.length - 1];
        currentX = prevShape.position().left + prevShape.width() + margin;
        currentY = prevShape.position().top;
      } else {
        currentX = 0;
        currentY = 0;
      }
    });
  }
  
  // Event listener untuk tombol tambah dan hapus bentuk
  $("#addShape").on("click", addShape);
  $("#removeShape").on("click", removeShape);

});

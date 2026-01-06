// --- Bagian 1: Upload & Ganti Foto ---
const upload = document.getElementById("uploadWaifu");
const waifuImg = document.getElementById("waifuImg");

upload.addEventListener("change", () => {
  const file = upload.files[0];
  if (!file) return;

  // Tambahan Kedua: Validasi Ukuran File (Maksimal 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert("Maksimal 2MB njir");
    upload.value = ""; // Reset input file agar tidak error jika submit ulang
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    waifuImg.src = reader.result;
  };

  reader.readAsDataURL(file);
});


// --- Bagian 2: Logika Max 2 Toggle ---
const toggles = document.querySelectorAll(".toggle");
let activeOrder = [];

toggles.forEach((toggle, index) => {
  toggle.addEventListener("change", () => {

    if (toggle.checked) {
      // Masukkan index ke urutan aktif
      activeOrder.push(index);

      // Jika lebih dari 2 yang aktif, matikan yang pertama kali dinyalakan (FIFO)
      if (activeOrder.length > 2) {
        const removed = activeOrder.shift();
        toggles[removed].checked = false;
      }

    } else {
      // Jika toggle dimatikan secara manual, hapus dari list antrean
      activeOrder = activeOrder.filter(i => i !== index);
    }

  });
});

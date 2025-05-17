class AboutView {
  constructor() {
    this.container = document.querySelector("#main-content")
  }

  render() {
    return `
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container">
        <h1 class="page-title">About Dicoding Submission</h1>
        
        <div class="about-content">
          <p>
            Dalam mengerjakan proyek ini, ada beberapa kriteria yang perlu Anda penuhi. Kriteria-kriteria ini diperlukan agar Anda dapat lulus dari tugas ini.
            <span>Berikut adalah daftar kriteria utama yang harus Anda penuhi.</span>
          </p>
          
          <h2>Kriteria Wajib 1: Memanfaatkan Satu API sebagai Sumber Data</h2>
          <p>
            Anda WAJIB mengambil satu API sebagai sumber datanya. Pemilihan ini juga akan menentukan topik aplikasi yang akan Anda kembangkan. Oleh karena itu, silakan manfaatkan API yang telah kami sediakan. <a href="https://story-api.dicoding.dev/v1/">Story API Documentation</a>
          </p>
          
          <h2>Kriteria Wajib 2: Menggunakan Arsitektur Single-Page Application</h2>
          <p>
            Aplikasi yang Anda buat harus mengadopsi arsitektur Single-Page Application (SPA) seperti yang kami contohkan pada proyek latihan. Berikut adalah ketentuan yang WAJIB diterapkan.
          </p>
          <ul>
            <li>Menggunakan teknik hash (#) dalam menangani routing di browser.</li>
            <li>Menerapkan pola model-view-presenter (MVP) dalam pengelolaan data ke user interface.</li>
          </ul>

          <h2>Kriteria Wajib 3: Menampilkan Data</h2>
          <p>
            Aplikasi memiliki halaman yang menampilkan data dari API. Berikut adalah beberapa ketentuan yang WAJIB diterapkan.
          </p>
          <ul>
            <li>Data ditampilkan dalam bentuk daftar dan bersumber dari API pilihan Anda.</li>
            <li>Pada setiap item daftarnya, tampilkan minimal satu data gambar dan tiga data teks.</li>
            <li>Tambahkan peta digital untuk menunjukkan lokasi data.</li>
            <li>Pastikan peta memiliki marker dan menampilkan popup saat diklik.</li>
          </ul>
          <p>Hal yang perlu dicatat adalah SERTAKAN API key dari map service yang digunakan dalam STUDENT.txt jika memang aplikasi Anda membutuhkannya. Bila tidak memiliki berkas tersebut, silakan buat baru dalam root project, ya.</p>

          <h2>Kriteria Wajib 4:Memiliki Fitur Tambah Data Baru</h2>
          <p>Selain menampilkan data ke halaman, aplikasi WAJIB punya kemampuan menambahkan data baru ke API. Tentunya, ini berpotensi membutuhkan halaman baru untuk menampilkan formulir. Pastikan halaman tersebut berisi kolom-kolom input yang dibutuhkan untuk mendapatkan data dari user.</p>
          <p>Meskipun masing-masing API memiliki kebutuhan yang berbeda, ada kemiripan data. Berikut adalah beberapa ketentuan WAJIBNYA.</p>

          <ul>
            <li>Mengambil data gambar dengan kamera. Pastikan stream yang dibuat telah nonaktif jika tidak diperlukan lagi.</li>
            <li>Gunakan peta digital dan event klik untuk mengambil data latitude dan longitude. Anda diperkenankan memanfaatkan library apa pun selain yang diajarkan di kelas.</li>
          </ul>

          <h2>Kriteria Wajib 5: Menerapkan Aksesibilitas sesuai dengan Standar</h2>
          <p>
           Ada beberapa aspek dalam meningkatkan aksesibilitas aplikasi. Perhatikan ketentuan-ketentuan WAJIBNYA.
          </p>

          <ul>
            <li>Menerapkan skip to content.</li>
            <li>Memiliki teks alternatif pada konten-konten gambar yang esensial.</li>
            <li>Pastikan setiap form control, seperti input, berasosiasi dengan label agar mudah diakses.</li>
            <li>Menggunakan semantic element dalam menyusun struktur halaman dan landmarking HTML.</li>
          </ul>

          <h2>Kriteria Wajib 6: Merancang Transisi Halaman yang Halus</h2>
          <p>
            Untuk pengalaman pengguna yang makin baik, aplikasi Anda WAJIB mengimplementasikan gaya transisi halaman secara halus menggunakan View Transition API.
          </p>
        </div>
      </section>
    `
  }

  applyViewTransition() {
    document.documentElement.classList.add("view-transition")
  }
}

export default AboutView

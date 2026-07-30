const fs = require('fs');

const remKeys = {
  "academyx": {
    "paramEyebrow": "Parameter Kimpalan",
    "paramTitle": "Kimpalan soket: nilai panduan.",
    "paramLead": "Masa pemanasan, masa pertukaran, dan masa penyejukan untuk kimpalan soket mengikut DVS 2207-11 (elemen pemanasan 250–270 °C), yang menjadi asas praktikal ditunjukkan di dalam video.",
    "paramHead": [
      "d (mm)",
      "Kedalaman kimpalan (mm)",
      "Pemanasan (s)",
      "Pertukaran maks. (s)",
      "Penyejukan (min)"
    ],
    "paramNote": "Nilai panduan mengikut DVS 2207-11 untuk PP pada suhu elemen pemanasan 250–270 °C. Spesifikasi dari pengeluar peranti kimpalan dan arahan pemprosesan adalah mengikat. Jika terdapat sebarang keraguan, sila rujuk video dan semak parameter yang tertera pada peranti.",
    "stepEyebrow": "Langkah Demi Langkah",
    "stepTitle": "Empat kaedah, satu standard kualiti.",
    "stepLead": "Setiap prosedur mempunyai julat ukuran dimensinya sendiri dan lima langkah yang menentukan kualiti sambungan.",
    "procTabs": [
      "Soket (Manual)",
      "Soket (Mesin)",
      "Kimpalan Elektro",
      "Kimpalan Punggung"
    ],
    "procs": [
      {
        "t": "Kimpalan soket secara manual: sehingga d63",
        "steps": [
          {
            "t": "Potong & buang serpihan",
            "d": "Potong paip pada sudut yang tepat, buang serpihan bergerigi, bucu tajam dan chamfer dengan kemas. Gunakan pemotong paip daripada rangkaian alat keluaran K-Aqua."
          },
          {
            "t": "Tandakan kedalaman kimpalan",
            "d": "Tandakan kedalaman pemasukan pada paip mengikut jadual (cth. 14 mm untuk d20): ini menentukan zon penyambungan."
          },
          {
            "t": "Pemanasan serentak",
            "d": "Paip dimasukkan ke dalam soket pemanasan, pemasangan lekapan pada mandrel pemanasan. Tolak kedua-duanya secara serentak dan pastikan masa pemanasan dikekalkan dengan tepat."
          },
          {
            "t": "Sambung segera, tanpa pusingan",
            "d": "Sambung secara paksi dalam masa pertukaran. Jangan sekali-kali putar: putaran akan merosakkan struktur pemplastikan."
          },
          {
            "t": "Penetapan (Fixation) & penyejukan",
            "d": "Tetapkan sambungan selama beberapa saat, kemudian tunggu masa penyejukan berlalu dengan sempurna sebelum menggunakan beban mekanikal."
          }
        ]
      },
      {
        "t": "Kimpalan soket menggunakan mesin: ukuran dimensi sederhana",
        "steps": [
          {
            "t": "Persediaan sama seperti kimpalan manual",
            "d": "Memotong, membuang serpihan, dan menanda kedalaman kimpalan. Aturan asas kekal sama."
          },
          {
            "t": "Kepit paip & pemasangan lekapan",
            "d": "Mesin memegang paip dan pemasangan lekapan secara sepaksi. Kesilapan akibat tersasar dari sudut penyambungan dapat dielakkan secara mekanikal."
          },
          {
            "t": "Pemanasan dengan elemen pemanasan",
            "d": "Soket dan mandrel pemanasan mengikut nilai panduan DVS; mesin mengekalkan kedudukan dan masa secara konsisten dan boleh diulang dengan tepat."
          },
          {
            "t": "Penyambungan menggunakan mesin",
            "d": "Penyuapan menggabungkan secara paksi dan sekata, ini menjadi kunci kepada kualiti yang konsisten, terutamanya untuk ukuran d75 hingga d125."
          },
          {
            "t": "Penyejukan di bawah penetapan (Fixation)",
            "d": "Keluarkan dari kepitan dan teruskan kerja penyambungan hanya selepas masa penyejukan telah berlalu dengan sempurna."
          }
        ]
      },
      {
        "t": "Kimpalan Elektro (Electrofusion): Pemasangan gegelung pemanas",
        "steps": [
          {
            "t": "Kupas permukaan",
            "d": "Kupas dan bersihkan permukaan paip di zon penyambungan. Lapisan oksida dan kotoran akan menghalang proses kimpalan yang sempurna."
          },
          {
            "t": "Tanda kedalaman pemasukan",
            "d": "Tandakan kedalaman pada paip, tolak paip ke dalam pemasangan lekapan sehingga ia berhenti sepenuhnya."
          },
          {
            "t": "Tetapkan tanpa tekanan (stress-free)",
            "d": "Gunakan pengapit penahan: pemasangan lekapan tidak boleh berada di bawah tekanan lenturan sewaktu kimpalan sedang dijalankan."
          },
          {
            "t": "Mulakan proses kimpalan",
            "d": "Peranti menyalurkan tenaga ke gegelung pemanas yang tertanam dalam pemasangan lekapan. Parameter akan dibaca dari pemasangan lekapan dan tidak bergantung kepada anggaran."
          },
          {
            "t": "Patuhi masa penyejukan",
            "d": "Jangan gerakkan atau kenakan beban sehingga masa penyejukan yang ditetapkan telah berlalu dengan sempurna. Periksa penunjuk kawalan pada pemasangan lekapan."
          }
        ]
      },
      {
        "t": "Kimpalan Punggung (Butt Fusion): Ukuran dimensi besar sehingga d630",
        "steps": [
          {
            "t": "Ratakan bahagian hujung (planing)",
            "d": "Ratakan kedua-dua hujung paip di dalam mesin sehingga serpihan berterusan terhasil: keselarasan rata adalah satu kemestian."
          },
          {
            "t": "Selaraskan (alignment) & periksa ralat sasaran",
            "d": "Ralat sasaran maksimum adalah 10% daripada ketebalan dinding. Bagi d630, setiap milimeter dikira."
          },
          {
            "t": "Pemanasan dengan elemen pemanasan",
            "d": "Selaraskan di bawah tekanan sehingga lekuk kimpalan terbentuk, kemudian panaskan dengan sempurna tanpa tekanan. Masa mengikut jadual yang ditetapkan oleh panduan DVS 2207-11."
          },
          {
            "t": "Pertukaran & penyambungan",
            "d": "Tarik keluar elemen pemanasan dengan cepat dan gerakkan hujung paip bersama-sama di bawah tekanan penyambungan yang ditetapkan."
          },
          {
            "t": "Penyejukan di bawah tekanan penyambungan",
            "d": "Tekanan penyambungan dikekalkan sehingga akhir masa penyejukan yang ditetapkan, yang akan menghasilkan sambungan berterusan yang kukuh dan padat untuk jangka masa panjang."
          }
        ]
      }
    ],
    "errEyebrow": "Kajian Kerosakan & Kesilapan (Error study)",
    "errTitle": "Enam kesilapan paling menelan belanja dan langkah-langkah pencegahannya.",
    "errHead": [
      "Kesilapan",
      "Kesan akibat",
      "Pencegahan"
    ],
    "errRows": [
      [
        "Pemanasan terlalu lama",
        "Bead tumbuh/merapat ke dalam, keratan rentas menjadi sempit",
        "Periksa masa pemanasan mengikut jadual, jangan bergantung kepada anggaran semata-mata"
      ],
      [
        "Putaran ketika penyambungan",
        "Struktur pemplastikan hancur, sambungan bocor",
        "Hanya sambung secara paksi (axial), gunakan tanda (marking) sebagai rujukan kawalan"
      ],
      [
        "Gagal membuang serpihan / Chamfering",
        "Bahan menolak ke atas, zon penyambungan menjadi tidak sekata",
        "Buang serpihan setiap potongan: gunakan alatan perkakasan rasmi dari K-Aqua"
      ],
      [
        "Elemen pemanasan yang kotor",
        "Kotoran terbakar dan terbenam ke dalam jahitan paip (seam)",
        "Bersihkan permukaan pemanasan menggunakan kain bebas habuk sebelum melakukan proses kimpalan"
      ],
      [
        "Penggunaan beban terlalu awal",
        "Jahitan paip (seam) berubah bentuk sebelum proses penyejukan",
        "Patuhi masa penyejukan yang ditetapkan: untuk d110 ia mengambil masa sekitar 8 minit"
      ],
      [
        "Kedalaman kimpalan yang salah",
        "Terlalu pendek: ruang sambungan kecil · terlalu dalam: keratan rentas menjadi sempit",
        "Sentiasa tandakan kedalaman pemasukan, jangan sesekali mengagak kedalamannya"
      ]
    ],
    "glossEyebrow": "Glosari",
    "glossTitle": "Istilah teknologi paip.",
    "gloss": [
      [
        "SDR",
        "Nisbah Dimensi Standard = Diameter luar dibahagikan dengan ketebalan dinding (d/s). SDR yang kecil = dinding lebih tebal = tekanan nominal lebih tinggi."
      ],
      [
        "PN",
        "Tekanan nominal dalam bar pada suhu 20 °C merentasi ufuk reka bentuk: SDR 6 bersamaan dengan PN 20, SDR 17 bersamaan dengan PN 6."
      ],
      [
        "d / di / s",
        "Diameter luar / Diameter dalaman / Ketebalan dinding dalam unit ukuran milimeter (mm). di = d − 2s."
      ],
      [
        "PP-R",
        "Kopolimer Rawak Polipropilena (Polypropylene Random Copolymer): material bersesuaian dengan standard untuk pemasangan air minuman."
      ],
      [
        "PPRCT",
        "PP-R dengan struktur kristal terubah suai (\"Suhu Penghabluran\"): menahan suhu dan daya rintangan tekanan yang melampau dengan ketebalan dinding yang sama."
      ],
      [
        "K-Fiber / GF",
        "Struktur pelbagai lapisan diperkukuh gentian kaca (Glass-fibre): mengurangkan pengembangan terma kepada lebih kurang suku."
      ],
      [
        "Kimpalan soket (Socket Fusion)",
        "Kimpalan soket (Socket Fusion): Paip dan pemasangan lekapan di-plastik-kan menggunakan soket dan mandrel pemanasan dan kemudian dicantumkan bersama-sama."
      ],
      [
        "Kimpalan Elektro (Electrofusion)",
        "Kimpalan elektro (Electrofusion): Gegelung pemanas yang terbenam dalam pemasangan lekapan menjana suhu pemanasan melalui kawalan parameter."
      ],
      [
        "Kimpalan Punggung (Butt Fusion)",
        "Kimpalan Punggung (Butt fusion): Hujung paip selari-rata dipanaskan pada elemen pemanasan dan disambungkan di bawah rintangan tekanan, kaedah standard (sehingga d630)."
      ],
      [
        "DVS 2207-11",
        "Arahan/Peraturan yang mengawal selia proses kimpalan paip Polipropilena: Sumber rasmi yang menterjemahkan nilai panduan di halaman ini."
      ]
    ]
  },
  "servicex": {
    "libEyebrow": "Perpustakaan Dokumen",
    "libTitle": "Semua dokumen di bawah satu gambaran keseluruhan.",
    "libLead": "Tiga katalog boleh dimuat turun terus, sijil disediakan dalam dua bahasa, dan dokumen audit boleh dilayari secara layan diri di Pusat Amanah (Trust Center).",
    "libHead": [
      "Dokumen",
      "Kandungan",
      "Bahasa",
      "Akses"
    ],
    "libRows": [
      {
        "t": "Program Produk K-Aqua",
        "s": "Katalog penuh: Dimensi ukuran, artikel produk, gambaran keseluruhan sistem",
        "lang": "EN",
        "href": "/pdf/k-aqua-product-range-en.pdf"
      },
      {
        "t": "Ciri-ciri Produk K-Aqua",
        "s": "Ciri teknikal dan data spesifikasi material",
        "lang": "EN",
        "href": "/pdf/k-aqua-product-features-en.pdf"
      },
      {
        "t": "Jaminan Kualiti K-Aqua",
        "s": "Prosedur pengujian dan piawaian kualiti",
        "lang": "EN",
        "href": "/pdf/k-aqua-quality-assurance-en.pdf"
      },
      {
        "t": "Sijil ISO (Bahasa Jerman)",
        "s": "ISO 9001 · 14001 · 50001, ditauliahkan oleh DAkkS",
        "lang": "DE",
        "href": "/pdf/kwt-iso-zertifikat-de.pdf"
      },
      {
        "t": "Sijil ISO (Bahasa Inggeris)",
        "s": "ISO 9001 · 14001 · 50001, DAkkS-accredited",
        "lang": "EN",
        "href": "/pdf/kwt-iso-certificates-en.pdf"
      },
      {
        "t": "Polisi & Penilaian Risiko GENAU",
        "s": "Sistem pengurusan, sistem pencegahan, sistem pengenalan bahaya",
        "lang": "DE/EN",
        "href": null
      },
      {
        "t": "Helaian Data EPD (Jenis III, EN 15804)",
        "s": "Data penilaian kitaran hayat untuk kegunaan LEED, BREEAM, DGNB",
        "lang": "DE/EN",
        "href": null
      },
      {
        "t": "Teks Tender GAEB",
        "s": "Teks siap sedia untuk spesifikasi perkhidmatan",
        "lang": "DE",
        "href": null
      },
      {
        "t": "Manual Jaminan Kualiti",
        "s": "Proses jaminan kualiti untuk semakan audit pembekal",
        "lang": "DE/EN",
        "href": null
      }
    ],
    "libOpen": "Muat turun",
    "libRequest": "Mohon dari Pusat Amanah (Trust Center)",
    "supEyebrow": "Saluran Sokongan",
    "supTitle": "Tiga cara untuk mendapatkan jawapan.",
    "supLead": "Bergantung pada permohonan yang dimajukan, salah satu saluran berikut mungkin memberikan jawapan paling cepat dalam masa satu hari bekerja.",
    "sup": [
      {
        "t": "Jualan & Projek",
        "d": "Tawaran/Sebut harga, syarat, masa penghantaran, dan perundingan projek. Atau, gunakan pertanyaan projek dalam lima langkah ringkas.",
        "c": "info@k-aqua.de · +49 (0)60 85 / 9868-410",
        "href": "mailto:info@k-aqua.de"
      },
      {
        "t": "Kualiti & Sokongan Teknikal",
        "d": "Soalan berkenaan bahan spesifikasi, perancangan dan proses, pengesahan pensijilan rasmi, aduan mengikut manual panduan Jaminan Kualiti.",
        "c": "support@k-aqua.de",
        "href": "mailto:support@k-aqua.de"
      },
      {
        "t": "Pemprosesan (Processing) & Akademi",
        "d": "Empat kaedah kimpalan dalam video serta jadual ukuran parameter: Taklimat orientasi khas dan arahan untuk kumpulan anda yang boleh diaturkan kelak.",
        "c": "Ke Akademi",
        "href": null
      }
    ],
    "faqEyebrow": "Soalan Lazim (FAQ) Perkhidmatan",
    "faqTitle": "Jawapan yang segera (Pantas).",
    "faq": [
      {
        "q": "Apakah jenis dokumen rasmi yang saya perlukan untuk tujuan perancangan projek?",
        "a": "Katalog penuh, data produk terperinci, dan bergantung pada projek, maklumat spesifik jadual ukuran dimensi tersedia di laman maklumat produk. Bagi sebut harga tender GAEB, teks bersama EPD juga disediakan di dalam Pusat Amanah (Trust Center)."
      },
      {
        "q": "Di manakah saya boleh menemui dan mendapatkan maklumat tentang ukuran nilai parameter kimpalan?",
        "a": "Perincian nilai garis panduan dari DVS 2207-11 ini boleh didapatkan di lembaran maklumat Academy kami, disertakan bersama arahan bergambar ringkas, langkah demi langkah serta panduan ralat. Arahan dari pengeluar peranti kimpalan adalah yang wajib dipatuhi berterusan (legally binding)."
      },
      {
        "q": "Bagaimanakah saya boleh memperoleh akses kepada sijil perakuan rasmi kualiti serta surat perincian penilaian dokumen pengauditan?",
        "a": "Sijil ISO (DE/EN) sedia dimuat turun terus. Dasar Kualiti K-Aqua, senarai kelengkapan data EPD/GAEB bersama lembaran manual QA Audit di Trust Center disatukan di dalam sistem pakej RFP: hanya melalui capaian pantas berbanding menunggu tanpa sebarang kepastian."
      },
      {
        "q": "Siapakah perlu dihubungi bagi pertanyaan terperinci teknikal bersabit permasalahan rumit?",
        "a": "Talian / hantaran e-mel kepada support@k-aqua.de. Sepasukan barisan urus niaga profesional kami bagi Kualiti & Sokongan Teknikal bersedia memberikan jawapan menyeluruh, seawal 1 hari bekerja untuk segala pertanyaan spesifikasi perincian, pengurusan dan perlakuan pemprosesan."
      },
      {
        "q": "Bagaimanakah saluran laluan terpendek untuk saya beroleh anggaran sebut harga terperinci?",
        "a": "Gunakan form Pertanyaan Projek: hanya 5 langkah singkat, tiada ikatan (non-binding), dan disertakan makluman peribadi daripada wakil Jualan seawal satu hari bekerja. Secara terus daripada pihak pengeluar, tanpa mana-mana agen perantara."
      },
      {
        "q": "Apakah sokongan kepelbagaian bahasa yang terangkum dalam manual dokumentasi rasmi anda?",
        "a": "Katalog terkini dalam Bahasa Inggeris, manakala pensijilan dalam edisi terjemahan dwi-bahasa (DE/EN). Laman web ini turut hadir dalam tiga bahasa (DE/EN/AR). Segala permohonan salinan tambahan boleh dimajukan melalui borang rasmi perhubungan Jualan."
      }
    ]
  },
  "aboutx": {
    "numEyebrow": "Angka rasmi dari Kilang",
    "numTitle": "Waldsolms dalam angka perangkaan prestasi.",
    "numLead": "Hessen Tengah (Central Hesse), Auweg 3: kawasan di mana KWT GmbH mereka bentuk dan mengeluarkan rangkaian produk K-Aqua sepenuhnya (in-house).",
    "nums": [
      {
        "n": "14.000",
        "u": "m",
        "l": "Penghasilan tiub/paip setiap hari dan tahap loji kemudahan penyemperitan: merangkumi keupayaan membekal kapasiti projek-projek berskala komprehensif."
      },
      {
        "n": "20–630",
        "u": "mm",
        "l": "Kapasiti diameter untuk paip ukuran besar, sehinggalah pemasangan profil spesifik setebal 315 mm."
      },
      {
        "n": "100",
        "u": "%",
        "l": "lebihan buangan sisa pengilangan diuruskan (re-integrated) semula melalui pusingan semula ke dalam peredaran pengilangan."
      },
      {
        "n": "3",
        "u": "× ISO",
        "l": "Kualiti, Persekitaran, Tenaga: Diakreditasi oleh DAkkS sejak Oktober 2025."
      }
    ],
    "prodEyebrow": "Pengeluaran",
    "prodTitle": "Empat stesen, satu komitmen kualiti.",
    "prodLead": "Dari butiran mentah sehinggalah terhasilnya paip yang lengkap bertanda: Inilah perjalanan penghasilan setiap produk.",
    "prod": [
      {
        "t": "Penyemperitan (Extrusion)",
        "d": "Paip lapisan tunggal dan berbilang lapisan diperkuat gentian kaca dihasilkan di kemudahan penyemperitan dengan kapasiti harian sehingga 14,000 meter bagi setiap loji."
      },
      {
        "t": "Pengacuan Suntikan (Injection Moulding)",
        "d": "Pemasangan lekapan dari d20 hingga d315 dihasilkan melalui pengacuan suntikan: geometri kompleks dalam kuantiti besar dengan kualiti seragam."
      },
      {
        "t": "Sistem Kitaran Penyejukan Tertutup",
        "d": "Air pemprosesan di fasiliti pengeluaran beredar dalam kitaran tertutup: perlindungan alam sekitar sebagai komitmen sistem, dipantau mengikut piawaian ISO 14001."
      },
      {
        "t": "Penandaan & Pengujian",
        "d": "Setiap paip ditanda secara berterusan semasa proses penyemperitan dan diuji mengikut panduan manual Jaminan Kualiti: kebolehkesanan bagi setiap kelompok siri barangan."
      }
    ],
    "houseEyebrow": "Sistem 'House of KWT'",
    "houseTitle": "Empat Kelebihan Manfaat, Satu Bumbung Bersama.",
    "houseLead": "Dasar syarikat KWT GmbH menggabungkan penglibatan nilai sebagai satu rantaian berterusan: tidak wujud salah satu kelebihan tanpa menyertakan ketiga-tiga elemen yang lain.",
    "house": [
      {
        "t": "Kelebihan/Manfaat Pelanggan",
        "d": "Tuntutan pelanggan sentiasa difahami dan direalisasikan, tanpa sesekali mengetepikan pematuhan kepada prinsip standard perundangan dan sosial."
      },
      {
        "t": "Kelebihan/Manfaat Pekerja",
        "d": "Latihan dan persekitaran kerja secara berterusan dikhususkan buat warga pekerja secara inklusif. Tiada kepuasan pelanggan dicapai tanpa kebajikan buat para pekerja."
      },
      {
        "t": "Kelebihan/Manfaat Korporat",
        "d": "Kualiti barangan sentiasa serasi mengikut kos dan ketetapan perancangan; satu jaminan kejayaan semasa dan sumber pelaburan bermakna bagi tempoh perancangan kewangan hadapan."
      },
      {
        "t": "Penyelarasan Komuniti & Alam Sekitar",
        "d": "Melindungi pelestarian sumber alam menjadi teras kefahaman jaminan nilai sistem pengurusan bersepadu (GENAU-System)."
      }
    ],
    "mileEyebrow": "Pencapaian Bermakna (Milestones)",
    "mileTitle": "Jejak Perjalanan Sehingga Ke Hari Ini.",
    "miles": [
      {
        "y": "Berdekad",
        "t": "Pengalaman Pembuatan",
        "d": "Pemprosesan plastik untuk sistem bekalan air: Pengalaman yang terus diamalkan secara konsisten pada setiap pengeluaran."
      },
      {
        "y": "Perkongsian",
        "t": "Hubungan Rapat dengan KESSEL",
        "d": "Kami bersama-sama bersinergi dan berkongsi nilai wawasan bersama pengeluar premium, \"Peneraju Dalam Saliran (Leading in Drainage)\"."
      },
      {
        "y": "GENAU",
        "t": "Sistem Pengurusan House of KWT",
        "d": "Pelan kesihatan/keselamatan pekerjaan, persekitaran serta pengurusan tenaga diamalkan dalam rutin setiap hari pekerja, dan bukan setakat dokumen pengauditan."
      },
      {
        "y": "10/2025",
        "t": "Sijil Perakuan Triple-ISO",
        "d": "Menepati piawaian ISO 9001, 14001, dan 50001 dalam satu langkah berpusat: ditauliahkan melalui DAkkS, disahkan sehinggalah bulan 10/2028."
      },
      {
        "y": "2026",
        "t": "Platform Digital",
        "d": "Pencari produk (Product Finder), kalkulator jejak-karbon, Pusat Amanah (Trust Center), dan Akademi menjadikan laman web ini sangat komprehensif sebagai satu pusat rujukan maklumat alat kerja (toolbox)."
      }
    ]
  },
  "newsx": {
    "moreEyebrow": "Dari Pihak Kilang dan Kepakaran",
    "moreTitle": "Teroka lebih banyak dari pihak K-Aqua.",
    "moreLead": "Kemas kini berterusan berserta maklumat lanjut tentang pengilangan barangan dan aspek keupayaan sistem rantaian struktur nilai bahan material produk.",
    "readMore": "Baca penerbitan artikel perunding K-Aqua sepenuhnya",
    "readLess": "Tutup ruang bacaan",
    "posts": [
      {
        "date": "Oktober 2025",
        "tag": "Syarikat",
        "t": "Diuji tiga kali ganda: ISO 9001, 14001 dan 50001",
        "teaser": "Sistem pengurusan ISO KWT GmbH kini merangkumi Kualiti, Alam Sekitar, serta Tenaga: ditauliahkan oleh akreditasi DAkkS.",
        "body": [
          "Mulai Oktober 2025, kerangka pengurusan KWT GmbH telah melepasi penilaian untuk ketiga-tiga pengkelasan ISO: ISO 9001:2015 (Kualiti), ISO 14001:2015 (Alam Sekitar), dan ISO 50001:2018 (Tenaga). Pensijilan ini ditauliahkan oleh DAkkS dan disahkan sepenuhnya sehingga Oktober 2028.",
          "Bagi aspek perolehan (procurement) dan kepatuhan (compliance), ini membawa nilai proses pengauditan yang sentiasa diselia dan dijejaki terus bermula pengeluaran loji penyemperitan sehingga siap dihantar. Dasar kelengkapan seliaan GENAU sememangnya telah menepati tahap keperluan spesifikasi operasi ISO sebelum ini. Kini proses pembuatan dipantau dan dibuktikan sentiasa utuh melalui pemerhatian luaran (externally validated).",
          "Salinan pensijilan (terjemahan DE/EN) sedia dimuat turun. Laporan dokumen penuh bungkusan pengauditan lengkap sentiasa tersedia dan boleh dipohon di halaman Trust Center kami."
        ]
      },
      {
        "date": "2018",
        "tag": "Pengeluaran",
        "t": "Penandaan berterusan: Tahap Kebolehkesanan bermula di Penyemperit",
        "teaser": "Setiap produk paip berdaftar keluaran K-Aqua sentiasa tertera cap siri turutan secara berterusan (continuous marking) melalui sistem peranti loji penyemperitan.",
        "body": [
          "Dengan kapasiti pengeluaran yang mencatat nilai unjuran maksima mencapai 14,000 meter paip sehari, kebolehkesanan (traceability) pengeluaran paip-paip itu tidak diragui: Setiap satu paip dihasilkan akan tercatit turutan jejak daftar yang diperlukan oleh kumpulan pasukan pemproses dan juga perancang di tapak perancangan (planning and auditing on site).",
          "Tahap jujukan tanda (marking code) ini mengikat satu jalinan pemprosesan kepada jejak barisan penomboran siri pengeluaran (production batch) di samping perincian laporan pengujian piawaian Kualiti. Rekod laporan siri jejak turutan tersebut membuktikan produk akhir paip dapat dikesan kesempurnaannya menerusi rujukan pengkalan maklumat sehingga peringkat laporan (QA test laboratory), selaras bersama manual kualiti rasmi."
        ]
      },
      {
        "date": "Wissen",
        "tag": "Material",
        "t": "Mengapakah PP-R digunakan?",
        "teaser": "Bermula daripada pembaziran sisa-sisa buangan cecair luapan (flared gas) bertukar menjadi paip talian peredaran (air): rantaian perincian bahan Polipropilena.",
        "body": [
          "Polypropylene dibentuk melalui komposisi gas-gas terbuang/meruap yang sering kali tiada utiliti kepenggunaan sebelum ini. Pendekatan material ini memulihara dan mengurangkan pencemaran sisa secara berterusan bermula peringkat pengeluaran awal (source-level reduction). Selaku komoditi pembuatan berpotensi yang cukup gah pada kategori pengilangan berasaskan bahan plastik berkualiti tinggi, bahan berasaskan polipropilena mempamerkan prestasi utuh dengan meminimumkan keterlibatan nilai kerosakan kesan kakisan akibat pelarut kimia perindustrian - (solvents, lyes, and acids). Ianya diyakini unggul merentasi ruang spesifikasi pembuatan di tahap proses penyuntikan (injection moulding).",
          "Faktor kesempurnaan peredaran air dalam saluran sentiasa mengukur ketahanan permukaan sistem bahagian dalamnya (surface profile): nilai paras ukuran tekstur kerataannya sedalam 0.007 mm kekal menterjemahkan halangan susut-nilai tekanan, selain menjauhkan kesan resapan serapan bakteria (bio-film & incrustation). Turut memantapkan rekod penilaian ketahanan produk, ciri perintang penyerap pindahan suhunya pula yang merudum di titik kelajuan kadar (0.24 W/(m·K)): Air panas sentiasa kekal bertahan tanpa memaksa pembaziran pemasangan penebat kos tenaga perlindungan sampingan berganda (no overcompensation required).",
          "Produk PPRCT dengan gabungan inovasi unik material secara keseluruhannya menzahirkan kualiti jaminan yang membanggakan (setting a new limit altogether): Nilai modifikasi formulasi kristal di antara celah gabungannya membawa lonjakan kapasiti bertahan nilai penyejukan kepanasan berpanjangan melebihi daya tekanan normal. Julat skala bacaan SDR 7.4 direkod mengesahkan produknya berupaya bertahan nilai pengoperasian tekanan di kedudukan paras suhu 70 °C (bertekanan beban aliran konsisten 10-bar) pada tempoh penggunaan sistem kerja jangka berterusan (prolonged regular capacity)."
        ]
      },
      {
        "date": "Wissen",
        "tag": "Material",
        "t": "Sambungan Loyang/Kuningan bertemu Polipropilena (Brass meets PP): Sambungan Transisi Pengubahsuaian Paip Lama",
        "teaser": "Kerja-kerja pengubahsuaian dan membaik pulih pasti menuntut sedikit perubahan kepada satu anjakan format transisi rantaian pemasangan: Penyambung khas yang bertaut bersama komponen benang loyang/kuningan (brass-threads) menjadi kunci utama transisi ke sistem baharu dengan efisien.",
        "body": [
          "Setiap operasi dan fasiliti perancangan sistem saliran tidak semuanya menelusuri garisan laluan serba lancar pada laluan paip pemasangan baharu, memandangkan sebahagian operasi penggantian barisan infrastruktur tembaga atau jaringan bergalvani ini lazim dipenuhi kelengkapan lama (legacy assets) yang tidak boleh dielakkan: Rantaian kelengkapan pelengkap tambahan gabungan bersama siri lekapan penyambung pateri peranti skru benang logam (embedment of internal or external brass thread) membawakan solusi transisi lengkap: benang berulir logam di pangkal sisi berfungsi mengikat kemas di samping sistem struktur lama/asal sedia ada (metallic fittings), seraya bahagian paip dari jenis rangkaian jujukan produk berasaskan material PP sedia dicantum rapi bersama paip paip sistem baru di bawah teknik lekapan pencantuman haba (bonded securely by socket welding).",
          "Pendekatan seumpamanya sememangnya merungkaikan kaedah pembaharuan utiliti struktur (secara spesifik atau ansuran satu-demi-satu / sectional phase replacements) tanpa wujud pembaziran utiliti sumber lain yang tidak berkeperluan: Jalinan pautan-pautan sendi barangan material paip usang digantikan, di mana risiko dan anasir pengkaratan sedia ada tidak sesekali terikut-ikut bercampur menyelinap pada unit utiliti pemasangan jajaran baharu. Unit siri pemasang peranti pautan mekanikal yang mudah tertanggal (screw linkages) memberi jalan yang memudahkan sebarang perancangan perombakan sekiranya sebahagian spesifikasi perlu diselenggara / dikemas-kini berperingkat (disconnect access/ease-of-dismantling), kebiasaannya menjadi keutamaan penyediaan komponen peranti kiraan air (meters), mahupun komponen pautan sistem peredaran saluran am."
        ]
      }
    ],
    "ishTitle": "Lokasi Pertemuan / Sesi Sembang Industri",
    "ishText": "Pakar pembuat keputusan / penggiat TGA secara berkala sentiasa berhimpun di ruang perjumpaan terkemuka, ISH Frankfurt, bersekali kolaborasi KESSEL yang hadir memberikan sokongan penuh komitmen pameran ini. Selaras tarikh kunjungan usahasama promosi wakil-wakil K-Aqua kelak, jadual rasmi temu-janji kunjungan ini akan disusun dan diumumkan secara terbuka tepat pada ruang pautan halaman pameran kami ini."
  }
};

fs.writeFileSync('rem_keys_ms.json', JSON.stringify(remKeys, null, 2));

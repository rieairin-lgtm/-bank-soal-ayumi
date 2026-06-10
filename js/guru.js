var H = ["A", "B", "C", "D"];
var LEVELS = ["N5", "N4", "N3", "N2", "N1"];
var KATEGORI = ["文字・語彙", "文法", "読解", "聴解"];
var KUNCI_LS = "bsa-soal-draf";
var soal = [];
var editId = null;
var formGambar = null;
var formOpsiGambar = [null, null, null, null];

function eh(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function el(id) { return document.getElementById(id); }
function toast(m) { var t = el("toast"); t.textContent = m; t.style.display = "block"; clearTimeout(t._x); t._x = setTimeout(function () { t.style.display = "none"; }, 2400); }
function simpanDraf() { try { localStorage.setItem(KUNCI_LS, JSON.stringify(soal)); } catch (e) { toast("Draf gagal disimpan di browser (mungkin gambar terlalu banyak)"); } }

function kompres(file, cb) {
  var r = new FileReader();
  r.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      var MAX = 700, w = img.width, h = img.height;
      if (w > MAX || h > MAX) { var sk = MAX / Math.max(w, h); w = Math.round(w * sk); h = Math.round(h * sk); }
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      cb(cv.toDataURL("image/jpeg", 0.72));
    };
    img.src = e.target.result;
  };
  r.readAsDataURL(file);
}

// Muat: draf di browser > soal.json yang dipublikasikan
(function init() {
  var draf = null;
  try { draf = localStorage.getItem(KUNCI_LS); } catch (e) {}
  if (draf) {
    try { soal = JSON.parse(draf); } catch (e) { soal = []; }
    render();
  } else {
    fetch("data/soal.json?v=" + Date.now())
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (d) { soal = d || []; render(); })
      .catch(function () { soal = []; render(); });
  }
})();

function selectHtml(id, daftar, terpilih) {
  var h = '<select id="' + id + '">';
  for (var i = 0; i < daftar.length; i++) h += "<option" + (daftar[i] === terpilih ? " selected" : "") + ">" + daftar[i] + "</option>";
  return h + "</select>";
}

function render() {
  el("subjudul").textContent = soal.length + " soal di draf";
  var f = ambilForm();
  var h = '<div class="card" style="background:#fff7fb">' +
    '<b style="color:#9d2f5e">Alur kerja:</b> <span class="muted">tambah/ubah soal di bawah → klik <b>💾 Unduh soal.json</b> → ganti file <code>data/soal.json</code> di repository GitHub → tunggu ±1 menit, soal baru tampil di halaman murid.</span></div>';

  // --- Form ---
  h += '<div class="card"><h3 style="margin-bottom:10px">' + (editId ? "Edit soal" : "Tambah soal baru") + "</h3>" +
    '<div class="row" style="margin-bottom:10px">' +
    "<div><label>Level</label>" + selectHtml("fLevel", LEVELS, f.level) + "</div>" +
    "<div><label>Kategori</label>" + selectHtml("fKat", KATEGORI, f.kategori) + "</div></div>" +
    "<label>Pertanyaan</label><textarea id=\"fTanya\" placeholder=\"例：あした　ともだち（　　）えいがを　みます。\">" + eh(f.pertanyaan) + "</textarea>" +
    '<div id="blokSkrip" style="margin-top:10px;display:' + (f.kategori === "聴解" ? "block" : "none") + '"><label>スクリプト / skrip audio (opsional, untuk 聴解)</label>' +
    '<textarea id="fSkrip" placeholder="Teks percakapan yang akan dibacakan">' + eh(f.skrip) + "</textarea></div>" +
    '<div style="margin-top:10px"><label>Gambar utama soal (opsional)</label><div id="blokGambar"></div></div>' +
    '<div style="margin-top:10px"><label>Pilihan jawaban — isi teks atau gambar; klik bulatan untuk kunci</label><div id="blokOpsi"></div></div>' +
    '<div style="margin-top:10px"><label>Penjelasan (opsional)</label><textarea id="fJelas" style="min-height:46px">' + eh(f.penjelasan) + "</textarea></div>" +
    '<div style="margin-top:12px;display:flex;gap:8px">' +
    '<button class="btn btn-pink" onclick="simpanSoal()">' + (editId ? "Simpan perubahan" : "Tambah soal") + "</button>" +
    (editId ? '<button class="btn btn-putih" onclick="batalEdit()">Batal</button>' : "") +
    "</div></div>";

  // --- Toolbar ---
  h += '<div class="card"><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
    '<button class="btn btn-pink" onclick="unduhJson()">💾 Unduh soal.json</button>' +
    '<label class="btn btn-putih" style="cursor:pointer">📥 Impor Excel/CSV<input type="file" accept=".xlsx,.xls,.csv" style="display:none" onchange="imporExcel(this)"></label>' +
    '<label class="btn btn-putih" style="cursor:pointer">📂 Muat soal.json<input type="file" accept=".json" style="display:none" onchange="muatJson(this)"></label>' +
    '<button class="btn btn-merah btn-kecil" onclick="kosongkan()">Kosongkan draf</button>' +
    "</div></div>";

  // --- Daftar ---
  if (!soal.length) {
    h += '<div class="card muted tengah">Belum ada soal. Tambahkan lewat formulir di atas atau impor dari Excel.</div>';
  } else {
    for (var i = 0; i < soal.length; i++) {
      var s = soal[i];
      h += '<div class="card"><div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:6px">' +
        '<div><span class="muted">#' + (i + 1) + '</span> <span class="lvl">' + s.level + '</span><span class="kat">' + s.kategori + "</span></div>" +
        '<div style="display:flex;gap:6px"><button class="btn btn-putih btn-kecil" onclick="mulaiEdit(' + i + ')">Edit</button>' +
        '<button class="btn btn-merah btn-kecil" onclick="hapus(' + i + ')">Hapus</button></div></div>' +
        '<div class="qtxt">' + eh(s.pertanyaan) + "</div>";
      if (s.gambar) h += '<img class="qimg" src="' + s.gambar + '">';
      h += '<div class="opts">';
      for (var j = 0; j < s.opsi.length; j++) {
        h += '<div class="opt' + (j === s.kunci ? " kunci" : "") + '"><span class="hrf">' + H[j] + "</span>" + (j === s.kunci ? ' <small style="color:#047857">kunci</small>' : "");
        if (s.opsiGambar && s.opsiGambar[j]) h += '<img src="' + s.opsiGambar[j] + '">';
        if (s.opsi[j]) h += "<div>" + eh(s.opsi[j]) + "</div>";
        h += "</div>";
      }
      h += "</div>";
      if (s.skrip) h += '<div class="skrip"><b>スクリプト</b><br>' + eh(s.skrip) + "</div>";
      if (s.penjelasan) h += '<div class="pjl">💡 ' + eh(s.penjelasan) + "</div>";
      h += "</div>";
    }
  }
  el("app").innerHTML = h;
  el("fKat").onchange = function () { el("blokSkrip").style.display = this.value === "聴解" ? "block" : "none"; };
  renderGambarUtama();
  renderOpsi(f);
}

var formCache = { level: "N4", kategori: "聴解", pertanyaan: "", skrip: "", opsi: ["", "", "", ""], kunci: 0, penjelasan: "" };
function ambilForm() { return formCache; }
function bacaForm() {
  formCache = {
    level: el("fLevel").value,
    kategori: el("fKat").value,
    pertanyaan: el("fTanya").value,
    skrip: el("fSkrip") ? el("fSkrip").value : "",
    opsi: [0, 1, 2, 3].map(function (i) { var e = el("fOpsi" + i); return e ? e.value : ""; }),
    kunci: formCache.kunci,
    penjelasan: el("fJelas").value
  };
  return formCache;
}

function renderGambarUtama() {
  var b = el("blokGambar");
  if (formGambar) {
    b.innerHTML = '<div class="mini"><img src="' + formGambar + '"><button onclick="formGambar=null;renderGambarUtama()">✕</button></div>';
  } else {
    b.innerHTML = '<label class="unggah">＋ Unggah gambar utama<input type="file" accept="image/*" style="display:none" onchange="unggahUtama(this)"></label>';
  }
}
function unggahUtama(inp) {
  var f = inp.files && inp.files[0]; if (!f) return;
  kompres(f, function (d) { formGambar = d; renderGambarUtama(); });
  inp.value = "";
}

function renderOpsi(f) {
  var h = "";
  for (var i = 0; i < 4; i++) {
    h += '<div style="border:1px solid #f9d8e6;border-radius:8px;padding:8px;margin-bottom:8px">' +
      '<div style="display:flex;gap:8px;align-items:center">' +
      '<button type="button" onclick="setKunci(' + i + ')" style="width:32px;height:32px;border-radius:50%;border:2px solid ' + (formCache.kunci === i ? "#db2777" : "#f3b8d2") + ";background:" + (formCache.kunci === i ? "#db2777" : "#fff") + ";color:" + (formCache.kunci === i ? "#fff" : "#9d2f5e") + ';font-weight:700;cursor:pointer">' + H[i] + "</button>" +
      '<input type="text" id="fOpsi' + i + '" placeholder="Teks pilihan ' + H[i] + ' (kosongkan jika pakai gambar)" value="' + eh(f.opsi[i]).replace(/"/g, "&quot;") + '">' +
      (formOpsiGambar[i] ? "" : '<label style="cursor:pointer;border:2px dashed #f3b8d2;border-radius:8px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;flex-shrink:0">🖼<input type="file" accept="image/*" style="display:none" onchange="unggahOpsi(this,' + i + ')"></label>') +
      "</div>" +
      (formOpsiGambar[i] ? '<div class="mini"><img src="' + formOpsiGambar[i] + '"><button onclick="hapusOpsiGambar(' + i + ')">✕</button></div>' : "") +
      "</div>";
  }
  el("blokOpsi").innerHTML = h;
}
function setKunci(i) { bacaForm(); formCache.kunci = i; renderOpsi(formCache); }
function unggahOpsi(inp, i) {
  var f = inp.files && inp.files[0]; if (!f) return;
  bacaForm();
  kompres(f, function (d) { formOpsiGambar[i] = d; renderOpsi(formCache); });
  inp.value = "";
}
function hapusOpsiGambar(i) { bacaForm(); formOpsiGambar[i] = null; renderOpsi(formCache); }

function simpanSoal() {
  var f = bacaForm();
  if (!f.pertanyaan.trim()) return toast("Pertanyaan masih kosong");
  for (var i = 0; i < 4; i++) if (!f.opsi[i].trim() && !formOpsiGambar[i]) return toast("Pilihan " + H[i] + " masih kosong (isi teks atau gambar)");
  var rec = {
    id: editId || Date.now().toString(),
    level: f.level, kategori: f.kategori, pertanyaan: f.pertanyaan, skrip: f.skrip,
    opsi: f.opsi, opsiGambar: formOpsiGambar.slice(), gambar: formGambar,
    kunci: f.kunci, penjelasan: f.penjelasan
  };
  if (editId) {
    for (var k = 0; k < soal.length; k++) if (soal[k].id === editId) soal[k] = rec;
    toast("Soal diperbarui");
  } else {
    soal.push(rec);
    toast("Soal ditambahkan");
  }
  editId = null;
  formCache = { level: f.level, kategori: f.kategori, pertanyaan: "", skrip: "", opsi: ["", "", "", ""], kunci: 0, penjelasan: "" };
  formGambar = null; formOpsiGambar = [null, null, null, null];
  simpanDraf(); render();
}

function mulaiEdit(i) {
  var s = soal[i];
  editId = s.id;
  formCache = { level: s.level, kategori: s.kategori, pertanyaan: s.pertanyaan, skrip: s.skrip || "", opsi: s.opsi.slice(), kunci: s.kunci, penjelasan: s.penjelasan || "" };
  formGambar = s.gambar || null;
  formOpsiGambar = (s.opsiGambar || [null, null, null, null]).slice();
  render(); window.scrollTo(0, 0);
}
function batalEdit() {
  editId = null;
  formCache = { level: "N4", kategori: "聴解", pertanyaan: "", skrip: "", opsi: ["", "", "", ""], kunci: 0, penjelasan: "" };
  formGambar = null; formOpsiGambar = [null, null, null, null];
  render();
}
function hapus(i) {
  if (!confirm("Hapus soal #" + (i + 1) + "?")) return;
  soal.splice(i, 1); simpanDraf(); render(); toast("Soal dihapus");
}
function kosongkan() {
  if (!confirm("Kosongkan SEMUA soal di draf? (file soal.json di GitHub tidak ikut terhapus)")) return;
  soal = []; simpanDraf(); render();
}

function unduhJson() {
  if (!soal.length) return toast("Belum ada soal untuk diunduh");
  var blob = new Blob([JSON.stringify(soal, null, 1)], { type: "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "soal.json"; a.click();
  URL.revokeObjectURL(a.href);
  toast(soal.length + " soal diunduh — unggah ke folder data/ di GitHub");
}

function muatJson(inp) {
  var f = inp.files && inp.files[0]; if (!f) return;
  var r = new FileReader();
  r.onload = function (e) {
    try {
      var d = JSON.parse(e.target.result);
      if (!Array.isArray(d)) throw new Error();
      soal = d; simpanDraf(); render(); toast(d.length + " soal dimuat");
    } catch (err) { toast("File bukan soal.json yang valid"); }
  };
  r.readAsText(f);
  inp.value = "";
}

function imporExcel(inp) {
  var f = inp.files && inp.files[0]; if (!f) return;
  var r = new FileReader();
  r.onload = function (e) {
    try {
      var wb = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
      var rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });
      var peta = { A: 0, B: 1, C: 2, D: 3, "1": 0, "2": 1, "3": 2, "4": 3 };
      function kolom(row, nama) {
        for (var k in row) if (String(k).trim().toLowerCase().indexOf(nama) === 0) return String(row[k]).trim();
        return "";
      }
      var masuk = 0, lewat = 0;
      rows.forEach(function (row, idx) {
        var tanya = kolom(row, "pertanyaan");
        var opsi = [kolom(row, "a"), kolom(row, "b"), kolom(row, "c"), kolom(row, "d")];
        var kh = kolom(row, "kunci").toUpperCase();
        if (!tanya || opsi.some(function (o) { return !o; }) || !(kh in peta)) { lewat++; return; }
        var lv = kolom(row, "level").toUpperCase(); if (LEVELS.indexOf(lv) < 0) lv = "N4";
        var kt = kolom(row, "kategori"); if (KATEGORI.indexOf(kt) < 0) kt = "文法";
        soal.push({
          id: Date.now().toString() + "-" + idx,
          level: lv, kategori: kt, pertanyaan: tanya, skrip: kolom(row, "skrip"),
          opsi: opsi, opsiGambar: [null, null, null, null], gambar: null,
          kunci: peta[kh], penjelasan: kolom(row, "penjelasan")
        });
        masuk++;
      });
      simpanDraf(); render();
      toast(masuk + " soal diimpor" + (lewat ? ", " + lewat + " baris dilewati" : ""));
    } catch (err) { toast("Gagal membaca file Excel/CSV"); }
  };
  r.readAsArrayBuffer(f);
  inp.value = "";
}

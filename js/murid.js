var H = ["A", "B", "C", "D"];
var LEVELS = ["N5", "N4", "N3", "N2", "N1"];
var KATEGORI = ["文字・語彙", "文法", "読解", "聴解"];
var BANK = [], soal = [], jwb = {}, nama = "", CAK = "Semua / Semua";

function eh(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function acak(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function el(id) { return document.getElementById(id); }

fetch("data/soal.json?v=" + Date.now())
  .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
  .then(function (d) { BANK = d; el("subjudul").textContent = BANK.length + " soal tersedia"; renderAwal(); })
  .catch(function () {
    el("app").innerHTML = '<div class="card">Gagal memuat <b>data/soal.json</b>. Pastikan file tersebut ada di folder <code>data/</code> repository dan halaman dibuka lewat alamat GitHub Pages (bukan dibuka langsung dari file).</div>';
  });

function opsiSelect(id, daftar) {
  var h = '<select id="' + id + '"><option>Semua</option>';
  for (var i = 0; i < daftar.length; i++) h += "<option>" + daftar[i] + "</option>";
  return h + "</select>";
}

function renderAwal() {
  var h = '<div class="card"><h2 style="margin-bottom:4px">Kerjakan ujian</h2>' +
    '<p class="muted" style="margin-bottom:14px">Tulis nama, pilih cakupan soal, lalu klik Mulai. Nilai dihitung otomatis di akhir.</p>' +
    '<label>Nama peserta</label><input type="text" id="nm" placeholder="Nama lengkap" style="margin-bottom:12px">' +
    '<div class="row" style="margin-bottom:12px">' +
    '<div><label>Level</label>' + opsiSelect("fLevel", LEVELS) + "</div>" +
    '<div><label>Kategori</label>' + opsiSelect("fKat", KATEGORI) + "</div>" +
    '<div><label>Jumlah soal</label><select id="fJml"><option>Semua</option><option>5</option><option>10</option><option>15</option><option>20</option><option>30</option><option>40</option><option>50</option><option>60</option></select></div>' +
    "</div>" +
    '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">' +
    '<span class="muted" id="ket"></span>' +
    '<button class="btn btn-pink" onclick="mulai()">Mulai</button></div></div>';
  el("app").innerHTML = h;
  el("fLevel").onchange = el("fKat").onchange = hitung;
  hitung();
}

function tersaring() {
  var lv = el("fLevel").value, kt = el("fKat").value;
  return BANK.filter(function (s) { return (lv === "Semua" || s.level === lv) && (kt === "Semua" || s.kategori === kt); });
}

function hitung() { el("ket").textContent = "Tersedia " + tersaring().length + " soal sesuai filter"; }

function mulai() {
  var n = el("nm").value.trim();
  if (!n) { alert("Tulis nama dulu ya"); return; }
  var pool = tersaring();
  if (!pool.length) { alert("Tidak ada soal yang cocok dengan filter"); return; }
  nama = n;
  CAK = el("fLevel").value + " / " + el("fKat").value;
  soal = acak(pool.slice());
  var jml = el("fJml").value;
  if (jml !== "Semua") soal = soal.slice(0, parseInt(jml, 10));
  jwb = {};
  renderUjian();
  window.scrollTo(0, 0);
}

function opsiHtml(q, i, modeUjian) {
  var h = '<div class="opts">';
  for (var j = 0; j < q.opsi.length; j++) {
    if (modeUjian) {
      h += '<button type="button" class="opt" id="opt-' + i + "-" + j + '" onclick="pilih(' + i + "," + j + ')">';
    } else {
      var cls = "opt" + (j === q.kunci ? " kunci" : (j === jwb[i] ? " salah" : ""));
      h += '<div class="' + cls + '">';
    }
    h += '<span class="hrf">' + H[j] + "</span>";
    if (!modeUjian && j === q.kunci) h += ' <small style="color:#047857">kunci</small>';
    if (!modeUjian && j === jwb[i] && j !== q.kunci) h += ' <small style="color:#be123c">jawabanmu</small>';
    if (q.opsiGambar && q.opsiGambar[j]) h += '<img src="' + q.opsiGambar[j] + '" alt="Pilihan ' + H[j] + '">';
    if (q.opsi[j]) h += "<div>" + eh(q.opsi[j]) + "</div>";
    h += modeUjian ? "</button>" : "</div>";
  }
  return h + "</div>";
}

function renderUjian() {
  var h = '<div class="bar"><span>' + eh(nama) + ' — terjawab <b id="cnt">0</b> / ' + soal.length + "</span>" +
    '<button class="btn btn-tua btn-kecil" onclick="kumpul()">Kumpulkan</button></div>';
  for (var i = 0; i < soal.length; i++) {
    var q = soal[i];
    h += '<div class="card"><div class="qno">問' + (i + 1) + ' <span class="lvl">' + q.level + '</span><span class="kat">' + q.kategori + "</span></div>" +
      '<div class="qtxt">' + eh(q.pertanyaan) + "</div>";
    if (q.gambar) h += '<img class="qimg" src="' + q.gambar + '" alt="Gambar soal">';
    h += opsiHtml(q, i, true) + "</div>";
  }
  h += '<div style="text-align:right;margin-bottom:30px"><button class="btn btn-tua" onclick="kumpul()">Kumpulkan</button></div>';
  el("app").innerHTML = h;
}

function pilih(qi, oi) {
  jwb[qi] = oi;
  var q = soal[qi];
  for (var j = 0; j < q.opsi.length; j++) {
    var b = el("opt-" + qi + "-" + j);
    if (b) b.className = "opt" + (j === oi ? " sel" : "");
  }
  el("cnt").textContent = Object.keys(jwb).length;
}

function kumpul() {
  var blm = soal.length - Object.keys(jwb).length;
  if (blm > 0 && !confirm("Masih ada " + blm + " soal belum dijawab. Tetap kumpulkan?")) return;
  renderHasil();
  window.scrollTo(0, 0);
}

function renderHasil() {
  var benar = 0;
  for (var i = 0; i < soal.length; i++) if (jwb[i] === soal[i].kunci) benar++;
  var nilai = Math.round((benar / soal.length) * 100);
  var tgl = new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
  var ring = "HASIL UJIAN AYUMI\nNama: " + nama + "\nTanggal: " + tgl +
    "\nCakupan: " + CAK +
    "\nBenar: " + benar + "/" + soal.length + "\nNilai: " + nilai;
  var warna = nilai >= 70 ? "hij" : nilai >= 50 ? "kun" : "mer";
  var h = '<div class="card tengah"><div class="eyebrow" style="color:#9d2f5e">Hasil — ' + eh(nama) + "</div>" +
    '<div class="skor ' + warna + '">' + nilai + "</div>" +
    '<div style="color:#475569;margin-bottom:10px">Benar <b>' + benar + "</b> dari " + soal.length + " soal · " + tgl + "</div>" +
    '<pre class="ring" id="ring">' + eh(ring) + "</pre>" +
    '<div style="margin-top:10px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
    '<button class="btn btn-pink" onclick="salin()">Salin hasil</button>' +
    '<a class="btn btn-tua" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(ring) + '">Kirim via WhatsApp</a>' +
    '<button class="btn btn-putih" onclick="renderAwal()">Selesai</button></div>' +
    '<div class="muted" style="margin-top:8px">Kirim atau screenshot hasil ini untuk gurumu ya 🌸</div></div>';
  h += '<h3 style="margin:14px 0 10px;color:#9d2f5e">Pembahasan</h3>';
  for (var i = 0; i < soal.length; i++) {
    var q = soal[i], b = jwb[i] === q.kunci;
    h += '<div class="card"><div class="qno">問' + (i + 1) +
      '<span class="tag ' + (b ? "tag-b" : "tag-s") + '">' + (b ? "✓ Benar" : jwb[i] === undefined ? "— Tidak dijawab" : "✕ Salah") + "</span></div>" +
      '<div class="qtxt">' + eh(q.pertanyaan) + "</div>";
    if (q.gambar) h += '<img class="qimg" src="' + q.gambar + '" alt="Gambar soal">';
    h += opsiHtml(q, i, false);
    if (q.skrip) h += '<div class="skrip"><b>スクリプト</b><br>' + eh(q.skrip) + "</div>";
    if (q.penjelasan) h += '<div class="pjl">💡 ' + eh(q.penjelasan) + "</div>";
    h += "</div>";
  }
  el("app").innerHTML = h;
}

function salin() {
  var t = el("ring").textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(t).then(function () { alert("Hasil tersalin"); });
  } else {
    var ta = document.createElement("textarea");
    ta.value = t; document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); document.body.removeChild(ta);
    alert("Hasil tersalin");
  }
}

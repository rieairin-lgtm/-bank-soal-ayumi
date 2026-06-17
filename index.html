var H = ["A", "B", "C", "D"];
var SALT = "ayumi-sakura-2026";
var BANK = [], soal = [], jwb = {}, nama = "", kelas = "";
var CFG = null;

// Kata perintah per 問題
var MONDAI_KATA = {
  "文字・語彙": {
    "問題１": "（＿＿＿）のことばの読み方として最もよいものを、１・２・３・４から一つえらびなさい。",
    "問題２": "（＿＿＿）のことばを漢字で書くとき、最もよいものを、１・２・３・４から一つえらびなさい。",
    "問題３": "（　　）に入れるのに最もよいものを、１・２・３・４から一つえらびなさい。",
    "問題５": "つぎのことばの使い方として最もよいものを、１・２・３・４から一つえらびなさい。"
  },
  "文法": {
    "問題１": "つぎの文の（　　）に入れるのに最もよいものを、１・２・３・４から一つえらびなさい。",
    "問題２": "つぎの文の＿★＿に入る最もよいものを、１・２・３・４から一つえらびなさい。",
    "問題３": "つぎの文章を読んで、文章全体の内容を考えて、（　）の中に入る最もよいものを、１・２・３・４から一つえらびなさい。"
  },
  "読解": {
    "問題４": "つぎの(1)から(4)の文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "問題５": "つぎの(1)と(2)の文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "問題６": "つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "問題７": "右のページを見て、下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
  },
  "聴解": {
    "問題１": "まず質問を聞いてください。それから話を聞いて、問題用紙の1から4のなかから、最もよいものを一つ選んでください。",
    "問題２": "まず質問を聞いてください。そのあと、問題用紙を見てください。読む時間があります。それから話を聞いて、1から4のなかから、最もよいものを一つ選んでください。",
    "問題３": "問題用紙に何もいんさつされていません。まず話を聞いてください。それから、質問とせんたくしを聞いて、1から4のなかから、最もよいものを一つえらんでください。",
    "問題４": "えを見ながら質問を聞いてください。やじるし（➡）の人は何といいますか。1から3の中から、最もよいものを一つえらんでください。",
    "問題５": "問題用紙に何もいんさつされていません。まず文を聞いてください。それから、その返事を聞いて、1から３の中から、最もよいものを一つえらんでください。"
  }
};

function getKataPerintah(kat, mondai) {
  if (!mondai || !MONDAI_KATA[kat]) return "";
  return MONDAI_KATA[kat][mondai] || "";
}

function eh(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function acak(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function el(id) { return document.getElementById(id); }
function hsh(s) { var h = 5381; for (var i = 0; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; } return h.toString(36); }

// --- Baca link ujian dari guru (?u=token) ---
(function bacaToken() {
  try {
    var u = new URLSearchParams(location.search).get("u");
    if (!u) return;
    var bagian = u.split(".");
    if (bagian.length !== 2) return;
    if (hsh(bagian[0] + SALT) !== bagian[1]) return;
    CFG = JSON.parse(decodeURIComponent(escape(atob(bagian[0]))));
  } catch (e) { CFG = null; }
})();

if (!CFG) {
  el("subjudul").textContent = "問題バンク";
  el("app").innerHTML =
    '<div class="card tengah" style="padding:34px 18px">' +
    '<div style="font-size:44px;margin-bottom:8px">🌸🔗</div>' +
    '<h2 style="margin-bottom:6px;color:#9d2f5e">Halaman ujian dibuka lewat link dari guru</h2>' +
    '<p class="muted">Minta link ujian (misalnya ujian N4 文法) kepada gurumu, lalu buka link tersebut untuk mulai mengerjakan.</p></div>';
} else {
  fetch("data/soal.json?v=" + Date.now())
    .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
    .then(function (d) { BANK = d; renderAwal(); })
    .catch(function () {
      el("app").innerHTML = '<div class="card">Gagal memuat soal. Coba muat ulang halaman, atau hubungi gurumu.</div>';
    });
}

function pool() {
  return BANK.filter(function (s) {
    return (CFG.lv === "Semua" || s.level === CFG.lv) && (CFG.kt === "Semua" || s.kategori === CFG.kt);
  });
}

function infoCakupan() {
  return (CFG.lv === "Semua" ? "Semua level" : CFG.lv) + " · " + (CFG.kt === "Semua" ? "Semua kategori" : CFG.kt);
}

function renderAwal() {
  var p = pool();
  var jml = CFG.jml === "Semua" ? p.length : Math.min(parseInt(CFG.jml, 10), p.length);
  el("subjudul").textContent = CFG.judul || "Ujian Bahasa Jepang";
  var h = '<div class="card">' +
    '<h2 style="margin-bottom:4px;color:#9d2f5e">' + eh(CFG.judul || "Ujian Bahasa Jepang") + "</h2>" +
    '<p class="muted" style="margin-bottom:12px">' + infoCakupan() + " · " + jml + ' soal · pilihan ganda' + (CFG.w ? " · waktu " + CFG.w + " menit" : "") + (CFG.au ? " · 🔊 dengan audio" : "") + '</p>' +
    (CFG.au ? '<div style="background:#fff7fb;border:1px solid #f3b8d2;border-radius:8px;padding:10px;margin-bottom:12px;font-size:13px;color:#9d2f5e"><b>Perhatian:</b> audio diputar <b>satu kali</b> dan tidak bisa dijeda atau diulang. Begitu audio selesai, jawaban otomatis dikumpulkan — siapkan tempat yang tenang sebelum mulai.</div>' : "") +
    (p.length ? (
      '<label>Nama peserta</label><input type="text" id="nm" placeholder="Nama lengkap" style="margin-bottom:10px">' +
      '<label>Kelas / angkatan</label><input type="text" id="kls" placeholder="mis. Kelas N4 Pagi / Angkatan 12" style="margin-bottom:14px">' +
      '<div style="text-align:right"><button class="btn btn-pink" onclick="mulai()">Mulai ujian</button></div>'
    ) : '<p class="muted">Belum ada soal untuk cakupan ini. Hubungi gurumu ya.</p>') +
    "</div>";
  el("app").innerHTML = h;
}

function mulai() {
  var n = el("nm").value.trim();
  if (!n) { alert("Tulis nama dulu ya"); return; }
  var k = el("kls").value.trim();
  if (!k) { alert("Tulis kelas/angkatan dulu ya"); return; }
  nama = n; kelas = k;
  var p = pool();
  soal = CFG.acak ? acak(p.slice()) : p.slice();
  if (CFG.jml !== "Semua") soal = soal.slice(0, parseInt(CFG.jml, 10));
  jwb = {};
  renderUjian();
  if (CFG.w) mulaiTimer(CFG.w * 60);
  if (CFG.au) mulaiAudio();
  window.scrollTo(0, 0);
}

var aud = null;
function fmt(d) { d = Math.max(0, Math.round(d)); var m = Math.floor(d / 60); var s = d % 60; return m + ":" + (s < 10 ? "0" : "") + s; }
function mulaiAudio() {
  aud = new Audio(CFG.au);
  aud.preload = "auto";
  aud.ontimeupdate = function () {
    var t = el("audSta");
    if (t && aud.duration) t.textContent = "🔊 " + fmt(aud.currentTime) + " / " + fmt(aud.duration);
  };
  aud.onended = function () {
    var t = el("audSta");
    if (t) t.textContent = "🔊 selesai";
    clearInterval(timerId);
    alert("Audio selesai. Jawaban dikumpulkan otomatis.");
    renderHasil();
    window.scrollTo(0, 0);
  };
  aud.onerror = function () {
    var t = el("audSta");
    if (t) { t.textContent = "⚠ audio gagal dimuat"; t.style.color = "#e11d48"; }
    alert("File audio gagal dimuat. Lanjutkan mengerjakan dan kumpulkan secara manual, lalu laporkan ke gurumu.");
  };
  aud.onpause = function () { if (!aud.ended && aud.currentTime > 0) { aud.play().catch(function () {}); } };
  aud.play().catch(function () {
    var t = el("audSta");
    if (t) t.textContent = "⚠ ketuk layar untuk memulai audio";
    document.body.addEventListener("click", function sekali() {
      document.body.removeEventListener("click", sekali);
      aud.play().catch(function () {});
    });
  });
}

var sisaDetik = 0, timerId = null;
function mulaiTimer(detik) {
  sisaDetik = detik;
  clearInterval(timerId);
  timerId = setInterval(function () {
    sisaDetik--;
    var t = el("timer");
    if (t) {
      var m = Math.floor(sisaDetik / 60), d = sisaDetik % 60;
      t.textContent = "⏱ " + m + ":" + (d < 10 ? "0" : "") + d;
      if (sisaDetik <= 60) t.style.color = "#e11d48";
    }
    if (sisaDetik <= 0) {
      clearInterval(timerId);
      alert("Waktu habis! Jawaban dikumpulkan otomatis.");
      renderHasil();
      window.scrollTo(0, 0);
    }
  }, 1000);
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
  var h = '<div class="bar"><span>' + eh(nama) + ' (' + eh(kelas) + ') — terjawab <b id="cnt">0</b> / ' + soal.length + "</span>" +
    (CFG.au ? '<b id="audSta" style="color:#9d2f5e">🔊 memuat…</b>' : "") +
    (CFG.w ? '<b id="timer" style="color:#9d2f5e">⏱ ' + CFG.w + ':00</b>' : "") +
    '<button class="btn btn-tua btn-kecil" onclick="kumpul()">Kumpulkan</button></div>';

  // Kelompokkan soal per 問題
  var kelompok = []; // [{mondai, kata, soalList:[{soal, idxGlobal}]}]
  var mondaiSudah = {};
  for (var i = 0; i < soal.length; i++) {
    var q = soal[i];
    var mk = (q.mondai || "") + "|" + (q.kategori || "");
    if (!mondaiSudah[mk]) {
      mondaiSudah[mk] = kelompok.length;
      kelompok.push({ mondai: q.mondai || "", kategori: q.kategori || "", kata: getKataPerintah(q.kategori, q.mondai), soalList: [] });
    }
    kelompok[mondaiSudah[mk]].soalList.push({ soal: q, idx: i });
  }

  for (var g = 0; g < kelompok.length; g++) {
    var grp = kelompok[g];
    // Header 問題
    if (grp.mondai) {
      h += '<div style="margin:18px 0 6px;padding:10px 14px;background:linear-gradient(90deg,#fdf2f7,#fff7fb);border-left:4px solid #db2777;border-radius:0 8px 8px 0">' +
        '<div style="font-weight:700;color:#9d2f5e;font-size:15px">' + eh(grp.mondai) + '</div>' +
        (grp.kata ? '<div style="font-size:12px;color:#64748b;margin-top:2px">' + eh(grp.kata) + '</div>' : '') +
        '</div>';
    }
    for (var si = 0; si < grp.soalList.length; si++) {
      var item = grp.soalList[si];
      var q2 = item.soal;
      var idx = item.idx;
      h += '<div class="card"><div class="qno">問' + (idx + 1) + ' <span class="lvl">' + q2.level + '</span><span class="kat">' + q2.kategori + "</span></div>" +
        '<div class="qtxt">' + eh(q2.pertanyaan) + "</div>";
      if (q2.gambar) h += '<img class="qimg" src="' + q2.gambar + '" alt="Gambar soal">';
      h += opsiHtml(q2, idx, true) + "</div>";
    }
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
  clearInterval(timerId);
  if (aud) { aud.onpause = null; aud.onended = null; aud.pause(); }
  renderHasil();
  window.scrollTo(0, 0);
}

function renderHasil() {
  var benar = 0;
  for (var i = 0; i < soal.length; i++) if (jwb[i] === soal[i].kunci) benar++;
  var nilai = Math.round((benar / soal.length) * 100);
  var tgl = new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
  var ring = "HASIL UJIAN AYUMI\n" + (CFG.judul ? "Ujian: " + CFG.judul + "\n" : "") +
    "Nama: " + nama + "\nKelas: " + kelas + "\nTanggal: " + tgl + "\nCakupan: " + infoCakupan() +
    "\nBenar: " + benar + "/" + soal.length + "\nNilai: " + nilai;
  var warna = nilai >= 70 ? "hij" : nilai >= 50 ? "kun" : "mer";
  var h = '<div class="card tengah"><div class="eyebrow" style="color:#9d2f5e">Hasil — ' + eh(nama) + "</div>" +
    '<div class="skor ' + warna + '">' + nilai + "</div>" +
    '<div style="color:#475569;margin-bottom:10px">Benar <b>' + benar + "</b> dari " + soal.length + " soal · " + tgl + "</div>" +
    '<pre class="ring" id="ring">' + eh(ring) + "</pre>" +
    '<div style="margin-top:10px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
    '<button class="btn btn-pink" onclick="salin()">Salin hasil</button>' +
    '<a class="btn btn-tua" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(ring) + '">Kirim via WhatsApp</a></div>' +
    '<div class="muted" style="margin-top:8px">Kirim atau screenshot hasil ini untuk gurumu ya 🌸</div></div>';
  if (CFG.pb) {
    h += '<h3 style="margin:14px 0 10px;color:#9d2f5e">Pembahasan</h3>';
    // Pembahasan juga dikelompokkan per 問題
    var kelompok2 = [];
    var mondaiSudah2 = {};
    for (var i = 0; i < soal.length; i++) {
      var q = soal[i];
      var mk = (q.mondai || "") + "|" + (q.kategori || "");
      if (!mondaiSudah2[mk]) {
        mondaiSudah2[mk] = kelompok2.length;
        kelompok2.push({ mondai: q.mondai || "", kategori: q.kategori || "", soalList: [] });
      }
      kelompok2[mondaiSudah2[mk]].soalList.push({ soal: q, idx: i });
    }
    for (var g2 = 0; g2 < kelompok2.length; g2++) {
      var grp2 = kelompok2[g2];
      if (grp2.mondai) {
        h += '<div style="margin:14px 0 6px;padding:8px 12px;background:#fdf2f7;border-left:4px solid #db2777;border-radius:0 8px 8px 0;font-weight:700;color:#9d2f5e">' + eh(grp2.mondai) + '</div>';
      }
      for (var si2 = 0; si2 < grp2.soalList.length; si2++) {
        var item2 = grp2.soalList[si2];
        var q3 = item2.soal;
        var idx2 = item2.idx;
        var b = jwb[idx2] === q3.kunci;
        h += '<div class="card"><div class="qno">問' + (idx2 + 1) +
          '<span class="tag ' + (b ? "tag-b" : "tag-s") + '">' + (b ? "✓ Benar" : jwb[idx2] === undefined ? "— Tidak dijawab" : "✕ Salah") + "</span></div>" +
          '<div class="qtxt">' + eh(q3.pertanyaan) + "</div>";
        if (q3.gambar) h += '<img class="qimg" src="' + q3.gambar + '" alt="Gambar soal">';
        h += opsiHtml(q3, idx2, false);
        if (q3.skrip) h += '<div class="skrip"><b>スクリプト</b><br>' + eh(q3.skrip) + "</div>";
        if (q3.penjelasan) h += '<div class="pjl">💡 ' + eh(q3.penjelasan) + "</div>";
        h += "</div>";
      }
    }
  } else {
    h += '<div class="card muted tengah">Pembahasan tidak ditampilkan untuk ujian ini.</div>';
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

/* ============================================================
   EDITE AQUI: tudo que precisa mudar está neste bloco.
   Mexa só no que está entre aspas ou nos números. Não apague
   as vírgulas no fim das linhas.
   ============================================================ */
var CONFIG = {
  foto: "foto-maria-catarina.jpeg",     /* nome da foto, que fica na mesma pasta do index.html. Se usar outra foto, renomeie o arquivo para este nome */
  idade: 1,                            /* <<< ALTERAR: idade que ela vai completar */
  data: "2027-01-10T17:00:00-03:00",   /* <<< ALTERAR: data e hora. Formato: AAAA-MM-DDTHH:MM:00-03:00 */
  local: "Confetti Festas e Eventos",    /* <<< ALTERAR: nome do local da festa */
  endereco: "R. Santos Coelho Neto, 323 - Manaíra, João Pessoa - PB, 58038-451",  /* <<< ALTERAR: endereço completo (o botão do mapa usa isto) */
  whatsapp: "558381347776",                        /* <<< ALTERAR: número do WhatsApp só com dígitos. Ex.: 5583999999999 */
  roupa: "Tamanho 3 a 4 anos",         /* <<< ALTERAR: tamanho de roupa */
  calcado: "Numeração 24/25"           /* <<< ALTERAR: numeração do calçado */
};
/* ===================== fim da área de edição ===================== */

(function () {
  var $ = function (id) { return document.getElementById(id); };
  var target = new Date(CONFIG.data);
  var tz = "America/Fortaleza";
  if (CONFIG.foto) $("foto").setAttribute("href", CONFIG.foto);

  /* Textos vindos da configuração */
  $("idade").textContent = CONFIG.idade + (CONFIG.idade === 1 ? " aninho" : " aninhos");
  $("d-local").textContent = CONFIG.local;
  $("d-end").textContent = CONFIG.endereco;
  $("g-roupa").textContent = CONFIG.roupa;
  $("g-calcado").textContent = CONFIG.calcado;
  try {
    var dia = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: tz }).format(target);
    $("d-data").textContent = dia.charAt(0).toUpperCase() + dia.slice(1);
    var h = new Intl.DateTimeFormat("pt-BR", { hour: "numeric", minute: "2-digit", hourCycle: "h23", timeZone: tz }).formatToParts(target);
    var hh = h.filter(function (p) { return p.type === "hour"; })[0].value;
    var mm = h.filter(function (p) { return p.type === "minute"; })[0].value;
    $("d-hora").textContent = mm === "00" ? hh + "h" : hh + "h" + mm;
  } catch (e) {}
  $("mapa").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.local + " " + CONFIG.endereco);

  /* Contagem regressiva */
  var pad = function (n) { return String(n).padStart(2, "0"); };
  function tick() {
    var diff = target.getTime() - Date.now();
    if (diff <= 0) {
      $("count").hidden = true;
      var msg = $("count-msg");
      msg.hidden = false;
      msg.textContent = diff > -12 * 3600 * 1000 ? "É hoje! Vem brincar com a gente." : "A festa já aconteceu. Obrigado por celebrar com a gente!";
      return false;
    }
    var s = Math.floor(diff / 1000);
    $("c-d").textContent = pad(Math.floor(s / 86400));
    $("c-h").textContent = pad(Math.floor(s % 86400 / 3600));
    $("c-m").textContent = pad(Math.floor(s % 3600 / 60));
    $("c-s").textContent = pad(s % 60);
    return true;
  }
  if (tick()) { var iv = setInterval(function () { if (!tick()) clearInterval(iv); }, 1000); }

  /* RSVP */
  var qtd = 1;
  function zap() {
    var nome = $("nome").value.trim();
    var txt = "Olá! Quero confirmar presença de " + qtd + (qtd === 1 ? " pessoa" : " pessoas") +
      " na festa de " + CONFIG.idade + (CONFIG.idade === 1 ? " aninho" : " aninhos") + " da Maria Catarina." +
      (nome ? " Nome: " + nome + "." : "");
    $("zap").href = "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(txt);
    $("qtd-out").textContent = qtd;
  }
  $("menos").addEventListener("click", function () { if (qtd > 1) { qtd--; zap(); } });
  $("mais").addEventListener("click", function () { if (qtd < 20) { qtd++; zap(); } });
  $("nome").addEventListener("input", zap);
  zap();

  /* Janela de presentes */
  var ov = $("overlay"), opener = $("abrir-presentes");
  function abrir() { ov.hidden = false; $("fechar").focus(); }
  function fechar() { ov.hidden = true; opener.focus(); }
  opener.addEventListener("click", abrir);
  $("fechar").addEventListener("click", fechar);
  ov.addEventListener("click", function (e) { if (e.target === ov) fechar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !ov.hidden) fechar(); });

  /* Vaga-lumes */
  var box = $("fireflies"), seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  for (var i = 0; i < 16; i++) {
    var f = document.createElement("span");
    f.className = "fly";
    f.style.left = (rnd() * 96 + 2) + "%";
    f.style.top = (rnd() * 92 + 4) + "%";
    f.style.setProperty("--d", (5 + rnd() * 6).toFixed(1) + "s");
    f.style.setProperty("--b", (2 + rnd() * 3).toFixed(1) + "s");
    f.style.setProperty("--x", (rnd() * 30 - 15).toFixed(0) + "px");
    f.style.setProperty("--y", (rnd() * -34).toFixed(0) + "px");
    f.style.animationDelay = (-rnd() * 5).toFixed(1) + "s";
    box.appendChild(f);
  }
})();
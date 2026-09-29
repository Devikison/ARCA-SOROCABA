/* ARCA Sorocaba: comportamentos compartilhados por todas as páginas */
(function () {
  'use strict';

  var WA_NUMBER = '5515991142594';
  var PIX_KEY = '19.831.448/0001-85';

  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }

  // ---------- menu mobile ----------
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1120) closeMenu();
    });
  }

  // ---------- perguntas frequentes ----------
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var sign = item.querySelector('.faq-sign');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
      sign.textContent = isOpen ? '−' : '+';
    });
  });

  // ---------- copiar chave PIX (qualquer botão com data-pix-copy) ----------
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
    }
    fallbackCopy(text);
    return Promise.resolve();
  }
  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(area);
  }

  document.querySelectorAll('[data-pix-copy]').forEach(function (btn) {
    var scope = btn.closest('[data-pix-scope]') || btn.parentElement;
    var msg = scope.querySelector('[data-pix-msg]');
    var timer;
    btn.addEventListener('click', function () {
      copyText(PIX_KEY);
      if (msg) {
        msg.classList.add('is-visible');
        clearTimeout(timer);
        timer = setTimeout(function () { msg.classList.remove('is-visible'); }, 9000);
      }
    });
  });

  // ---------- doação da home: valor + frequência, PIX ou WhatsApp ----------
  var doarRoot = document.getElementById('doar');
  if (doarRoot && doarRoot.querySelector('[data-freq]')) {
    var freqButtons = doarRoot.querySelectorAll('[data-freq]');
    var valorButtons = doarRoot.querySelectorAll('[data-valor]');
    var impactoText = document.getElementById('impactoText');
    var otherWrap = document.getElementById('doarOther');
    var otherInput = document.getElementById('doarOtherInput');
    var doarBtn = document.getElementById('doarWhatsBtn');
    var state = { freq: 'mensal', valor: 30 };

    // só o valor de R$ 30 tem significado definido pela ARCA
    var IMPACTOS = {
      30: 'Com R$ 30 você mantém um dia de oficina.',
      other: 'Qualquer valor ajuda a manter a casa de portas abertas.'
    };

    function currentValue() {
      if (state.valor === 0) {
        var n = parseFloat(String(otherInput.value).replace(/\./g, '').replace(',', '.'));
        return isNaN(n) || n <= 0 ? 0 : n;
      }
      return state.valor;
    }

    function fmt(n) {
      return 'R$ ' + (n % 1 === 0 ? String(n) : n.toFixed(2).replace('.', ','));
    }

    function refresh() {
      var v = currentValue();
      var mensal = state.freq === 'mensal';
      impactoText.textContent = IMPACTOS[state.valor] || IMPACTOS.other;
      otherWrap.classList.toggle('is-visible', state.valor === 0);
      var resumo = document.getElementById('doarResumo');
      var pixValor = document.getElementById('pixValor');
      var pixMensal = document.getElementById('pixMensal');
      if (resumo) resumo.textContent = v > 0 ? fmt(v) + (mensal ? ' por mês' : ' (doação única)') : 'Escolha um valor';
      if (pixValor) pixValor.textContent = v > 0 ? fmt(v) : 'que você escolheu';
      if (pixMensal) pixMensal.classList.toggle('is-visible', mensal);
    }
    otherInput.addEventListener('input', refresh);

    freqButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        freqButtons.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        state.freq = btn.dataset.freq;
        refresh();
      });
    });
    valorButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        valorButtons.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        state.valor = Number(btn.dataset.valor);
        refresh();
        if (state.valor === 0) otherInput.focus();
      });
    });

    doarBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var v = currentValue();
      var tipo = state.freq === 'mensal' ? 'mensal' : 'única';
      var msg = v > 0
        ? 'Olá! Quero fazer uma doação ' + tipo + ' de ' + fmt(v) + ' para a ARCA Sorocaba.'
        : 'Olá! Quero fazer uma doação ' + tipo + ' para a ARCA Sorocaba.';
      window.open(waLink(msg), '_blank', 'noopener');
    });

    refresh();
  }

  // ---------- chips de seleção múltipla ----------
  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', function () {
      chip.classList.toggle('is-selected');
      chip.setAttribute('aria-pressed', chip.classList.contains('is-selected') ? 'true' : 'false');
    });
  });

  // ---------- formulários que abrem o WhatsApp da ARCA ----------
  // O site é estático: em vez de fingir que enviou, montamos a mensagem e abrimos o WhatsApp.
  document.querySelectorAll('form[data-wa-form]').forEach(function (form) {
    var done = form.parentElement.querySelector('.form-done');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var kind = form.getAttribute('data-wa-form');
      var val = function (name) {
        var el = form.elements[name];
        return el ? String(el.value).trim() : '';
      };
      var chips = Array.prototype.map.call(form.querySelectorAll('.chip.is-selected'), function (c) {
        return c.textContent.trim();
      });
      var text;
      if (kind === 'voluntario') {
        text = 'Olá! Meu nome é ' + (val('nome') || '(nome)') + ' e quero ser voluntário(a) na ARCA Sorocaba.';
        if (chips.length) text += ' Posso ajudar: ' + chips.join(', ') + '.';
        if (val('whatsapp')) text += ' Meu WhatsApp: ' + val('whatsapp') + '.';
      } else {
        text = 'Olá! Meu nome é ' + (val('nome') || '(nome)') + '.';
        if (val('email')) text += ' Meu e-mail: ' + val('email') + '.';
        if (val('mensagem')) text += ' ' + val('mensagem');
      }
      window.open(waLink(text), '_blank', 'noopener');
      if (done) done.classList.add('is-visible');
    });
  });
  // ---------- fotos: salve assets/fotos/<nome>.jpg (ou .webp/.png) e ela aparece no espaço ----------
  document.querySelectorAll('.photo-slot[data-foto]').forEach(function (slot) {
    var name = slot.getAttribute('data-foto');
    var alt = slot.getAttribute('data-alt') || '';
    var exts = ['jpg', 'webp', 'png'];
    (function tryNext(i) {
      if (i >= exts.length) return;
      var img = new Image();
      img.onload = function () {
        slot.innerHTML = '';
        img.alt = alt;
        img.loading = 'lazy';
        slot.appendChild(img);
        slot.classList.add('has-photo');
      };
      img.onerror = function () { tryNext(i + 1); };
      img.src = 'assets/fotos/' + name + '.' + exts[i];
    })(0);
  });
  // ---------- números da ARCA: contam de zero até o valor final quando entram na tela ----------
  var statsPanel = document.querySelector('.stats-panel');
  if (statsPanel) {
    var counters = statsPanel.querySelectorAll('[data-count]');
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fmtNum = function (v, d) { return v.toFixed(d).replace('.', ','); };
    var showValue = function (el, v) {
      var d = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = (el.getAttribute('data-prefix') || '') + fmtNum(v, d) + (el.getAttribute('data-suffix') || '');
    };
    var runCounter = function (el) {
      var end = parseFloat(el.getAttribute('data-count'));
      var start = null;
      var dur = 1800;
      var step = function (t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / dur, 1);
        showValue(el, end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window && !reduced) {
      statsPanel.classList.add('stats-ready');
      counters.forEach(function (el) { showValue(el, 0); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.disconnect();
          statsPanel.classList.add('is-in');
          counters.forEach(runCounter);
        });
      }, { threshold: 0.45 });
      io.observe(statsPanel);
    }
  }
})();

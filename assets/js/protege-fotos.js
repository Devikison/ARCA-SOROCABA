/* Protege as fotos: sem menu do botão direito, sem arrastar e sem "salvar imagem"
   no toque longo do celular. Só age sobre imagens; links, botões, formulários e
   rastreamento (Pixel, Tag do Google) continuam funcionando normalmente. */
(function () {
  'use strict';
  var css = document.createElement('style');
  css.textContent = 'img{-webkit-user-drag:none;user-drag:none;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}';
  document.head.appendChild(css);

  function ehFoto(alvo) {
    return alvo && alvo.nodeType === 1 && (alvo.tagName === 'IMG' || alvo.tagName === 'PICTURE');
  }
  document.addEventListener('contextmenu', function (e) {
    if (ehFoto(e.target)) e.preventDefault();
  });
  document.addEventListener('dragstart', function (e) {
    if (ehFoto(e.target)) e.preventDefault();
  });
})();

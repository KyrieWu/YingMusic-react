(function (doc) {
  var init = function () {
    setFontSize();
    bindEvent();
  };

  function bindEvent() {
    window.addEventListener("resize", setFontSize, false);
  }

  function setFontSize() {
    var cWidth = doc.documentElement.clientWidth;
    if (cWidth <= 414) {
      doc.documentElement.style.fontSize = cWidth / 37.5 + "px";
    } else {
      const fontSize = doc.documentElement.style.fontSize;

      if (fontSize !== "62.5%") {
        doc.documentElement.style.fontSize = "62.5%";
      }
    }
  }

  init();
})(document);

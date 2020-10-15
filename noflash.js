(function () {
  function setTheme(newTheme) {
    document.body.className = newTheme;
    window.__theme = newTheme;
    window.__onThemeChange(newTheme);
  }
  window.__onThemeChange = function () {};
  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", JSON.stringify(window.__theme));
    } catch (err) {}
  };
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkQuery.addListener(function (event) {
    window.__setPreferredTheme(event.matches ? "dark" : "light");
  });
  let preferredTheme;
  try {
    preferredTheme = JSON.parse(localStorage.getItem("theme"));
  } catch (err) {}
  setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
})();

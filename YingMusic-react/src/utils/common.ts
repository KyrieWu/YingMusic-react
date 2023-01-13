export function changeAppearance(appearance: string) {
  document.body.setAttribute("data-theme", appearance);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", appearance === "dark" ? "#222" : "#fff");
}

const globalSwitch = document.querySelector("[data-global-switch]");
const globalIndexPanel = document.querySelector("[data-global-index-panel]");
const globalOverview = document.querySelector("[data-global-view='overview']");
const globalIndex = document.querySelector("[data-global-view='index']");

globalOverview?.addEventListener("click", () => {
  window.location.href = "./index.html?skipIntro=1";
});

globalIndex?.addEventListener("click", () => {
  const isOpen = globalIndexPanel?.classList.toggle("open");
  globalIndex.classList.toggle("active", Boolean(isOpen));
  globalOverview?.classList.toggle("active", !isOpen);
});

globalIndexPanel?.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='http']");

  if (!link) {
    return;
  }

  event.preventDefault();
  const openedWindow = window.open(link.href, "_blank");

  if (openedWindow) {
    openedWindow.opener = null;
    return;
  }

  window.location.href = link.href;
});

document.addEventListener("click", (event) => {
  if (!globalIndexPanel?.classList.contains("open")) {
    return;
  }

  if (globalSwitch?.contains(event.target) || globalIndexPanel.contains(event.target)) {
    return;
  }

  globalIndexPanel.classList.remove("open");
  globalIndex?.classList.remove("active");
  globalOverview?.classList.add("active");
});

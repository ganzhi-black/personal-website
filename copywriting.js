const scrollAreas = Array.from(document.querySelectorAll(".synced-scroll"));
const webCategory = document.querySelector("#web-category");
const phoneCategory = document.querySelector("#phone-category");
const categoryLabels = ["知识分享", "知识分享", "知识分享", "文旅", "文旅", "营销", "营销", "营销", "公众号"];
let syncing = false;

function getImageState(area) {
  const images = Array.from(area.querySelectorAll("img"));
  const marker = area.scrollTop + area.clientHeight * 0.2;
  const index = images.reduce((currentIndex, image, imageIndex) => {
    return image.offsetTop <= marker ? imageIndex : currentIndex;
  }, 0);
  const image = images[index] || images[0];
  const nextImage = images[index + 1];
  const span = Math.max(
    1,
    (nextImage ? nextImage.offsetTop : image.offsetTop + image.offsetHeight) - image.offsetTop,
  );
  const progress = Math.min(1, Math.max(0, (area.scrollTop - image.offsetTop) / span));

  return { index, progress };
}

function setImageState(area, state) {
  const images = Array.from(area.querySelectorAll("img"));
  const image = images[state.index] || images[images.length - 1];
  const nextImage = images[state.index + 1];

  if (!image) {
    return;
  }

  const span = Math.max(
    1,
    (nextImage ? nextImage.offsetTop : image.offsetTop + image.offsetHeight) - image.offsetTop,
  );
  const max = area.scrollHeight - area.clientHeight;
  area.scrollTop = Math.min(max, Math.max(0, image.offsetTop + span * state.progress));
}

function syncFrom(source) {
  if (syncing) {
    return;
  }

  syncing = true;
  const state = getImageState(source);
  const label = categoryLabels[state.index] || categoryLabels[categoryLabels.length - 1];
  if (webCategory) {
    webCategory.textContent = label;
  }
  if (phoneCategory) {
    phoneCategory.textContent = label;
  }
  scrollAreas.forEach((area) => {
    if (area !== source) {
      setImageState(area, state);
    }
  });
  window.requestAnimationFrame(() => {
    syncing = false;
  });
}

function enableDragScroll(area) {
  let dragging = false;
  let startY = 0;
  let startScrollTop = 0;

  area.addEventListener("scroll", () => syncFrom(area), { passive: true });

  area.addEventListener("pointerdown", (event) => {
    dragging = true;
    startY = event.clientY;
    startScrollTop = area.scrollTop;
    area.classList.add("is-dragging");
    area.setPointerCapture(event.pointerId);
  });

  area.addEventListener("pointermove", (event) => {
    if (!dragging) {
      return;
    }

    event.preventDefault();
    area.scrollTop = startScrollTop + startY - event.clientY;
  });

  function stopDragging(event) {
    if (!dragging) {
      return;
    }

    dragging = false;
    area.classList.remove("is-dragging");

    if (event?.pointerId && area.hasPointerCapture(event.pointerId)) {
      area.releasePointerCapture(event.pointerId);
    }
  }

  area.addEventListener("pointerup", stopDragging);
  area.addEventListener("pointercancel", stopDragging);
  area.addEventListener("pointerleave", stopDragging);
}

scrollAreas.forEach(enableDragScroll);

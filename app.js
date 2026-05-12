async function initThreeBackground() {
  const THREE = await import("https://unpkg.com/three@0.173.0/build/three.module.js");

  function runIntro() {
    const overlay = document.querySelector("#intro-overlay");
    const hey = document.querySelector(".intro-word-hey");
    const welcome = document.querySelector(".intro-word-welcome");
    const params = new URLSearchParams(window.location.search);

    if (params.get("skipIntro") === "1") {
      document.body.classList.remove("intro-active");
      overlay?.classList.add("is-hidden");
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.hash}`);
      return;
    }

    if (!overlay || !hey || !welcome) {
      document.body.classList.remove("intro-active");
      return;
    }

    window.setTimeout(() => {
      hey.classList.add("is-visible");
    }, 180);

    window.setTimeout(() => {
      hey.classList.add("is-leaving");
      hey.classList.remove("is-visible");
    }, 980);

    window.setTimeout(() => {
      welcome.classList.add("is-visible");
    }, 1280);

    window.setTimeout(() => {
      document.body.classList.remove("intro-active");
      welcome.classList.add("is-leaving");
      welcome.classList.remove("is-visible");
      overlay.classList.add("is-fading");
    }, 2850);

    window.setTimeout(() => {
      overlay.classList.add("is-hidden");
    }, 4200);
  }

  runIntro();

  const container = document.querySelector("#stage");
  const switchButtons = Array.from(document.querySelectorAll(".switch-button"));
  const indexPanel = document.querySelector("#index-panel");
  const contactOverlay = document.querySelector("#contact-overlay");
  const contactOpen = document.querySelector("[data-contact-open]");
  const contactClose = document.querySelector("[data-contact-close]");

  const cardNames = [
    "\u4e2a\u4eba\u4ecb\u7ecd",
    "\u6587\u5b57\u4f5c\u54c1",
    "\u6587\u6848\u8bbe\u8ba1",
    "\u81ea\u5a92\u4f53\u8d26\u53f7",
    "vibe coding",
  ];
  const cardIds = ["intro", "writing", "copywriting", "media", "film"];
  const introPageUrl = "./intro.html";
  const writingPageUrl = "./writing.html";
  const copywritingPageUrl = "./copywriting.html";
  const mediaProfileUrl = "https://www.xiaohongshu.com/user/profile/5d0750b1000000001201c484";
  const vibeCodingUrl = "https://qimoshua.top";
  const cardLinkUrls = [introPageUrl, writingPageUrl, copywritingPageUrl, mediaProfileUrl, vibeCodingUrl];
  const cardImageSources = [
    "./assets/intro.jpg",
    null,
    "./assets/copywriting.png",
    "./assets/media-redbook.jpg",
    "./assets/vibe-coding.png",
  ];

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#fafafa");
  scene.fog = new THREE.FogExp2("#fafafa", 0.04);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor("#fafafa", 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.className = "three-canvas";
  renderer.domElement.setAttribute("data-engine", "three.js r173");
  container.replaceChildren(renderer.domElement);

  scene.add(new THREE.AmbientLight("#ffffff", 0.72));

  const directionalLight = new THREE.DirectionalLight("#ffffff", 1.25);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight("#e8e0d5", 0.9);
  pointLight.position.set(-3, 3, 3);
  scene.add(pointLight);

  const root = new THREE.Group();
  root.position.set(0.18, 0.24, 0);
  root.rotation.set(
    THREE.MathUtils.degToRad(-4),
    THREE.MathUtils.degToRad(-16),
    THREE.MathUtils.degToRad(-4),
  );
  scene.add(root);

  function wrap(value, length) {
    return ((value % length) + length) % length;
  }

  function normalizeDelta(delta) {
    if (delta > Math.PI) {
      return delta - Math.PI * 2;
    }

    if (delta < -Math.PI) {
      return delta + Math.PI * 2;
    }

    return delta;
  }

  function createCardTexture(index) {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");

    if (index === 1) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const vignette = ctx.createRadialGradient(450, 520, 180, 450, 520, 820);
      vignette.addColorStop(0, "rgba(255,255,255,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.08)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.rotate(-0.035);
      ctx.fillStyle = "#050505";
      ctx.font = "700 184px Arial, Helvetica, sans-serif";
      ctx.fillText("M", -22, 156);
      ctx.font = "700 142px Arial, Helvetica, sans-serif";
      ctx.fillText("y", 266, 214);
      ctx.font = "700 142px Arial, Helvetica, sans-serif";
      ctx.fillText("T", 18, 324);
      ctx.fillText("y", 210, 378);
      ctx.font = "700 120px Arial, Helvetica, sans-serif";
      ctx.fillText("pography", 340, 382);
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.fillText("phy", 702, 432);
      ctx.font = "700 154px Arial, Helvetica, sans-serif";
      ctx.fillStyle = "#050505";
      ctx.fillText("Work", 6, 538);
      ctx.font = "700 150px Arial, Helvetica, sans-serif";
      ctx.fillText("Welcome", -8, 790);
      ctx.font = "700 132px Arial, Helvetica, sans-serif";
      ctx.fillText("to", -10, 954);
      ctx.font = "700 140px Arial, Helvetica, sans-serif";
      ctx.fillText("View", -12, 1120);
      ctx.restore();

      ctx.save();
      ctx.rotate(0.02);
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.font = "700 360px Arial, Helvetica, sans-serif";
      ctx.fillText("F", 545, 1280);
      ctx.restore();

      const highlight = ctx.createLinearGradient(0, 0, canvas.width, 0);
      highlight.addColorStop(0, "rgba(255,255,255,0)");
      highlight.addColorStop(0.62, "rgba(255,255,255,0.2)");
      highlight.addColorStop(1, "rgba(255,255,255,0.72)");
      ctx.fillStyle = highlight;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    }

    const palettes = [
      ["#2a2d2f", "#d7e2df", "#b84b62"],
      ["#1e2329", "#eadfc6", "#6d7b65"],
      ["#273238", "#d8e8ef", "#b2a177"],
      ["#20242d", "#e6e2dc", "#7aa5b8"],
      ["#171717", "#d9d4ca", "#9f7a58"],
    ];
    const palette = palettes[index % palettes.length];

    const base = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    base.addColorStop(0, palette[1]);
    base.addColorStop(0.44, palette[2]);
    base.addColorStop(1, palette[0]);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.2;
    for (let i = 0; i < 12; i += 1) {
      ctx.fillStyle = i % 2 === 0 ? "#ffffff" : "#000000";
      ctx.beginPath();
      ctx.ellipse(
        120 + i * 68,
        190 + Math.sin(i + index) * 90,
        170 + i * 4,
        360,
        -0.4 + i * 0.08,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }

    ctx.globalAlpha = 0.42;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(78, 80, canvas.width - 156, 170);

    ctx.globalAlpha = 0.72;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 22;
    ctx.strokeRect(58, 58, canvas.width - 116, canvas.height - 116);

    const highlight = ctx.createLinearGradient(0, 0, canvas.width, 0);
    highlight.addColorStop(0, "rgba(255,255,255,0.5)");
    highlight.addColorStop(0.35, "rgba(255,255,255,0)");
    highlight.addColorStop(1, "rgba(255,255,255,0.2)");
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  function loadCoverTexture(source, material, index) {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 900;
      canvas.height = 1200;
      const ctx = canvas.getContext("2d");
      const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, x, y, width, height);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      material.map?.dispose();
      material.map = texture;
      material.needsUpdate = true;
    };

    image.src = source;
  }

  function createLabelTexture(index) {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(10,10,10,0.64)";
    ctx.font = "700 58px Arial, 'Microsoft YaHei', sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText(String(index + 1).padStart(2, "0"), 34, 84);
    ctx.textAlign = "right";
    ctx.fillText(cardNames[index], canvas.width - 34, 84);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  function createGlassGlareTexture(direction = "vertical") {
    const canvas = document.createElement("canvas");
    canvas.width = direction === "vertical" ? 96 : 900;
    canvas.height = direction === "vertical" ? 1200 : 96;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const softGlow = direction === "vertical"
      ? ctx.createLinearGradient(0, 0, width, 0)
      : ctx.createLinearGradient(0, 0, 0, height);
    softGlow.addColorStop(0, "rgba(255,255,255,0)");
    softGlow.addColorStop(0.32, "rgba(255,255,255,0.14)");
    softGlow.addColorStop(0.48, "rgba(255,255,255,0.78)");
    softGlow.addColorStop(0.56, "rgba(213,235,247,0.28)");
    softGlow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = softGlow;
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 0.44;
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = direction === "vertical" ? 3 : 2;
    ctx.beginPath();
    if (direction === "vertical") {
      ctx.moveTo(width * 0.58, 38);
      ctx.lineTo(width * 0.42, height - 44);
    } else {
      ctx.moveTo(42, height * 0.45);
      ctx.lineTo(width - 42, height * 0.56);
    }
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  const cardGeometry = new THREE.PlaneGeometry(1.28, 1.82);
  const labelGeometry = new THREE.PlaneGeometry(1.42, 0.26);
  const glassGeometry = new THREE.PlaneGeometry(1.3, 1.84);
  const verticalGlareGeometry = new THREE.PlaneGeometry(0.06, 1.88);
  const horizontalGlareGeometry = new THREE.PlaneGeometry(1.32, 0.06);
  const verticalEdgeGeometry = new THREE.BoxGeometry(0.01, 1.84, 0.035);
  const horizontalEdgeGeometry = new THREE.BoxGeometry(1.3, 0.01, 0.035);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#f7fbfa",
    roughness: 0.02,
    metalness: 0,
    transmission: 0.86,
    transparent: true,
    opacity: 0.12,
    thickness: 0.24,
    ior: 1.48,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: "#f8ffff",
    roughness: 0.08,
    metalness: 0.04,
    emissive: "#dceff5",
    emissiveIntensity: 0.12,
    transparent: true,
    opacity: 0.24,
  });
  const verticalGlareMaterial = new THREE.MeshBasicMaterial({
    map: createGlassGlareTexture("vertical"),
    transparent: true,
    opacity: 0.62,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const horizontalGlareMaterial = new THREE.MeshBasicMaterial({
    map: createGlassGlareTexture("horizontal"),
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const cards = [];
  const cardMaterials = [];
  const labelMaterials = [];

  cardNames.forEach((_, index) => {
    const group = new THREE.Group();

    const cardMaterial = new THREE.MeshBasicMaterial({
      color: "#ffffff",
      map: createCardTexture(index),
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    if (cardImageSources[index]) {
      loadCoverTexture(cardImageSources[index], cardMaterial, index);
    }

    cardMaterials.push(cardMaterial);

    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    card.position.z = 0.012;
    group.add(card);

    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.z = 0.026;
    group.add(glass);

    const rightGlare = new THREE.Mesh(verticalGlareGeometry, verticalGlareMaterial);
    rightGlare.position.set(0.654, 0, 0.062);
    group.add(rightGlare);

    const leftGlare = new THREE.Mesh(verticalGlareGeometry, verticalGlareMaterial);
    leftGlare.position.set(-0.654, 0, 0.058);
    leftGlare.rotation.z = Math.PI;
    group.add(leftGlare);

    const topGlare = new THREE.Mesh(horizontalGlareGeometry, horizontalGlareMaterial);
    topGlare.position.set(0, 0.925, 0.064);
    group.add(topGlare);

    const bottomGlare = new THREE.Mesh(horizontalGlareGeometry, horizontalGlareMaterial);
    bottomGlare.position.set(0, -0.925, 0.052);
    bottomGlare.rotation.z = Math.PI;
    group.add(bottomGlare);

    const labelMaterial = new THREE.MeshBasicMaterial({
      map: createLabelTexture(index),
      transparent: true,
      opacity: 0.84,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    labelMaterials.push(labelMaterial);

    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, -1.08, 0.055);
    group.add(label);

    const rightEdge = new THREE.Mesh(verticalEdgeGeometry, edgeMaterial);
    rightEdge.position.set(0.655, 0, 0);
    group.add(rightEdge);

    const leftEdge = new THREE.Mesh(verticalEdgeGeometry, edgeMaterial);
    leftEdge.position.set(-0.655, 0, 0);
    group.add(leftEdge);

    const topEdge = new THREE.Mesh(horizontalEdgeGeometry, edgeMaterial);
    topEdge.position.set(0, 0.93, 0);
    group.add(topEdge);

    const bottomEdge = new THREE.Mesh(horizontalEdgeGeometry, edgeMaterial);
    bottomEdge.position.set(0, -0.93, 0);
    group.add(bottomEdge);

    group.userData = {
      index,
      cardMaterial,
      labelMaterial,
      label,
      targetPosition: new THREE.Vector3(),
      targetRotation: new THREE.Euler(),
      targetScale: 1,
      floatSeed: index * 0.5,
    };

    root.add(group);
    cards.push(group);
  });

  const mouse = new THREE.Vector2(0, 0);
  const pointer = new THREE.Vector2(0, 0);
  const raycaster = new THREE.Raycaster();
  let lastMouseMove = performance.now();
  let lastFrameTime = 0;
  let disposed = false;
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartProgress = 0;
  let progress = 0;
  let targetProgress = 0;
  let activeIndex = 0;
  const cardNormal = new THREE.Vector3();
  const cardWorldPosition = new THREE.Vector3();
  const cameraWorldPosition = new THREE.Vector3();
  const hashIndex = cardIds.indexOf(window.location.hash.replace("#", ""));

  if (hashIndex >= 0) {
    progress = hashIndex;
    targetProgress = hashIndex;
    activeIndex = hashIndex;
  }

  function updateHashFromProgress() {
    const nextIndex = wrap(Math.round(targetProgress), cards.length);

    if (nextIndex !== activeIndex) {
      activeIndex = nextIndex;
      window.location.hash = cardIds[activeIndex];
    }
  }

  function getPointedCard(clientX, clientY) {
    pointer.x = (clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(clientY / window.innerHeight) * 2 + 1;
    camera.updateMatrixWorld();
    root.updateWorldMatrix(true, true);
    raycaster.setFromCamera(pointer, camera);

    const intersections = raycaster.intersectObjects(cards, true);

    return intersections
      .map((intersection) => {
        let object = intersection.object;

        while (object && !Number.isInteger(object.userData.index)) {
          object = object.parent;
        }

        return object;
      })
      .find(Boolean);
  }

  function setCardTargets() {
    cards.forEach((card) => {
      const turn = ((card.userData.index - progress) / cards.length) * Math.PI * 2;
      const x = Math.sin(turn) * 2.0;
      const y = -Math.cos(turn) * 0.92 + 0.08;
      const z = Math.cos(turn) * 1.55;
      const frontness = (Math.cos(turn) + 1) / 2;
      const turnToCamera = normalizeDelta(-turn * 0.55);

      card.userData.targetPosition.set(
        x,
        y,
        z,
      );
      card.userData.targetRotation.set(
        THREE.MathUtils.degToRad(-3 + Math.sin(turn) * 3),
        turnToCamera,
        THREE.MathUtils.degToRad(Math.sin(turn) * 6),
      );
      card.userData.targetScale = 0.82 + frontness * 0.44;
      card.userData.targetOpacity = 0.34 + frontness * 0.52;
    });

  }

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    lastMouseMove = performance.now();

    if (dragging) {
      const dragDistance = event.clientX - dragStartX;
      targetProgress = dragStartProgress - dragDistance / 220;
      updateHashFromProgress();
      renderer.domElement.style.cursor = "grabbing";
      return;
    }

    const pointedCard = getPointedCard(event.clientX, event.clientY);
    renderer.domElement.style.cursor =
      cardLinkUrls[pointedCard?.userData.index]
        ? "pointer"
        : "grab";
  }

  function onPointerDown(event) {
    event.preventDefault();
    dragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragStartProgress = targetProgress;
    lastMouseMove = performance.now();
    renderer.domElement.style.cursor = "grabbing";
    renderer.domElement.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    onMouseMove(event);
  }

  function onPointerUp(event) {
    if (!dragging) {
      return;
    }

    dragging = false;
    const clickDistance = Math.hypot(event.clientX - dragStartX, event.clientY - dragStartY);
    targetProgress = Math.round(targetProgress);
    updateHashFromProgress();

    if (Math.abs(targetProgress) > cards.length * 3) {
      const normalized = wrap(targetProgress, cards.length);
      targetProgress = normalized;
      progress = normalized;
    }

    if (renderer.domElement.hasPointerCapture(event.pointerId)) {
      renderer.domElement.releasePointerCapture(event.pointerId);
    }

    if (clickDistance < 8) {
      const clickedCard = getPointedCard(event.clientX, event.clientY);
      const clickedUrl = cardLinkUrls[clickedCard?.userData.index] || cardLinkUrls[activeIndex];

      if (clickedUrl) {
        window.location.href = clickedUrl;
        return;
      }
    }

    const pointedCard = getPointedCard(event.clientX, event.clientY);
    renderer.domElement.style.cursor =
      cardLinkUrls[pointedCard?.userData.index]
        ? "pointer"
        : "grab";
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const mobileScale = window.innerWidth < 720 ? 0.72 : 1;
    root.scale.setScalar(mobileScale);
  }

  function animate(time) {
    if (disposed) {
      return;
    }

    requestAnimationFrame(animate);

    if (time - lastFrameTime < 1000 / 60) {
      return;
    }
    lastFrameTime = time;

    const seconds = time * 0.001;
    const idle = performance.now() - lastMouseMove > 3000 && !dragging;
    const targetRotationY = idle
      ? Math.sin(seconds * 0.3) * 0.08
      : mouse.x * 0.08;
    const targetRotationX = idle
      ? Math.cos(seconds * 0.2) * 0.04
      : mouse.y * -0.05;
    const targetX = dragging ? 0 : mouse.x * 0.3;
    const targetY = dragging ? 0 : mouse.y * -0.2;

    progress = THREE.MathUtils.lerp(progress, targetProgress, 0.12);
    setCardTargets();

    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotationY, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotationX, 0.05);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);

    cards.forEach((card) => {
      const floatY = Math.sin(seconds + card.userData.floatSeed) * 0.035;
      card.position.lerp(card.userData.targetPosition, 0.13);
      card.position.y += floatY;
      card.rotation.x = THREE.MathUtils.lerp(
        card.rotation.x,
        card.userData.targetRotation.x,
        0.13,
      );
      card.rotation.y = THREE.MathUtils.lerp(
        card.rotation.y,
        card.userData.targetRotation.y,
        0.13,
      );
      card.rotation.z = THREE.MathUtils.lerp(
        card.rotation.z,
        card.userData.targetRotation.z,
        0.13,
      );

      card.updateWorldMatrix(true, false);
      card.getWorldDirection(cardNormal);
      card.getWorldPosition(cardWorldPosition);
      camera.getWorldPosition(cameraWorldPosition);
      const labelShouldFlip = cardNormal.dot(
        cameraWorldPosition.sub(cardWorldPosition).normalize(),
      ) < 0;
      card.userData.label.rotation.y = labelShouldFlip ? Math.PI : 0;

      const scale = THREE.MathUtils.lerp(card.scale.x, card.userData.targetScale, 0.13);
      card.scale.setScalar(scale);
      card.userData.cardMaterial.opacity = THREE.MathUtils.lerp(
        card.userData.cardMaterial.opacity,
        card.userData.targetOpacity,
        0.13,
      );
      card.userData.labelMaterial.opacity = THREE.MathUtils.lerp(
        card.userData.labelMaterial.opacity,
        Math.min(0.9, card.userData.targetOpacity + 0.08),
        0.13,
      );
    });

    renderer.render(scene, camera);
  }

  function dispose() {
    disposed = true;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onResize);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerup", onPointerUp);
    renderer.domElement.removeEventListener("pointercancel", onPointerUp);
    cardGeometry.dispose();
    labelGeometry.dispose();
    glassGeometry.dispose();
    verticalGlareGeometry.dispose();
    horizontalGlareGeometry.dispose();
    verticalEdgeGeometry.dispose();
    horizontalEdgeGeometry.dispose();
    cardMaterials.forEach((material) => {
      material.map?.dispose();
      material.dispose();
    });
    labelMaterials.forEach((material) => {
      material.map?.dispose();
      material.dispose();
    });
    glassMaterial.dispose();
    edgeMaterial.dispose();
    verticalGlareMaterial.map?.dispose();
    verticalGlareMaterial.dispose();
    horizontalGlareMaterial.map?.dispose();
    horizontalGlareMaterial.dispose();
    renderer.dispose();
  }

  switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isIndex = button.dataset.view === "index";

      switchButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      indexPanel.classList.toggle("open", isIndex);

      if (!isIndex) {
        document.body.classList.remove("contact-open");
        contactOverlay?.classList.remove("open");
        contactOverlay?.setAttribute("aria-hidden", "true");
        window.location.hash = "";
      }
    });
  });

  indexPanel?.addEventListener("click", (event) => {
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

  function setContactOpen(isOpen) {
    document.body.classList.toggle("contact-open", isOpen);
    contactOverlay?.classList.toggle("open", isOpen);
    contactOverlay?.setAttribute("aria-hidden", String(!isOpen));
    indexPanel?.classList.remove("open");
    switchButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.view === "overview");
    });
  }

  contactOpen?.addEventListener("click", () => setContactOpen(true));
  contactClose?.addEventListener("click", () => setContactOpen(false));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setContactOpen(false);
    }
  });

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerup", onPointerUp);
  renderer.domElement.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("beforeunload", dispose, { once: true });

  setCardTargets();
  onResize();
  requestAnimationFrame(animate);
}

initThreeBackground().catch((error) => {
  console.error(error);
  document.querySelector("#stage").textContent =
    "Three.js failed to load. Please check your network and refresh.";
});

var PART2_PATH = "/part2";

var partTwoScene = {
  title: "The Ramayana Adventure: Lanka",
  subtitle: "Coming Soon",
  featureImage: {
    src: "Hanuman_Stare.png",
    alt: "Hanuman staring toward Lanka"
  },
  text: [
    "The next part arrives soon, where vows become war plans and the sea itself will be challenged."
  ],
  dialogue: [
    { speaker: "Hanuman", line: "\"Give the word, and we leap for Lanka tonight.\"" },
    { speaker: "Rama", line: "\"We move with courage and discipline. Everyone returns together.\"" }
  ]
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ensurePartTwoRoute() {
  if (window.location.pathname === PART2_PATH) {
    return;
  }
  window.history.replaceState({}, "", PART2_PATH);
}

function renderPartTwoScene() {
  var storyCard = document.getElementById("storyCard");
  if (!storyCard) {
    return;
  }

  var html = "<div id='storyCardToolbar'><button id='undoButton' class='art-button undo-art' type='button' disabled aria-label='Undo' data-tooltip='undo'>Undo</button><button type='button' onclick='openTimelineModal()' aria-label='Open my storyline'>My Storyline</button></div>";
  html += "<h2>" + escapeHtml(partTwoScene.title) + "</h2>";
  html += "<p class='scene-subtitle scene-subtitle-strong'>" + escapeHtml(partTwoScene.subtitle) + "</p>";
  html += "<div class='scene-feature-image-wrap'>";
  html += "<img class='scene-feature-image' src='" + escapeHtml(partTwoScene.featureImage.src) + "' alt='" + escapeHtml(partTwoScene.featureImage.alt) + "'>";
  html += "</div>";

  partTwoScene.text.forEach(function (paragraph) {
    html += "<p>" + escapeHtml(paragraph) + "</p>";
  });

  html += "<div class='scene-dialogue' aria-label='Scene dialogue'>";
  partTwoScene.dialogue.forEach(function (entry) {
    html += "<p><strong>" + escapeHtml(entry.speaker) + ":</strong> " + escapeHtml(entry.line) + "</p>";
  });
  html += "</div>";

  html += "<div id='choices'><button type='button' onclick='renderPartTwoScene()' aria-label='Restart'>Restart</button></div>";

  storyCard.innerHTML = html;
}

function setupNavbar() {
  var toggle = document.getElementById("navbarToggle");
  var nav = document.getElementById("topNavbar");
  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", function (event) {
    if (window.matchMedia("(max-width: 768px)").matches && nav.classList.contains("nav-open") && !nav.contains(event.target)) {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupVolumeSlider() {
  var audio = document.getElementById("backgroundMusic");
  if (!audio) {
    return;
  }

  var state = null;
  if (window.sessionStorage) {
    try {
      state = JSON.parse(window.sessionStorage.getItem("ramayanaMusicState") || "null");
    } catch (error) {
      state = null;
    }
  }

  var storedVolume = window.localStorage ? Number(window.localStorage.getItem("ramayanaMusicVolume")) : NaN;
  var fallbackVolume = Number.isFinite(storedVolume) ? Math.max(0, Math.min(1, storedVolume / 100)) : 0.65;
  var restoredVolume = state && Number.isFinite(state.volume) ? Math.max(0, Math.min(1, state.volume)) : fallbackVolume;
  audio.volume = restoredVolume;
  audio.muted = !!(state && state.muted);

  if (state && Number.isFinite(state.currentTime)) {
    audio.addEventListener("loadedmetadata", function onLoadedMetadata() {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.currentTime = Math.max(0, state.currentTime);
    });
  }

  if (!state || !state.paused) {
    var autoplayAttempt = audio.play();
    if (autoplayAttempt && typeof autoplayAttempt.catch === "function") {
      autoplayAttempt.catch(function () {});
    }
  }

  function persistMusicState() {
    if (window.localStorage) {
      window.localStorage.setItem("ramayanaMusicVolume", String(Math.round(audio.volume * 100)));
    }
    if (window.sessionStorage) {
      window.sessionStorage.setItem("ramayanaMusicState", JSON.stringify({
        currentTime: audio.currentTime || 0,
        volume: audio.volume,
        muted: audio.muted,
        paused: audio.paused
      }));
    }
  }

  audio.addEventListener("timeupdate", persistMusicState);
  audio.addEventListener("volumechange", persistMusicState);
  audio.addEventListener("pause", persistMusicState);
  audio.addEventListener("play", persistMusicState);
  window.addEventListener("pagehide", persistMusicState);
}

function openTimelineModal() {
  var modal = document.getElementById("timelineModal");
  var list = document.getElementById("timelineList");
  if (!modal) {
    return;
  }
  if (list) {
    list.innerHTML = "<li class='timeline-current-scene'><strong>" + escapeHtml(partTwoScene.title) + " (Current)</strong><p class='timeline-scene-description'>" + escapeHtml(partTwoScene.text.join(" ")) + "</p></li>";
  }
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function handleTimelineModalBackdrop(event) {
  if (event && event.target && event.target.id === "timelineModal") {
    closeTimelineModal();
  }
}

function closeTimelineModal() {
  var modal = document.getElementById("timelineModal");
  if (!modal) {
    return;
  }
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function startAdventure() {
  renderPartTwoScene();
}

document.addEventListener("DOMContentLoaded", function () {
  ensurePartTwoRoute();
  setupNavbar();
  setupVolumeSlider();
  if (typeof applyResolutionTierStyling === "function") {
    applyResolutionTierStyling();
    window.addEventListener("resize", applyResolutionTierStyling);
  }
  renderPartTwoScene();
});

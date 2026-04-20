// ============================================================
// LIBURAN PINTAR — app.js
// ============================================================

// ---- STATE ----
let state = {
  budget: 1500000,
  budgetInput: "1500000",
  budgetCategory: "standar",
  location: "",
  preferences: [],
  duration: "2D1N",
  results: null,
  loading: false,
  activeTab: "terbaik",
  itineraryOpen: false,
  mobileMenuOpen: false,
  activeDay: 0,
};

const budgetPresets = { hemat: 500000, standar: 1500000, premium: 3500000 };

// ============================================================
// RENDER HELPERS
// ============================================================

function renderBadge(label) {
  const cls = badgeColors[label] || "";
  return `<span class="badge ${cls}">${label}</span>`;
}

function renderStars(rating, small = false) {
  let html = '<div class="flex-row" style="display:flex;align-items:center;gap:3px;">';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="star ${i <= Math.round(rating) ? "star-filled" : "star-empty"}">★</span>`;
  }
  html += `<span style="font-size:.75rem;font-weight:600;color:#4b5563;margin-left:4px;">${rating}</span>`;
  html += '</div>';
  return html;
}

function renderDestCard(dest, durationKey) {
  const cost = dest.estimatedCost[durationKey] || dest.estimatedCost["2D1N"] || dest.estimatedCost["1 Hari"] || 0;
  const badges = dest.badges.map(b => renderBadge(b)).join("");
  return `
    <div class="dest-card">
      <div class="dest-card__top">
        <div class="dest-card__emoji">${dest.image}</div>
        <div class="dest-card__badges">${badges}</div>
      </div>
      <div class="dest-card__name">${dest.name}</div>
      <div class="dest-card__loc">${dest.city}, ${dest.province} · ${dest.distanceLabel}</div>
      <div class="dest-card__price">${fmt(cost)}</div>
      <div class="dest-card__reason">${dest.matchReason}</div>
      ${renderStars(dest.rating)}
    </div>`;
}

function renderSkeletonCard() {
  return `
    <div class="skeleton-card" style="margin-bottom:1rem;">
      <div class="skel-line skeleton-pulse" style="height:1.5rem;width:66%;margin-bottom:.75rem;"></div>
      <div class="skel-line skeleton-pulse" style="height:1rem;width:50%;margin-bottom:.75rem;"></div>
      <div class="skel-line skeleton-pulse" style="height:5rem;border-radius:1rem;margin-bottom:.75rem;"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:.75rem;">
        ${[1,2,3,4].map(()=>`<div class="skeleton-pulse" style="height:3rem;border-radius:.75rem;"></div>`).join("")}
      </div>
      <div class="skel-line skeleton-pulse" style="height:2.5rem;border-radius:1rem;"></div>
    </div>`;
}

function renderItinerary() {
  if (!state.results) return "";
  const raw = state.results.main.itinerary[state.results.durationKey]
    || state.results.main.itinerary["2D1N"]
    || [];
  const days = splitItineraryDays(raw);
  if (!days.length) return "";

  const dayTabs = days.map((_, i) =>
    `<button class="day-tab${state.activeDay === i ? " active" : ""}" onclick="setActiveDay(${i})">Hari ${i + 1}</button>`
  ).join("");

  const items = (days[state.activeDay] || []).map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-top">
          <div class="timeline-time-row">
            <span class="timeline-emoji">${item.icon}</span>
            <span class="timeline-time">${item.time}</span>
          </div>
          ${item.cost > 0 ? `<span class="timeline-cost">${fmt(item.cost)}</span>` : ""}
        </div>
        <div class="timeline-activity">${item.activity}</div>
        <div class="timeline-loc">📍 ${item.location}</div>
      </div>
    </div>`).join("");

  return `
    <div class="itinerary-card slide-in" id="itinerary-panel">
      <div class="itinerary-card__title">🗺️ Itinerary Perjalanan</div>
      <div class="day-tabs">${dayTabs}</div>
      <div class="timeline">${items}</div>
    </div>`;
}

function renderInsightCards() {
  if (!state.results) return "";
  const main = state.results.main;
  const budget = state.budget;
  const upgradeTip = upgradeTips.find(t => budget >= t.from && budget <= t.to);

  const gems = main.hiddenGems.map(g => `
    <li><span class="gem-dot">◆</span><span>${g}</span></li>`).join("");

  const tips = savingTips.slice(0, 4).map(t => `
    <li><span>${t.icon}</span><span>${t.tip}</span></li>`).join("");

  return `
    <section class="insight-section">
      <div class="container-sm">
        <h2 class="font-display" style="font-size:1.25rem;font-weight:900;color:var(--gray-900);margin-bottom:1.5rem;">Insight & Tips</h2>
        <div class="insight-grid">
          <div class="insight-card insight-card--upgrade">
            <div class="insight-icon-wrap insight-icon-wrap--amber">💡</div>
            <div class="insight-card__title">💡 Saran Upgrade</div>
            <div class="insight-card__text">${upgradeTip ? upgradeTip.message : "Tambah Rp300.000 bisa dapat hotel lebih nyaman dan lebih dekat ke pantai."}</div>
          </div>
          <div class="insight-card insight-card--tips">
            <div class="insight-icon-wrap insight-icon-wrap--emerald">⚡</div>
            <div class="insight-card__title">⚡ Tips Hemat</div>
            <ul class="tips-list">${tips}</ul>
          </div>
          <div class="insight-card insight-card--gems">
            <div class="insight-icon-wrap insight-icon-wrap--purple">✨</div>
            <div class="insight-card__title">✨ Hidden Gem Sekitar</div>
            <ul class="gem-list">${gems}</ul>
          </div>
        </div>
      </div>
    </section>`;
}

function renderResults() {
  if (!state.results) return "";
  const r = state.results;
  const main = r.main;
  const costTotal = main.estimatedCost[r.durationKey] || main.estimatedCost["2D1N"] || 0;

  const costBreakdown = [
    { icon: "🚗", label: "Transport", val: main.transportCost },
    { icon: "🏨", label: "Hotel",     val: main.hotelCost },
    { icon: "🍽️", label: "Makan",    val: main.foodCost },
    { icon: "🎟️", label: "Tiket",    val: main.ticketCost },
  ].map(c => `
    <div class="cost-item">
      <span class="cost-item__icon">${c.icon}</span>
      <div class="cost-item__label">${c.label}</div>
      <div class="cost-item__value">${fmt(c.val)}</div>
    </div>`).join("");

  const starsHtml = [1,2,3,4,5].map(i =>
    `<span class="star ${i <= Math.round(main.rating) ? "star-filled" : "star-empty"}">★</span>`
  ).join("");

  const badgesHtml = main.badges.map(b => `<span class="badge-white">${b}</span>`).join("") +
    `<span class="badge-amber">⭐ Pilihan Terbaik</span>`;

  // Tabs
  const tabMap = { terbaik: r.alternatives, murah: r.cheaper, mewah: r.pricier };
  const currentDests = tabMap[state.activeTab] || [];
  const tabsHtml = [["terbaik","⭐ Pilihan Terbaik"],["murah","💰 Lebih Murah"],["mewah","💎 Lebih Mewah"]].map(
    ([tab, lbl]) => `<button class="tab-btn${state.activeTab === tab ? " active" : ""}" onclick="setActiveTab('${tab}')">${lbl}</button>`
  ).join("");

  const destsHtml = currentDests.length
    ? `<div class="dest-grid">${currentDests.map(d => renderDestCard(d, r.durationKey)).join("")}</div>`
    : `<div class="no-results">Tidak ada alternatif untuk kategori ini</div>`;

  const itinerarySection = state.itineraryOpen ? renderItinerary() : "";

  return `
    <div class="slide-in" id="result-section">
      <!-- MAIN RECOMMENDATION -->
      <section class="results-section">
        <div class="container-sm">
          <div class="results-header">
            <div>
              <div class="results-header__title font-display">Rekomendasi Untukmu ✨</div>
              <div class="results-header__sub">Berdasarkan budget dan preferensi yang kamu pilih</div>
            </div>
            <button class="reset-btn" onclick="resetResults()">🔄 Reset</button>
          </div>

          <!-- Main card -->
          <div class="main-dest-card">
            <div class="main-dest-card__bg-emoji">${main.image}</div>
            <div class="main-dest-card__bg-circle"></div>
            <div class="main-dest-card__content">
              <div class="main-dest-card__top">
                <div>
                  <div class="main-dest-card__badges">${badgesHtml}</div>
                  <div class="main-dest-card__name">${main.name}</div>
                  <div class="main-dest-card__loc">📍 ${main.city}, ${main.province} · ${main.distanceLabel}</div>
                </div>
                <div class="main-dest-card__emoji">${main.image}</div>
              </div>

              <div class="cost-grid">${costBreakdown}</div>

              <div class="main-dest-card__bottom">
                <div>
                  <div class="main-dest-card__total-label">Estimasi Total (${r.durationKey})</div>
                  <div class="main-dest-card__total">${fmt(costTotal)}</div>
                  <div class="main-dest-card__rating">
                    ${starsHtml}
                    <span class="main-dest-card__rating-text">${main.rating} (${main.reviewCount.toLocaleString("id-ID")} ulasan)</span>
                  </div>
                </div>
                <div class="main-dest-card__actions">
                  <button class="btn-itinerary" onclick="toggleItinerary()">📋 Itinerary</button>
                  <button class="btn-compare" onclick="scrollToAlternatives()">Bandingkan ↓</button>
                </div>
              </div>

              <div class="main-dest-card__reason">
                <span class="main-dest-card__reason-icon">👍</span>
                <span class="main-dest-card__reason-text">${main.matchReason}</span>
              </div>
            </div>
          </div>

          <!-- Itinerary -->
          ${itinerarySection}
        </div>
      </section>

      <!-- ALTERNATIVES -->
      <section class="alternatives-section" id="alternatives">
        <div class="container-sm">
          <h2 class="font-display" style="font-size:1.25rem;font-weight:900;color:var(--gray-900);margin-bottom:1rem;">Alternatif Pilihan</h2>
          <div class="tab-bar">${tabsHtml}</div>
          ${destsHtml}
        </div>
      </section>

      <!-- INSIGHT -->
      ${renderInsightCards()}
    </div>`;
}

// ============================================================
// MAIN RENDER
// ============================================================
function renderApp() {
  const resultsContainer = document.getElementById("results-mount");
  if (!resultsContainer) return;

  // Budget range label
  const budgetLabel = document.getElementById("budget-current");
  if (budgetLabel) budgetLabel.textContent = fmt(state.budget);

  // Loading state
  const loadingEl = document.getElementById("loading-state");
  const emptyEl = document.getElementById("empty-state");

  if (state.loading) {
    loadingEl.style.display = "block";
    emptyEl.style.display = "none";
    resultsContainer.innerHTML = "";
  } else if (!state.results) {
    loadingEl.style.display = "none";
    emptyEl.style.display = "block";
    resultsContainer.innerHTML = "";
  } else {
    loadingEl.style.display = "none";
    emptyEl.style.display = "none";
    resultsContainer.innerHTML = renderResults();
  }
}

// ============================================================
// EVENT HANDLERS
// ============================================================

function setBudgetCategory(cat) {
  state.budgetCategory = cat;
  state.budget = budgetPresets[cat];
  state.budgetInput = String(budgetPresets[cat]);

  document.querySelectorAll(".budget-preset-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  const inp = document.getElementById("budget-number");
  if (inp) inp.value = state.budget;
  const rng = document.getElementById("budget-range");
  if (rng) rng.value = state.budget;
  renderApp();
}

function onBudgetInput(val) {
  state.budgetInput = val;
  state.budget = parseInt(val) || 0;
  const rng = document.getElementById("budget-range");
  if (rng) rng.value = state.budget;
  renderApp();
}

function onBudgetRange(val) {
  state.budget = parseInt(val);
  state.budgetInput = val;
  const inp = document.getElementById("budget-number");
  if (inp) inp.value = val;
  renderApp();
}

function onLocationDetect() {
  state.location = "Lokasi Saya 📍";
  const inp = document.getElementById("location-input");
  if (inp) inp.value = state.location;
}

function togglePreference(pref) {
  if (state.preferences.includes(pref)) {
    state.preferences = state.preferences.filter(p => p !== pref);
  } else {
    state.preferences.push(pref);
  }
  document.querySelectorAll(".pref-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.pref === pref
      ? !btn.classList.contains("active")
      : state.preferences.includes(btn.dataset.pref));
  });
  // Re-render all pref buttons
  document.querySelectorAll(".pref-btn").forEach(btn => {
    btn.classList.toggle("active", state.preferences.includes(btn.dataset.pref));
  });
}

function setDuration(dur) {
  state.duration = dur;
  document.querySelectorAll(".duration-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.dur === dur);
  });
}

function handleSearch() {
  const locInp = document.getElementById("location-input");
  if (locInp) state.location = locInp.value;

  state.loading = true;
  state.results = null;
  renderApp();

  setTimeout(() => {
    const r = filterDestinations(state.budget, state.preferences, state.duration);
    state.results = r;
    state.loading = false;
    state.activeTab = "terbaik";
    state.itineraryOpen = false;
    state.activeDay = 0;
    renderApp();

    setTimeout(() => {
      const el = document.getElementById("result-section");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, 1800);
}

function resetResults() {
  state.results = null;
  state.itineraryOpen = false;
  renderApp();
}

function toggleItinerary() {
  state.itineraryOpen = !state.itineraryOpen;
  renderApp();
  if (state.itineraryOpen) {
    setTimeout(() => {
      const el = document.getElementById("itinerary-panel");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }
}

function setActiveTab(tab) {
  state.activeTab = tab;
  renderApp();
}

function setActiveDay(day) {
  state.activeDay = day;
  renderApp();
}

function scrollToAlternatives() {
  const el = document.getElementById("alternatives");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("open", state.mobileMenuOpen);
  const icon = document.getElementById("hamburger-icon");
  if (icon) icon.textContent = state.mobileMenuOpen ? "✕" : "☰";
}

function showExampleResults() {
  state.results = filterDestinations(1500000, ["Pantai"], "2D1N");
  state.loading = false;
  state.activeTab = "terbaik";
  state.itineraryOpen = false;
  state.activeDay = 0;
  renderApp();
  setTimeout(() => {
    const el = document.getElementById("result-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderApp();
});

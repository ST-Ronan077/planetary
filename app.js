/* ══════════════════════════════════════
   PLANET DATA ARRAY
══════════════════════════════════════ */
const planets = [
  {
    name:  "Mercury",
    type:  "Terrestrial Planet",
    color: "#b0b0b0",
    order: 1,
    img:   "mercury.jpg",
    desc:  "The smallest planet and closest to the Sun. Mercury has no atmosphere, causing extreme temperature swings from −180°C at night to 430°C during the day.",
    stats: ["Ø 4,879 km", "88 Earth days", "0 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/mercury/overview/"
  },
  {
    name:  "Venus",
    type:  "Terrestrial Planet",
    color: "#e8c94a",
    order: 2,
    img:   "venus.jpg",
    desc:  "The hottest planet due to its thick, toxic CO₂ atmosphere. Surface temperature reaches 465°C — hotter than Mercury.",
    stats: ["Ø 12,104 km", "225 Earth days", "0 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/venus/overview/"
  },
  {
    name:  "Earth",
    type:  "Terrestrial Planet",
    color: "#4a9fe8",
    order: 3,
    img:   "earth.jpg",
    desc:  "Our home — the only known planet with life. 71% of its surface is water. Earth's magnetic field shields us from solar radiation.",
    stats: ["Ø 12,742 km", "365.25 days", "1 Moon"],
    link:  "https://www.nasa.gov/earth/"
  },
  {
    name:  "Mars",
    type:  "Terrestrial Planet",
    color: "#c1440e",
    order: 4,
    img:   "mars.jpg",
    desc:  "The Red Planet. Home to Olympus Mons — the tallest volcano in the solar system at 21.9 km high.",
    stats: ["Ø 6,779 km", "687 Earth days", "2 Moons"],
    link:  "https://mars.nasa.gov/"
  },
  {
    name:  "Jupiter",
    type:  "Gas Giant",
    color: "#c88b3a",
    order: 5,
    img:   "jupiter.jpg",
    desc:  "The largest planet. The Great Red Spot is a storm bigger than Earth, raging for over 350 years.",
    stats: ["Ø 139,820 km", "11.9 Earth yrs", "95 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/jupiter/overview/"
  },
  {
    name:  "Saturn",
    type:  "Gas Giant",
    color: "#e4c97e",
    order: 6,
    img:   "saturn.jpg",
    desc:  "Famous for its stunning ring system of ice and rock. Saturn is so light it would float on water.",
    stats: ["Ø 116,460 km", "29.5 Earth yrs", "146 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/saturn/overview/"
  },
  {
    name:  "Uranus",
    type:  "Ice Giant",
    color: "#7de8e8",
    order: 7,
    img:   "uranus.jpg",
    desc:  "Uranus rotates on its side with an axial tilt of 98°. Coldest atmosphere in the solar system at −224°C.",
    stats: ["Ø 50,724 km", "84 Earth yrs", "27 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/uranus/overview/"
  },
  {
    name:  "Neptune",
    type:  "Ice Giant",
    color: "#3b5fe2",
    order: 8,
    img:   "neptune.jpg",
    desc:  "The windiest planet — storms reach 2,100 km/h. First predicted by maths before being seen by telescope.",
    stats: ["Ø 49,244 km", "165 Earth yrs", "16 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/neptune/overview/"
  }
];

/* ══════════════════════════════════════
   GET DOM ELEMENTS
══════════════════════════════════════ */
const leftList  = document.getElementById('leftPlanets');
const rightList = document.getElementById('rightPlanets');
const center    = document.getElementById('centerDisplay');

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let currentPlanet = null;   // planet data currently displayed
let activeCard    = null;   // currently highlighted card element
let hideTimer     = null;   // delayed-hide timer

/* ══════════════════════════════════════
   Keep the panel alive while the mouse
   is over the center display itself
══════════════════════════════════════ */
center.addEventListener('mouseenter', () => {
  clearTimeout(hideTimer);
});

center.addEventListener('mouseleave', () => {
  // Only hide if no card is active
  if (!activeCard) {
    scheduleHide();
  }
});

/* ══════════════════════════════════════
   BUILD PLANET CARDS DYNAMICALLY
══════════════════════════════════════ */
planets.forEach((planet, i) => {

  const card = document.createElement('div');
  card.className     = 'planet-card';
  card.dataset.index = i;

  const img = document.createElement('img');
  img.className         = 'p-thumb';
  img.src               = planet.img;
  img.alt               = planet.name;
  img.style.borderColor = planet.color + '66';
  img.style.boxShadow   = `0 0 12px ${planet.color}44`;

  const info = document.createElement('div');
  info.className = 'p-info';
  info.innerHTML = `
    <div class="p-num">#${planet.order}</div>
    <div class="p-name">${planet.name}</div>
    <div class="p-sub">${planet.type}</div>
  `;

  card.appendChild(img);
  card.appendChild(info);

  /* — Hover in: show planet, mark card active — */
  card.addEventListener('mouseenter', () => {
    clearTimeout(hideTimer);
    setActiveCard(card);
    showPlanet(planet);
  });

  /* — Hover out: start a grace-period hide — */
  card.addEventListener('mouseleave', () => {
    card.classList.remove('active');
    if (activeCard === card) activeCard = null;
    scheduleHide();
  });

  /* — Click: lock the selection (acts like hover-in) — */
  card.addEventListener('click', () => {
    clearTimeout(hideTimer);
    setActiveCard(card);
    showPlanet(planet);
  });

  if (i < 4) leftList.appendChild(card);
  else        rightList.appendChild(card);
});

/* ══════════════════════════════════════
   setActiveCard() — highlight one card
══════════════════════════════════════ */
function setActiveCard(card) {
  document.querySelectorAll('.planet-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  activeCard = card;
}

/* ══════════════════════════════════════
   showPlanet() — fills center panel
══════════════════════════════════════ */
function showPlanet(planet) {
  // Skip re-render if already showing this planet
  if (currentPlanet === planet) return;
  currentPlanet = planet;

  center.classList.add('lit');

  center.innerHTML = `
    <img
      class="center-planet-img"
      id="cpImg"
      src="${planet.img}"
      alt="${planet.name}"
      style="border-color:${planet.color}88; box-shadow:0 0 30px ${planet.color}66;"
    />
    <div class="center-title"  id="cpTitle">${planet.name}</div>
    <div class="center-type"   id="cpType">${planet.type} · Planet ${planet.order}</div>
    <div class="center-desc"   id="cpDesc">${planet.desc}</div>
    <div class="center-stats"  id="cpStats">
      ${planet.stats.map(s => `<span class="stat-pill">${s}</span>`).join('')}
    </div>
    <div class="center-link"   id="cpLink">
      <a href="${planet.link}" target="_blank">View ${planet.name} on NASA ↗</a>
    </div>
  `;

  // Trigger CSS entrance animations
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById('cpImg'  )?.classList.add('show');
      document.getElementById('cpTitle')?.classList.add('show');
      document.getElementById('cpType' )?.classList.add('show');
      document.getElementById('cpDesc' )?.classList.add('show');
      document.getElementById('cpStats')?.classList.add('show');
      document.getElementById('cpLink' )?.classList.add('show');
    });
  });
}

/* ══════════════════════════════════════
   scheduleHide() — clears panel after
   a short grace period (mouse may be
   travelling toward the center panel)
══════════════════════════════════════ */
function scheduleHide() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    // Only clear if no card is still active
    if (!activeCard) {
      center.classList.remove('lit');
      center.innerHTML = `
        <p class="center-placeholder">
          ← Hover a planet →<br/><br/>
          Discover facts about each world in our solar system
        </p>`;
      currentPlanet = null;
    }
  }, 350);
}
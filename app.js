/* ══════════════════════════════════════
   PLANET DATA ARRAY
   — add image URL and NASA link for each planet
══════════════════════════════════════ */
const planets = [
  {
    name:  "Mercury",
    type:  "Terrestrial Planet",
    color: "#b0b0b0",
    order: 1,
    img:   "mercury.jpg",  // local image for better quality
    desc:  "The smallest planet and closest to the Sun. Mercury has no atmosphere, causing extreme temperature swings from −180°C at night to 430°C during the day.",
    stats: ["Ø 4,879 km", "88 Earth days", "0 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/mercury/overview/"
  },
  {
    name:  "Venus",
    type:  "Terrestrial Planet",
    color: "#e8c94a",
    order: 2,
    img:   "venus.jpg",  // local image for better quality
    desc:  "The hottest planet due to its thick, toxic CO₂ atmosphere. Surface temperature reaches 465°C — hotter than Mercury.",
    stats: ["Ø 12,104 km", "225 Earth days", "0 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/venus/overview/"
  },
  {
    name:  "Earth",
    type:  "Terrestrial Planet",
    color: "#4a9fe8",
    order: 3,
    img:   "earth.jpg",  // local image for better quality
    desc:  "Our home — the only known planet with life. 71% of its surface is water. Earth's magnetic field shields us from solar radiation.",
    stats: ["Ø 12,742 km", "365.25 days", "1 Moon"],
    link:  "https://www.nasa.gov/earth/"
  },
  {
    name:  "Mars",
    type:  "Terrestrial Planet",
    color: "#c1440e",
    order: 4,
    img:   "mars.jpg",  // local image for better quality
    desc:  "The Red Planet. Home to Olympus Mons — the tallest volcano in the solar system at 21.9 km high.",
    stats: ["Ø 6,779 km", "687 Earth days", "2 Moons"],
    link:  "https://mars.nasa.gov/"
  },
  {
    name:  "Jupiter",
    type:  "Gas Giant",
    color: "#c88b3a",
    order: 5,
    img:   "jupiter.jpg",  // local image for better quality
    desc:  "The largest planet. The Great Red Spot is a storm bigger than Earth, raging for over 350 years.",
    stats: ["Ø 139,820 km", "11.9 Earth yrs", "95 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/jupiter/overview/"
  },
  {
    name:  "Saturn",
    type:  "Gas Giant",
    color: "#e4c97e",
    order: 6,
    img:   "saturn.jpg",  // local image for better quality
    desc:  "Famous for its stunning ring system of ice and rock. Saturn is so light it would float on water.",
    stats: ["Ø 116,460 km", "29.5 Earth yrs", "146 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/saturn/overview/"
  },
  {
    name:  "Uranus",
    type:  "Ice Giant",
    color: "#7de8e8",
    order: 7,
    img:   "uranus.jpg",  // local image for better quality
    desc:  "Uranus rotates on its side with an axial tilt of 98°. Coldest atmosphere in the solar system at −224°C.",
    stats: ["Ø 50,724 km", "84 Earth yrs", "27 Moons"],
    link:  "https://solarsystem.nasa.gov/planets/uranus/overview/"
  },
  {
    name:  "Neptune",
    type:  "Ice Giant",
    color: "#3b5fe2",
    order: 8,
    img:   "neptune.jpg",  // local image for better quality
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
   BUILD PLANET CARDS DYNAMICALLY
══════════════════════════════════════ */
planets.forEach((planet, i) => {

  // 1. Create card div
  const card = document.createElement('div');
  card.className    = 'planet-card';
  card.dataset.index = i;

  // 2. Create circular planet image
  const img = document.createElement('img');
  img.className         = 'p-thumb';
  img.src               = planet.img;
  img.alt               = planet.name;
  img.style.borderColor = planet.color + '66';   // planet colour with transparency
  img.style.boxShadow   = `0 0 12px ${planet.color}44`;

  // 3. Create text info block
  const info = document.createElement('div');
  info.className = 'p-info';
  info.innerHTML = `
    <div class="p-num">#${planet.order}</div>
    <div class="p-name">${planet.name}</div>
    <div class="p-sub">${planet.type}</div>
  `;

  // 4. Add image and info into the card
  card.appendChild(img);
  card.appendChild(info);

  // 5. Attach hover and click events
  card.addEventListener('mouseenter', () => showPlanet(planet, card));
  card.addEventListener('mouseleave', () => clearActive(card));
  card.addEventListener('click',      () => showPlanet(planet, card));

  // 6. First 4 go LEFT, last 4 go RIGHT
  if (i < 4) leftList.appendChild(card);
  else        rightList.appendChild(card);
});

/* ══════════════════════════════════════
   STATE VARIABLES
══════════════════════════════════════ */
let activeCard = null;   // currently highlighted card
let hideTimer  = null;   // timer to delay panel hiding

/* ══════════════════════════════════════
   showPlanet() — fills center panel
══════════════════════════════════════ */
function showPlanet(planet, card) {

  // Cancel any pending hide
  clearTimeout(hideTimer);

  // Mark this card as active
  document.querySelectorAll('.planet-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  activeCard = card;

  // Light up center panel border
  center.classList.add('lit');

  // Inject HTML into center panel
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

  // Trigger CSS animations (double rAF ensures DOM is ready)
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
   clearActive() — hides center panel
══════════════════════════════════════ */
function clearActive(card) {
  card.classList.remove('active');

  // 300ms grace period — lets mouse slide to center panel
  hideTimer = setTimeout(() => {
    if (!activeCard || !activeCard.classList.contains('active')) {
      center.classList.remove('lit');
      center.innerHTML = `
        <p class="center-placeholder">
          ← Hover a planet →<br/><br/>
          Discover facts about each world in our solar system
        </p>`;
      activeCard = null;
    }
  }, 300);
}
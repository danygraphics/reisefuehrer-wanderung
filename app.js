// ═══════════════════════════════════════════════════
// ① HELPERS: Maps-Sheet, Tabelle, Links
// ═══════════════════════════════════════════════════

document.body.insertAdjacentHTML('beforeend',
  '<div id="maps-sheet" class="maps-sheet" onclick="if(event.target===this)closeMapsSheet()">' +
    '<div class="maps-sheet-inner">' +
      '<div class="maps-sheet-title">In Karte öffnen</div>' +
      '<div class="maps-sheet-name"></div>' +
      '<div class="maps-sheet-btns"></div>' +
    '</div>' +
  '</div>');

function openMaps(el) {
  const lat = el.dataset.lat, lng = el.dataset.lng;
  const name = el.dataset.name || '';
  const q = (lat && lng) ? `${lat},${lng}` : encodeURIComponent(name);
  const sheet = document.getElementById('maps-sheet');
  sheet.querySelector('.maps-sheet-name').textContent = name;
  sheet.querySelector('.maps-sheet-btns').innerHTML =
    `<a href="https://maps.apple.com/?q=${q}&z=16" class="maps-btn apple">🍎 Apple Karten</a>` +
    `<a href="https://www.google.com/maps?q=${q}" target="_blank" class="maps-btn google">🗺️ Google Maps</a>` +
    `<button onclick="closeMapsSheet()" class="maps-btn cancel">Abbrechen</button>`;
  sheet.classList.add('open');
  return false;
}
function closeMapsSheet() {
  document.getElementById('maps-sheet').classList.remove('open');
}
function infoTable(rows) {
  const r = rows.filter(([, v]) => v);
  return r.length ? `<table class="info-tbl">${r.map(([l,v]) => `<tr><td class="itl">${l}</td><td>${v}</td></tr>`).join('')}</table>` : '';
}
function mapsAddr(lat, lng, name, addr) {
  if (!addr) return '';
  const nm = (name || '').replace(/"/g, '&quot;');
  return `<a class="maps-addr" data-lat="${lat}" data-lng="${lng}" data-name="${nm}" onclick="openMaps(this);return false" href="#">${addr}</a>`;
}
function shortUrl(url) {
  return url ? url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '';
}

// ═══════════════════════════════════════════════════
// ② COUNTDOWN
// ═══════════════════════════════════════════════════
function updateCountdown(){
  const diff = Math.ceil((new Date('2026-04-13') - new Date()) / 86400000);
  const txt = diff > 0 ? `🗓 Noch ${diff} Tage!` : diff === 0 ? '🎉 Heute gehts los!' : `Ihr seid unterwegs 🥾`;
  document.getElementById('cntdwn').textContent = txt;
  const hc = document.getElementById('hero-cntdwn');
  if(hc) hc.textContent = txt;
}
updateCountdown();

// ═══════════════════════════════════════════════════
// ③ NAVIGATION
// ═══════════════════════════════════════════════════
let mapInited = false, elevInited = false;
function gotoPage(id, btn){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('on'));
  const pg = document.getElementById('pg-'+id);
  if(pg) pg.classList.add('active');
  if(btn) btn.classList.add('on');
  if(id === 'karte'){
    if(!mapInited){ initMap(); mapInited = true; }
    setTimeout(() => window._map && window._map.invalidateSize(), 60);
  }
}
let moreOpen = false;
function toggleMoreMenu(btn){
  const m = document.getElementById('more-menu');
  moreOpen = !moreOpen;
  m.style.display = moreOpen ? 'block' : 'none';
  btn.classList.toggle('on', moreOpen);
}
function closeMoreMenu(){
  document.getElementById('more-menu').style.display = 'none';
  moreOpen = false;
}

// ═══════════════════════════════════════════════════
// ④ MAP  (Leaflet + Stage Panel + Elevation)
// ═══════════════════════════════════════════════════

// --- Panel state ---
let panelOpen = false;
let activeStageDay = null;
const layers = { sights: null, hotels: null, restaurants: null };

function togglePanel(){
  panelOpen = !panelOpen;
  document.getElementById('stage-panel').classList.toggle('open', panelOpen);
  document.getElementById('panel-tog').style.background = panelOpen ? '#c97d2a' : '#1e3a28';
}

function setActiveStage(day){
  activeStageDay = day;

  // ① Etappen-Segment auf der Karte highlighten
  if(window._segLines){
    Object.entries(window._segLines).forEach(([d, line]) => {
      const isActive = parseInt(d) === day;
      line.setStyle({
        weight:  isActive ? 7   : 3.5,
        opacity: isActive ? 1.0 : 0.30
      });
      if(isActive) line.bringToFront();
    });
  }

  // ② Stage-Panel: aktives Item + Detail-Sektion aufklappen
  document.querySelectorAll('.sp-item').forEach(el => {
    const isActive = parseInt(el.dataset.day) === day;
    el.classList.toggle('active', isActive);
    const detail = document.getElementById('spd-'+el.dataset.day);
    if(detail) detail.classList.toggle('open', isActive);
    if(isActive) el.scrollIntoView({behavior:'smooth', block:'nearest'});
  });

  // ③ Höhenprofil updaten
  if(elevInited && window._elevChart) highlightStageOnChart(day);
}

function initMap(){
  const map = L.map('the-map', {zoomControl:true}).setView([48.98, 11.30], 9);
  window._map = map;
  // CartoDB Voyager – keine Referer-Restriktionen, sauber für PWA
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
    attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains:'abcd', maxZoom:19
  }).addTo(map);

  // Fix Leaflet popup X-button: remove href="#close" to prevent external-link dialog
  map.on('popupopen', function(e){
    const btn = e.popup.getElement().querySelector('.leaflet-popup-close-button');
    if(btn){
      btn.removeAttribute('href');
      btn.addEventListener('click', function(ev){ ev.preventDefault(); map.closePopup(); });
    }
  });

  // GPX route: pro Etappe eine farbige Linie (nach Schwierigkeit)
  const segLines = {};
  STAGE_SEGS.forEach(seg => {
    const s = STAGES.find(x => x.day === seg.day);
    const diff = getDiff(s);
    const col  = DIFF[diff].col;
    segLines[seg.day] = L.polyline(seg.pts, {
      color: col, weight: 4, opacity: 0.55
    }).addTo(map);
  });
  window._segLines = segLines;

  // Start/End
  L.marker([49.10957,10.75452],{icon:makeCircle('#1e3a28','S',24)})
   .bindPopup('<h3>🚀 Start: Gunzenhausen</h3><p>13. April 2026 – Tag 1</p>').addTo(map);
  L.marker([48.91854,11.87221],{icon:makeCircle('#c97d2a','🎉',24)})
   .bindPopup('<h3>🎉 Ziel: Kelheim</h3><p>28. April 2026 – Tag 16</p>').addTo(map);

  // Stage end markers (numbered)
  STAGES.forEach(s => {
    const diff = getDiff(s);
    const col = DIFF[diff].col;
    const lbl = s.type === 'rest' ? '✨' : String(s.day);
    const m = L.marker([s.lat, s.lng], {icon: makeCircle(col, lbl, 26)});
    const diffHtml = `<div class="pp-diff" style="color:${col}">${DIFF[diff].label}</div>`;
    m.bindPopup(`<h3>Tag ${s.day} · ${s.to}</h3><div class="pp-day">${s.date}</div><p>${s.km > 0 ? s.km+' km · ↑'+s.ascent+' m ↓'+s.descent+' m' : '✨ Genusstag – kein Wandern'}</p>${diffHtml}<p><b>🏨</b> ${s.hotel}</p>`);
    m.on('click', () => { setActiveStage(s.day); if(!panelOpen) togglePanel(); });
    m.addTo(map);
  });

  // Sight layer — unified green #3a7d5e, sz=32
  layers.sights = L.layerGroup();
  SIGHTS.forEach(si => {
    L.marker([si.lat,si.lng],{icon:makeEmoji(si.ico,'#3a7d5e',32)})
     .bindPopup(
       `<h3>${si.ico} ${si.name}</h3>` +
       `<p style="font-size:.8rem;color:#555;margin:4px 0 6px">${si.desc}</p>` +
       infoTable([
         ['📅 Tag',    `Tag ${si.day}`],
         ['💰 Preis',  si.price],
         ['🕐 Öffnung',si.open],
         ['📍 Adresse',mapsAddr(si.lat, si.lng, si.name, si.addr)],
         ['📞 Tel',    si.tel ? `<a href="tel:${si.tel}">${si.tel}</a>` : ''],
         ['🌐 Web',    si.web ? `<a href="${si.web}" target="_blank">${shortUrl(si.web)}</a>` : ''],
       ]), {maxWidth:280}
     ).addTo(layers.sights);
  });
  layers.sights.addTo(map);

  // Hotel layer — unified navy #2c5f8a, sz=32
  layers.hotels = L.layerGroup();
  STAGES.forEach(s => {
    const hd = HOTELS_DATA.find(h => h.day === s.day);
    L.marker([s.lat, s.lng],{icon:makeEmoji('🏨','#2c5f8a',32)})
     .bindPopup(
       `<h3>🏨 ${s.hotel}</h3>` +
       infoTable([
         ['📅 Tag',    `Tag ${s.day} · ${s.to}`],
         ['💰 Preis',  hd ? hd.preis : ''],
         ['📝 Notiz',  s.hotel_note],
         ['📍 Adresse',hd ? mapsAddr(s.lat, s.lng, s.hotel, hd.addr) : ''],
         ['📞 Tel',    hd && hd.tel ? `<a href="tel:${hd.tel}">${hd.tel}</a>` : ''],
         ['🌐 Web',    hd && hd.web ? `<a href="${hd.web}" target="_blank">${shortUrl(hd.web)}</a>` : ''],
       ]), {maxWidth:280}
     ).addTo(layers.hotels);
  });
  layers.hotels.addTo(map);

  // Restaurant layer — unified amber #b85c20, sz=32
  layers.restaurants = L.layerGroup();
  RESTAURANTS.forEach(r => {
    L.marker([r.lat, r.lng],{icon:makeEmoji('🍽️','#b85c20',32)})
     .bindPopup(
       `<h3>🍽️ ${r.name}</h3>` +
       `<p style="font-size:.8rem;color:#555;margin:4px 0 6px">${r.desc}</p>` +
       infoTable([
         ['📅 Tag',    `Tag ${r.day}`],
         ['📍 Adresse',mapsAddr(r.lat, r.lng, r.name, r.addr)],
         ['📞 Tel',    r.tel ? `<a href="tel:${r.tel}">${r.tel}</a>` : ''],
         ['🌐 Web',    r.web ? `<a href="${r.web}" target="_blank">${shortUrl(r.web)}</a>` : ''],
       ]), {maxWidth:280}
     ).addTo(layers.restaurants);
  });
  layers.restaurants.addTo(map);

  // Build stage panel
  buildStagePanel();

  elevInited = true;
}

// Kategorie-Filter (ersetzt toggleLayer)
let activeFilter = 'all';

function setFilter(type, btn){
  // Beim Klick auf bereits aktiven Button → zurück zu "Alle"
  if(type !== 'all' && activeFilter === type) type = 'all';
  activeFilter = type;

  // Button-Zustände
  document.querySelectorAll('.fbtn').forEach(b => {
    b.classList.remove('active','dimmed');
    if(b.id === 'fb-'+type || (type==='all' && b.id==='fb-all')){
      b.classList.add('active');
    } else if(type !== 'all'){
      b.classList.add('dimmed');
    }
  });

  // Layer-Sichtbarkeit
  if(window._map){
    ['sights','hotels','restaurants'].forEach(cat => {
      const show = (type === 'all' || type === cat);
      if(show && !window._map.hasLayer(layers[cat]))  window._map.addLayer(layers[cat]);
      if(!show && window._map.hasLayer(layers[cat]))  window._map.removeLayer(layers[cat]);
    });
  }

  // Filter-Liste aufbauen
  const list = document.getElementById('filter-list');
  if(type === 'all'){ list.classList.remove('open'); list.innerHTML = ''; return; }

  let html = '';
  if(type === 'sights'){
    const sorted = [...SIGHTS].sort((a,b) => a.day - b.day);
    html = `<div class="fl-hdr">Sehenswürdigkeiten (${sorted.length})</div>`;
    html += sorted.map(si =>
      `<div class="fl-item" onclick="flyToAndPopup(${si.lat},${si.lng})">
         <div class="fl-name">${si.ico} ${si.name}</div>
         <div class="fl-badges">
           <span class="fl-badge">Tag ${si.day}</span>
           <span class="fl-badge">${si.price}</span>
           <span class="fl-badge">${si.open}</span>
         </div>
         ${si.addr ? `<div class="fl-sub">${mapsAddr(si.lat,si.lng,si.name,si.addr)}</div>` : ''}
       </div>`).join('');
  } else if(type === 'hotels'){
    const sorted = [...HOTELS_DATA].sort((a,b) => a.day - b.day);
    html = `<div class="fl-hdr">Unterkünfte (${sorted.length})</div>`;
    html += sorted.map(h => {
      const s = STAGES.find(x => x.day === h.day);
      return `<div class="fl-item" onclick="flyToAndPopup(${s.lat},${s.lng})">
         <div class="fl-name">🏨 ${h.name}</div>
         <div class="fl-badges">
           <span class="fl-badge">Tag ${h.day} · ${h.ort}</span>
           <span class="fl-badge">${h.preis}</span>
         </div>
         ${h.addr ? `<div class="fl-sub">${mapsAddr(s.lat,s.lng,h.name,h.addr)}</div>` : ''}
       </div>`;}).join('');
  } else if(type === 'restaurants'){
    const sorted = [...RESTAURANTS].sort((a,b) => a.day - b.day);
    html = `<div class="fl-hdr">Restaurants (${sorted.length})</div>`;
    html += sorted.map(r =>
      `<div class="fl-item" onclick="flyToAndPopup(${r.lat},${r.lng})">
         <div class="fl-name">🍽️ ${r.name}</div>
         <div class="fl-badges">
           <span class="fl-badge">Tag ${r.day}</span>
         </div>
         <div class="fl-sub">${r.desc.length > 55 ? r.desc.slice(0,55)+'…' : r.desc}</div>
         ${r.addr ? `<div class="fl-sub">${mapsAddr(r.lat,r.lng,r.name,r.addr)}</div>` : ''}
       </div>`).join('');
  }
  list.innerHTML = html;
  list.classList.add('open');
}

function flyToAndPopup(lat, lng){
  if(!window._map) return;
  window._map.flyTo([lat,lng], 14, {duration:1.0});
}

function makeCircle(col, lbl, sz){
  const fs = sz * (lbl.length > 1 ? 0.38 : 0.45);
  return L.divIcon({
    html:`<div style="background:${col};width:${sz}px;height:${sz}px;border-radius:50%;border:2.5px solid white;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:${fs}px;box-shadow:0 2px 7px rgba(0,0,0,.35)">${lbl}</div>`,
    iconSize:[sz,sz],iconAnchor:[sz/2,sz/2],popupAnchor:[0,-sz/2],className:''
  });
}
function makeEmoji(emoji, col, sz=26){
  return L.divIcon({
    html:`<div style="background:${col};width:${sz}px;height:${sz}px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:${sz*0.52}px;box-shadow:0 2px 7px rgba(0,0,0,.3)">${emoji}</div>`,
    iconSize:[sz,sz],iconAnchor:[sz/2,sz/2],popupAnchor:[0,-sz/2],className:''
  });
}

// ═══════════════════════════════════════════════════
// ⑤ STAGE PANEL (rechts)
// ═══════════════════════════════════════════════════
function buildStagePanel(){
  const body = document.getElementById('sp-body');
  let html = '';
  STAGES.forEach(s => {
    const diff    = getDiff(s);
    const {col}   = DIFF[diff];
    const kmTxt   = s.km > 0 ? `${s.km} km` : '✨ Genuss';
    const diffLbl = DIFF[diff].label.replace(/\p{Emoji_Presentation}/gu,'').trim();

    const daySights = SIGHTS.filter(si => si.day === s.day);
    const dayRestos = RESTAURANTS.filter(r  => r.day  === s.day);
    const d = s.day;

    // ── Tab 1: Sights ──
    let sightsTab = '';
    if(daySights.length === 0){
      sightsTab = `<div style="font-size:.75rem;color:#aaa;padding:6px 2px">Keine Sehenswürdigkeiten für diesen Tag.</div>`;
    } else {
      sightsTab = daySights.map(si =>
        `<div class="spd-item" onclick="flyToAndPopup(${si.lat},${si.lng})">
           <div class="spd-name">${si.ico} ${si.name}</div>
           ${infoTable([
             ['💰', si.price],
             ['🕐', si.open],
             ['📍', mapsAddr(si.lat, si.lng, si.name, si.addr)],
             ['📞', si.tel ? `<a href="tel:${si.tel}">${si.tel}</a>` : ''],
             ['🌐', si.web ? `<a href="${si.web}" target="_blank">${shortUrl(si.web)}</a>` : ''],
           ])}
         </div>`).join('');
    }

    // ── Tab 2: Restaurants ──
    let essenTab = '';
    if(dayRestos.length === 0){
      essenTab = `<div style="font-size:.75rem;color:#aaa;padding:6px 2px">Keine Restaurantempfehlungen für diesen Tag.</div>`;
    } else {
      essenTab = dayRestos.map(r =>
        `<div class="spd-item" onclick="flyToAndPopup(${r.lat},${r.lng})">
           <div class="spd-name">${r.name}</div>
           ${infoTable([
             ['📝', r.desc],
             ['📍', mapsAddr(r.lat, r.lng, r.name, r.addr)],
             ['📞', r.tel ? `<a href="tel:${r.tel}">${r.tel}</a>` : ''],
           ])}
         </div>`).join('');
    }

    // ── Tab 3: Hotel ──
    const hd = HOTELS_DATA.find(h => h.day === s.day);
    const schlafenTab =
      `<div class="spd-item">
         <div class="spd-name">🏨 ${s.hotel}</div>
         ${infoTable([
           ['💰', hd ? hd.preis : ''],
           ['📝', s.hotel_note],
           ['📍', hd ? mapsAddr(s.lat, s.lng, s.hotel, hd.addr) : ''],
           ['📞', hd && hd.tel ? `<a href="tel:${hd.tel}">${hd.tel}</a>` : ''],
           ['🌐', hd && hd.web ? `<a href="${hd.web}" target="_blank">${shortUrl(hd.web)}</a>` : ''],
         ])}
       </div>`;

    // First tab is active by default
    const firstActive = daySights.length > 0 ? 'sights' : (dayRestos.length > 0 ? 'essen' : 'schlafen');

    const detailHtml =
      `<div class="spd-tabs">
         <button class="spd-tab${firstActive==='sights'?' active':''}" data-tab="sights"
           onclick="switchSpTab(${d},this.closest('.sp-detail'),this)">Sights (${daySights.length})</button>
         <button class="spd-tab${firstActive==='essen'?' active':''}" data-tab="essen"
           onclick="switchSpTab(${d},this.closest('.sp-detail'),this)">Essen (${dayRestos.length})</button>
         <button class="spd-tab${firstActive==='schlafen'?' active':''}" data-tab="schlafen"
           onclick="switchSpTab(${d},this.closest('.sp-detail'),this)">Schlafen</button>
       </div>
       <div id="spd-tab-${d}-sights" class="spd-tab-panel${firstActive==='sights'?' active':''}">${sightsTab}</div>
       <div id="spd-tab-${d}-essen"  class="spd-tab-panel${firstActive==='essen'?' active':''}">${essenTab}</div>
       <div id="spd-tab-${d}-schlafen" class="spd-tab-panel${firstActive==='schlafen'?' active':''}">${schlafenTab}</div>`;

    html += `
    <div class="sp-item" data-day="${d}" onclick="selectStageFromPanel(${d})">
      <div class="sp-day-badge" style="background:${col}">${d}</div>
      <div class="sp-info">
        <div class="sp-route">${s.from} → ${s.to}</div>
        <div class="sp-meta">${s.date}</div>
        ${s.km > 0 ? `<div class="sp-meta" style="margin-top:2px">↑ ${s.ascent} m &nbsp;↓ ${s.descent} m</div>` : ''}
      </div>
      <div class="sp-right">
        <div class="sp-km" style="color:${col}">${kmTxt}</div>
        <div class="sp-diff"><div class="sp-diff-dot" style="background:${col}"></div><span style="color:${col}">${diffLbl}</span></div>
      </div>
    </div>
    <div class="sp-detail" id="spd-${d}">${detailHtml}</div>`;
  });
  body.innerHTML = html;
}

function selectStageFromPanel(day){
  const s = STAGES.find(x => x.day === day);
  if(!s || !window._map) return;
  // Toggle: click active stage again → deselect
  if(activeStageDay === day){ resetStageSelection(); return; }
  window._map.flyTo([s.lat, s.lng], 12, {duration:1.2});
  setActiveStage(day);
}

function resetStageSelection(){
  activeStageDay = null;
  // Reset all segment styles
  if(window._segLines){
    Object.values(window._segLines).forEach(line =>
      line.setStyle({ weight: 4, opacity: 0.55 })
    );
  }
  // Deactivate all panel items
  document.querySelectorAll('.sp-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sp-detail').forEach(el => el.classList.remove('open'));
  // Redraw chart without highlight
  if(window._elevChart) window._elevChart.update();
}

function toggleLegend(){
  const body = document.getElementById('legend-body');
  const tog  = document.getElementById('legend-tog');
  const open = body.classList.toggle('open');
  tog.classList.toggle('active', open);
}

function switchSpTab(day, panel, btn){
  // Deactivate all tabs + panels in this detail block
  panel.querySelectorAll('.spd-tab').forEach(t => t.classList.remove('active'));
  panel.querySelectorAll('.spd-tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const target = document.getElementById('spd-tab-'+day+'-'+btn.dataset.tab);
  if(target) target.classList.add('active');
}

// ═══════════════════════════════════════════════════
// ⑥ ELEVATION CHART
// ═══════════════════════════════════════════════════
let elevOpen = false;

function toggleElev(){
  elevOpen = !elevOpen;
  const inner = document.getElementById('elev-inner');
  const handle = document.getElementById('elev-handle');
  inner.classList.toggle('open', elevOpen);
  handle.classList.toggle('open', elevOpen);
  const txt = document.getElementById('elev-handle-txt');
  txt.textContent = elevOpen ? 'Streckenprofil & Schwierigkeit' : 'Streckenprofil & Schwierigkeit anzeigen';
  // Adjust map height so the route stays visible above the elevation chart
  const mapEl = document.getElementById('the-map');
  if(mapEl) mapEl.style.bottom = elevOpen ? '190px' : '0';
  if(elevOpen && window._map) setTimeout(() => window._map.invalidateSize(), 320);
  if(elevOpen && !window._elevChart) drawElevChart();
}


function drawElevChart(){
  const canvas = document.getElementById('elev-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  const stageKmBounds = [
    {from:0,  to:11,  day:1},
    {from:11, to:26,  day:2},
    {from:26, to:41,  day:3},
    {from:41, to:56,  day:4},
    {from:56, to:64,  day:5},
    {from:64, to:77,  day:6},
    {from:77, to:91,  day:7},
    {from:91, to:106, day:9},
    {from:106,to:121, day:10},
    {from:121,to:136, day:11},
    {from:136,to:151, day:13},
    {from:151,to:169, day:14},
    {from:169,to:184, day:15},
    {from:184,to:196, day:16},
  ];

  const chartData = ELEV.map(p => ({x: p[0], y: p[1]}));

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, 120);
  grad.addColorStop(0, 'rgba(58,107,74,.4)');
  grad.addColorStop(1, 'rgba(58,107,74,.03)');

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets:[{
        data: chartData,
        borderColor: '#3a6b4a',
        borderWidth: 1.8,
        fill: true,
        backgroundColor: grad,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 4
      }]
    },
    options:{
      responsive: true,
      maintainAspectRatio: false,
      interaction: {intersect:false, mode:'index'},
      animation: {duration: 300},
      plugins:{
        legend:{display:false},
        tooltip:{
          callbacks:{
            title: ctx => `${ctx[0].parsed.x.toFixed(1)} km`,
            label: ctx => `${ctx.parsed.y} m ü.NN`
          }
        }
      },
      scales:{
        x:{type:'linear',min:0,max:200,
           title:{display:false},
           ticks:{stepSize:25,font:{size:9},color:'#999'},
           grid:{color:'rgba(0,0,0,.06)'}},
        y:{min:300,max:680,
           ticks:{stepSize:100,font:{size:9},color:'#999'},
           grid:{color:'rgba(0,0,0,.06)'}}
      }
    },
    plugins:[{
      afterDraw(chart){
        const ctx2 = chart.ctx;
        const xs = chart.scales.x, ys = chart.scales.y;
        stageKmBounds.forEach(z => {
          const s = STAGES.find(st => st.day === z.day);
          const diff = getDiff(s);
          const col  = DIFF[diff].col;
          const x1 = xs.getPixelForValue(z.from), x2 = xs.getPixelForValue(z.to);
          const isAnsp = diff === 'anspruchsvoll';

          // Shaded zone — stronger for anspruchsvoll
          ctx2.fillStyle = hexToRgba(col, isAnsp ? 0.15 : 0.07);
          ctx2.fillRect(x1, ys.top, x2-x1, ys.bottom-ys.top);

          // Extra top bar for anspruchsvoll
          if(isAnsp){
            ctx2.fillStyle = hexToRgba(col, 0.55);
            ctx2.fillRect(x1, ys.top, x2-x1, 3);
          }

          // Active stage highlight
          if(s.day === activeStageDay){
            ctx2.fillStyle = hexToRgba(col, 0.22);
            ctx2.fillRect(x1, ys.top, x2-x1, ys.bottom-ys.top);
          }

          // Boundary line at end
          ctx2.save();
          ctx2.strokeStyle = hexToRgba(col, 0.45);
          ctx2.lineWidth = 1;
          ctx2.setLineDash([3,3]);
          ctx2.beginPath();
          ctx2.moveTo(x2, ys.top);
          ctx2.lineTo(x2, ys.bottom);
          ctx2.stroke();
          // Day number label at top
          const xMid = (x1+x2)/2;
          ctx2.fillStyle = col;
          ctx2.font = `bold 8px -apple-system,sans-serif`;
          ctx2.textAlign = 'center';
          ctx2.fillText(z.day, xMid, ys.top + 9);
          ctx2.restore();
        });
      }
    }]
  });
  window._elevChart = chart;
}

function highlightStageOnChart(day){
  if(!window._elevChart) return;
  window._elevChart.update(); // triggers afterDraw → redraws active stage highlight
}

function hexToRgba(hex, alpha){
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ═══════════════════════════════════════════════════
// ⑦ ETAPPEN LIST
// ═══════════════════════════════════════════════════
function buildEtappen(){
  const wrap = document.getElementById('etappen-list');
  STAGES.forEach(s => {
    const diff = getDiff(s);
    const {col} = DIFF[diff];
    const isRest = s.type === 'rest', isLong = s.type === 'long';
    const kmTxt = isRest ? '✨ Genuss' : (isLong ? '⚠️ '+s.km+' km' : (s.type==='finale'?'🎉 '+s.km+' km':s.km+' km'));
    const hlHtml = s.highlights.map(h => `<div class="hl-row"><div class="hl-ico">${h.ico}</div><div class="hl-txt">${h.txt}</div></div>`).join('');
    const card = document.createElement('div');
    card.className = 'e-card';
    card.innerHTML = `
      <div class="e-hdr" onclick="toggleE(this)">
        <div class="e-num ${isRest?'rest':isLong?'long':''}" style="background:${col}">${s.day}</div>
        <div class="e-info">
          <div class="e-route">${s.from} → ${s.to}</div>
          <div class="e-meta">${s.date} &nbsp;·&nbsp; <span style="color:${col};font-weight:600">${DIFF[diff].label}</span></div>
        </div>
        <div class="e-km ${isRest?'rest':isLong?'long':''}">${kmTxt}</div>
        <div class="e-chev">▶</div>
      </div>
      <div class="e-body">
        ${!isRest ? `<div class="e-elev"><span class="eu">↑ ${s.ascent} m</span><span class="ed">↓ ${s.descent} m</span><span style="font-size:.72rem;color:#888">${DIFF[diff].desc}</span></div>` : ''}
        <div class="e-hl-title">Highlights</div>
        ${hlHtml}
        <div class="e-uk"><div class="uk-lbl">🏨 Unterkunft</div><div class="uk-name">${s.hotel}</div><div class="uk-det">${s.hotel_note}</div></div>
      </div>`;
    wrap.appendChild(card);
  });
}
function toggleE(hdr){ hdr.classList.toggle('open'); hdr.nextElementSibling.classList.toggle('open'); }
buildEtappen();

// ═══════════════════════════════════════════════════
// ⑧ SIGHTS LIST
// ═══════════════════════════════════════════════════
function buildSights(filter){
  const wrap = document.getElementById('sights-list');
  wrap.innerHTML = '';
  const list = (filter === 'all' ? SIGHTS : SIGHTS.filter(s => s.cat === filter))
    .slice().sort((a,b) => a.day - b.day);

  // Nach Tag gruppieren
  const byDay = {};
  list.forEach(s => { (byDay[s.day] = byDay[s.day] || []).push(s); });

  Object.keys(byDay).map(Number).sort((a,b)=>a-b).forEach(day => {
    const stage = STAGES.find(s => s.day === day);
    // Tages-Überschrift
    const hdr = document.createElement('div');
    hdr.className = 'sights-day-hdr';
    hdr.innerHTML = `<span class="sdh-num">Tag ${day}</span>`+
      (stage ? `<span class="sdh-route">${stage.from} → ${stage.to}</span>` : '')+
      `<span class="sdh-date">${stage ? stage.date : ''}</span>`;
    wrap.appendChild(hdr);

    byDay[day].forEach(s => {
      const div = document.createElement('div');
      div.className = 'sight-c';
      div.innerHTML = `<div class="s-ico">${s.ico}</div><div class="s-info">
        <div class="s-name">${s.name}</div>
        <div class="s-desc">${s.desc}</div>
        ${infoTable([
          ['💰 Preis',  s.price],
          ['🕐 Öffnung',s.open],
          ['📍 Adresse',mapsAddr(s.lat, s.lng, s.name, s.addr)],
          ['📞 Tel',    s.tel ? `<a href="tel:${s.tel}">${s.tel}</a>` : ''],
          ['🌐 Website',s.web ? `<a href="${s.web}" target="_blank">${shortUrl(s.web)}</a>` : ''],
        ])}
      </div>`;
      wrap.appendChild(div);
    });
  });
}
function filterSights(cat,btn){
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  buildSights(cat);
}
buildSights('all');

// ═══════════════════════════════════════════════════
// ⑨ PACKLISTE
// ═══════════════════════════════════════════════════
const PACK_KEY = 'altmuehltal_pack_v2';
function loadPack(){ try { return JSON.parse(localStorage.getItem(PACK_KEY))||{}; } catch(e){ return {}; } }
function savePack(s){ try { localStorage.setItem(PACK_KEY,JSON.stringify(s)); } catch(e){} }
function buildPack(){
  const wrap = document.getElementById('pack-list');
  wrap.innerHTML = '';
  const state = loadPack();
  PACK_DATA.forEach(cat => {
    const sec = document.createElement('div');
    sec.className = 'pk-cat';
    sec.innerHTML = `<div class="pk-cat-hdr">${cat.cat}</div>`;
    cat.items.forEach((item,i) => {
      const key = cat.cat+'_'+i;
      const done = !!state[key];
      const el = document.createElement('div');
      el.className = 'pk-item'+(done?' done':'');
      el.innerHTML = `<div class="pk-box">${done?'✓':''}</div><div class="pk-txt"><div class="pk-main">${item.txt}</div>${item.sub?`<div class="pk-sub">${item.sub}</div>`:''}</div>`;
      el.onclick = () => {
        const s = loadPack();
        const nd = !el.classList.contains('done');
        el.classList.toggle('done',nd);
        el.querySelector('.pk-box').textContent = nd?'✓':'';
        s[key] = nd?1:0; savePack(s); updatePackProg();
      };
      sec.appendChild(el);
    });
    wrap.appendChild(sec);
  });
  updatePackProg();
}
function updatePackProg(){
  const state = loadPack();
  const total = PACK_DATA.reduce((a,c)=>a+c.items.length,0);
  const done = Object.values(state).filter(v=>v).length;
  document.getElementById('pk-status').textContent = `${done} von ${total} erledigt`;
  document.getElementById('pk-bar').style.width = `${(done/total)*100}%`;
}
function resetPack(){ if(confirm('Alle Häkchen zurücksetzen?')){ localStorage.removeItem(PACK_KEY); buildPack(); } }
function checkAllPack(){
  const s={};
  PACK_DATA.forEach((cat,ci) => cat.items.forEach((_,i) => { s[cat.cat+'_'+i]=1; }));
  savePack(s); buildPack();
}
buildPack();

// ═══════════════════════════════════════════════════
// ⑩ ESSEN & TIPPS & HOTELS
// ═══════════════════════════════════════════════════
function buildEssen(){
  // Restaurants nach Tag sortieren: ESSEN_DATA mit RESTAURANTS-Koordinaten anreichern
  const sorted = [...ESSEN_DATA.highlights].sort((a,b) => {
    const da = parseInt(a.day) || 0, db = parseInt(b.day) || 0;
    return da - db;
  });
  let h = '<div class="food-sec"><div class="food-sec-hdr">🌟 Restaurant-Highlights</div>';
  sorted.forEach(r => {
    // Koordinaten aus RESTAURANTS für Maps-Link suchen
    const match = RESTAURANTS.find(x => x.name === r.name || x.name.includes(r.name.split(' ')[0]));
    const addrLink = (match && r.addr) ? mapsAddr(match.lat, match.lng, r.name, r.addr) : (r.addr || '');
    h += `<div class="food-c">
      <div class="food-name">${r.name}</div>
      ${infoTable([
        ['📅',  r.day],
        ['📍',  addrLink],
        ['📞',  r.tel ? `<a href="tel:${r.tel}">${r.tel}</a>` : ''],
      ])}
      <div class="food-desc">${r.desc}</div>
    </div>`;
  });
  h += '</div><div class="food-sec"><div class="food-sec-hdr">🎒 Verpflegung unterwegs</div><div class="food-c">';
  ESSEN_DATA.trail.forEach(t => { h += `<div class="food-trail-item"><div class="fi">${t.ico}</div><div>${t.txt}</div></div>`; });
  document.getElementById('essen-list').innerHTML = h + '</div></div>';
}
buildEssen();

function buildTipps(){
  document.getElementById('tipps-list').innerHTML = TIPPS_DATA.map(sec =>
    `<div class="tip-c"><h3>${sec.title}</h3>${sec.items.map(t=>`<div class="tip-row"><div class="ti">${t.ico}</div><p>${t.txt}</p></div>`).join('')}</div>`
  ).join('');
}
buildTipps();

function buildHotels(){
  const sorted = [...HOTELS_DATA].sort((a,b) => a.day - b.day);
  document.getElementById('hotels-list').innerHTML = sorted.map(h => {
    const s = STAGES.find(x=>x.day===h.day);
    const diff = getDiff(s);
    const col = DIFF[diff].col;
    return `<div class="e-card" style="margin:8px 12px 0">
      <div style="padding:11px 12px;display:flex;gap:10px;align-items:flex-start">
        <div class="e-num" style="background:${col};flex-shrink:0">${h.day}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:.86rem;color:#1e3a28">${h.name}</div>
          <div style="font-size:.72rem;color:#999;margin-bottom:4px">${h.ort}</div>
          ${infoTable([
            ['💰 Preis',  h.preis],
            ['📝 Notiz',  h.note],
            ['📍 Adresse',mapsAddr(s.lat, s.lng, h.name, h.addr)],
            ['📞 Tel',    h.tel ? `<a href="tel:${h.tel}">${h.tel}</a>` : ''],
            ['🌐 Website',h.web ? `<a href="${h.web}" target="_blank">${shortUrl(h.web)}</a>` : ''],
          ])}
        </div>
      </div>
    </div>`;
  }).join('');
}
buildHotels();


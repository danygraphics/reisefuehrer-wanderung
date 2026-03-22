#!/usr/bin/env node
// ═══════════════════════════════════════════════════════
// build.js – Altmühltal PWA Builder
//
// Liest die Quelldateien (app.css, data.js, app.js) und
// bündelt alles in eine einzelne index.html.
//
// Verwendung: node build.js
// ═══════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

const BASE = __dirname;

const css    = fs.readFileSync(path.join(BASE, 'app.css'),  'utf8');
const dataJs = fs.readFileSync(path.join(BASE, 'data.js'),  'utf8');
const appJs  = fs.readFileSync(path.join(BASE, 'app.js'),   'utf8');

const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>🥾 Altmühltal 2026</title>

<!-- PWA (nur aktiv wenn über HTTPS ausgeliefert) -->
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#1e3a28">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Altmühltal">
<link rel="apple-touch-icon" href="icons/icon-192.png">

<!-- Externe Libraries (CDN) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>

<!-- App Styles (inline) -->
<style>
${css}
</style>
</head>
<body>

<!-- ╔══ HEADER ══╗ -->
<header class="app-hdr">
  <div class="hdr-row">
    <div class="hdr-title">🥾 Altmühltal-Panoramaweg</div>
    <div class="hdr-badge" id="cntdwn">…</div>
  </div>
  <div class="hdr-sub">Dany &amp; Lena · 13.–28. April 2026 · Gunzenhausen → Kelheim</div>
</header>

<!-- ╔══ MAIN BODY ══╗ -->
<div class="app-body">

  <!-- ═══ HOME ═══ -->
  <div id="pg-home" class="page active">
    <div class="hero"><h1>🏔️ Euer Abenteuer wartet!</h1><p>196 km · 16 Tage · Fränkisches Jura</p><div class="countdown" id="hero-cntdwn">…</div></div>
    <div class="stats-g">
      <div class="stat-c"><div class="stat-n">~199</div><div class="stat-l">km Gesamtstrecke</div></div>
      <div class="stat-c"><div class="stat-n">16</div><div class="stat-l">Tage (14 Wander + 2 Genuss)</div></div>
      <div class="stat-c"><div class="stat-n">7.774</div><div class="stat-l">m Höhenmeter ↑</div></div>
      <div class="stat-c"><div class="stat-n">~14 km</div><div class="stat-l">Ø Tagesetappe</div></div>
    </div>
    <div class="info-c"><h3>📍 Auf einen Blick</h3><ul>
      <li><b>Route:</b> Gunzenhausen → Kelheim (Einseitig)</li>
      <li><b>Anreise:</b> Dortmund → Gunzenhausen (~4–5h Bahn über Nürnberg)</li>
      <li><b>Rückreise:</b> Kelheim → Regensburg (Bus) → Dortmund (ICE)</li>
      <li><b>Markierung:</b> Gelb-rote Schilder, durchgängig beschildert</li>
      <li><b>Wanderpass:</b> Stempel sammeln → Urkunde in Kelheim</li>
    </ul></div>
    <div class="info-c"><h3>✨ Genusstage</h3><ul>
      <li><b>Tag 8 – Eichstätt (Mo 20.04.):</b> Jura-Museum, Galerien, Franziska besuchen</li>
      <li><b>Tag 12 – Beilngries (Fr 24.04.):</b> Spa House Hotel Die Gams (Pool, Sauna – inkl.!)</li>
    </ul></div>
    <div class="info-c"><h3>🦕 Dino-Highlights</h3><ul>
      <li><b>Solnhofen (Tag 5):</b> 3 Archaeopteryx-Originale + selbst Fossilien klopfen</li>
      <li><b>Eichstätt (Tag 8):</b> Jura-Museum Willibaldsburg – Archaeopteryx + Korallenriff-Aquarium</li>
    </ul></div>
    <div class="info-c"><h3>💰 Budget pro Person</h3><ul>
      <li>Unterkunft (DZ geteilt): 35–60 €/Nacht → <b>560–960 €</b></li>
      <li>Essen (Mittag + Abend): 25–40 €/Tag → <b>400–640 €</b></li>
      <li>Eintritte &amp; Thermen: ~5 €/Tag → <b>~80 €</b></li>
      <li>Gesamt pro Person: <b>~1.000–1.700 €</b></li>
    </ul></div>
    <div class="banner-note">☑️ <b>Noch offen:</b> Hotel Die Gams buchen · Unterkunft Solnhofen anfragen · Wanderführer bestellen · Schifffahrt Weltenburg prüfen</div>
    <div style="height:12px"></div>
  </div>

  <!-- ═══ KARTE (KOMBINIERT) ═══ -->
  <div id="pg-karte" class="page">
    <div id="map-wrap">
      <div id="the-map"></div>

      <!-- Filter-Panel oben links -->
      <div id="filter-panel">
        <div id="filter-btns">
          <button class="fbtn active" id="fb-all"    onclick="setFilter('all',this)">🗺️ Alle anzeigen</button>
          <button class="fbtn"        id="fb-sights" onclick="setFilter('sights',this)">🎯 Sehenswürdigkeiten</button>
          <button class="fbtn"        id="fb-hotels" onclick="setFilter('hotels',this)">🏨 Unterkünfte</button>
          <button class="fbtn"        id="fb-resto"  onclick="setFilter('restaurants',this)">🍽️ Restaurants</button>
        </div>
        <div id="filter-list"></div>
      </div>

      <!-- Etappen-Panel Toggle oben rechts -->
      <button id="panel-tog" onclick="togglePanel()">
        <span class="pt-ico">📅</span> Etappen
      </button>

      <!-- Stage Panel (rechts, ausklappbar) -->
      <div id="stage-panel">
        <div id="sp-hdr">
          <span>📅 Etappenplan</span>
          <div style="display:flex;gap:7px;align-items:center">
            <button id="sp-reset" onclick="resetStageSelection()" title="Alle Etappen anzeigen">⟳ Alle</button>
            <button id="sp-close" onclick="togglePanel()">✕</button>
          </div>
        </div>
        <div id="sp-diff-legend">
          <div class="dl-item"><div class="dl-dot" style="background:#27ae60"></div>Leicht</div>
          <div class="dl-item"><div class="dl-dot" style="background:#e67e22"></div>Mittel</div>
          <div class="dl-item"><div class="dl-dot" style="background:#e74c3c"></div>Schwer</div>
          <div class="dl-item"><div class="dl-dot" style="background:#8e44ad"></div>Anspruchsvoll</div>
          <div class="dl-item"><div class="dl-dot" style="background:#c97d2a"></div>Genusstag</div>
        </div>
        <div id="sp-body"></div>
      </div>

      <!-- Höhenprofil (unten, aufklappbar) -->
      <div id="elev-wrap">
        <div id="elev-handle" onclick="toggleElev()">
          <span style="margin-right:6px">📈</span>
          <span id="elev-handle-txt">Streckenprofil &amp; Schwierigkeit anzeigen</span>
          <span id="elev-handle-arrow" style="margin-left:auto">▲</span>
        </div>
        <div id="elev-inner">
          <canvas id="elev-canvas"></canvas>
        </div>
      </div>

      <!-- Legende -->
      <div id="map-legend">
        <button id="legend-tog" onclick="toggleLegend()">🗺️ Legende</button>
        <div id="legend-body">
          <div class="leg-sec">Schwierigkeit (Strecke)</div>
          <div class="leg-row"><div class="leg-line" style="background:#27ae60"></div>Leicht</div>
          <div class="leg-row"><div class="leg-line" style="background:#e67e22"></div>Mittel</div>
          <div class="leg-row"><div class="leg-line" style="background:#e74c3c"></div>Schwer</div>
          <div class="leg-row"><div class="leg-line" style="background:#8e44ad"></div>Anspruchsvoll</div>
          <div class="leg-row"><div class="leg-line" style="background:#c97d2a"></div>Genusstag</div>
          <div class="leg-sec">Kategorien</div>
          <div class="leg-row"><div class="leg-pin" style="background:#3a7d5e;color:#fff">🎯</div>Sehenswürdigkeit</div>
          <div class="leg-row"><div class="leg-pin" style="background:#2c5f8a;color:#fff">🏨</div>Unterkunft</div>
          <div class="leg-row"><div class="leg-pin" style="background:#b85c20;color:#fff">🍽️</div>Restaurant</div>
        </div>
      </div>
    </div><!-- /map-wrap -->
  </div><!-- /pg-karte -->

  <!-- ═══ ETAPPEN (List-Ansicht) ═══ -->
  <div id="pg-etappen" class="page">
    <div class="pg-hdr"><h2>📅 Tagesetappenplan</h2></div>
    <div class="pg-sub">Tippe auf einen Tag für Details</div>
    <div id="etappen-list"></div>
    <div style="height:12px"></div>
  </div>

  <!-- ═══ SEHENSWÜRDIGKEITEN ═══ -->
  <div id="pg-sights" class="page">
    <div class="pg-hdr"><h2>🎯 Sehenswürdigkeiten</h2></div>
    <div class="pg-sub">Priorisiert nach euren Interessen</div>
    <div class="filter-bar">
      <button class="f-btn on" onclick="filterSights('all',this)">Alle</button>
      <button class="f-btn" onclick="filterSights('dino',this)">🦕 Dino &amp; Fossil</button>
      <button class="f-btn" onclick="filterSights('burg',this)">🏰 Burgen</button>
      <button class="f-btn" onclick="filterSights('therm',this)">♨️ Wellness</button>
      <button class="f-btn" onclick="filterSights('natur',this)">🌿 Natur</button>
      <button class="f-btn" onclick="filterSights('kultur',this)">🎨 Kunst &amp; Kultur</button>
    </div>
    <div id="sights-list"></div>
    <div style="height:12px"></div>
  </div>

  <!-- ═══ PACKLISTE ═══ -->
  <div id="pg-pack" class="page">
    <div class="pg-hdr"><h2>🎒 Packliste</h2></div>
    <div class="pg-sub">Tippe zum Abhaken · wird gespeichert</div>
    <div class="pk-prog">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:.82rem;font-weight:600;color:#3a6b4a">Fortschritt</span>
        <span class="pk-prog-txt" id="pk-status">0 von 0 erledigt</span>
      </div>
      <div class="pk-prog-bar"><div class="pk-prog-fill" id="pk-bar" style="width:0%"></div></div>
    </div>
    <div class="pk-actions">
      <button class="pk-btn outline" onclick="resetPack()">↺ Zurücksetzen</button>
      <button class="pk-btn" onclick="checkAllPack()">✓ Alle abhaken</button>
    </div>
    <div id="pack-list"></div>
    <div style="height:12px"></div>
  </div>

  <!-- ═══ ESSEN ═══ -->
  <div id="pg-essen" class="page">
    <div class="pg-hdr"><h2>🍽️ Essen &amp; Trinken</h2></div>
    <div class="pg-sub">Restaurant-Highlights &amp; Verpflegung unterwegs</div>
    <div id="essen-list"></div>
    <div style="height:12px"></div>
  </div>

  <!-- ═══ TIPPS ═══ -->
  <div id="pg-tipps" class="page">
    <div class="pg-hdr"><h2>💡 Tipps &amp; Tricks</h2></div>
    <div class="pg-sub">Vorbereitung für eine entspannte Wanderung</div>
    <div id="tipps-list"></div>
    <div style="height:12px"></div>
  </div>

  <!-- ═══ UNTERKÜNFTE ═══ -->
  <div id="pg-hotels" class="page">
    <div class="pg-hdr"><h2>🏨 Unterkünfte</h2></div>
    <div class="pg-sub">Empfehlungen pro Etappenort</div>
    <div id="hotels-list"></div>
    <div style="height:12px"></div>
  </div>

</div><!-- /app-body -->

<!-- ╔══ BOTTOM NAV ══╗ -->
<nav class="bot-nav">
  <button class="nav-btn on"  onclick="gotoPage('home',this)"><div class="ico">🏠</div>Heim</button>
  <button class="nav-btn"     onclick="gotoPage('karte',this)"><div class="ico">🗺️</div>Karte</button>
  <button class="nav-btn"     onclick="gotoPage('etappen',this)"><div class="ico">📅</div>Etappen</button>
  <button class="nav-btn"     onclick="gotoPage('pack',this)"><div class="ico">🎒</div>Packliste</button>
  <button class="nav-btn"     onclick="toggleMoreMenu(this)"><div class="ico">☰</div>Mehr</button>
</nav>

<!-- Mehr-Menü -->
<div id="more-menu" style="display:none;position:fixed;bottom:calc(52px + env(safe-area-inset-bottom));left:0;right:0;background:rgba(0,0,0,.4);z-index:5000" onclick="if(event.target===this)closeMoreMenu()">
  <div style="background:#fff;border-radius:14px 14px 0 0;padding:8px 0 12px">
    <div style="text-align:center;padding:6px 0 10px;font-size:.72rem;color:#aaa;text-transform:uppercase;letter-spacing:.06em">Mehr</div>
    <div onclick="gotoPage('sights',null);closeMoreMenu()" style="display:flex;align-items:center;gap:12px;padding:13px 20px;cursor:pointer;border-bottom:1px solid #f0ede8"><span style="font-size:1.4rem">🎯</span><span style="font-size:.9rem;font-weight:600">Sehenswürdigkeiten</span></div>
    <div onclick="gotoPage('hotels',null);closeMoreMenu()" style="display:flex;align-items:center;gap:12px;padding:13px 20px;cursor:pointer;border-bottom:1px solid #f0ede8"><span style="font-size:1.4rem">🏨</span><span style="font-size:.9rem;font-weight:600">Unterkünfte</span></div>
    <div onclick="gotoPage('essen',null);closeMoreMenu()" style="display:flex;align-items:center;gap:12px;padding:13px 20px;cursor:pointer;border-bottom:1px solid #f0ede8"><span style="font-size:1.4rem">🍽️</span><span style="font-size:.9rem;font-weight:600">Essen &amp; Restaurants</span></div>
    <div onclick="gotoPage('tipps',null);closeMoreMenu()" style="display:flex;align-items:center;gap:12px;padding:13px 20px;cursor:pointer"><span style="font-size:1.4rem">💡</span><span style="font-size:.9rem;font-weight:600">Tipps &amp; Tricks</span></div>
  </div>
</div>

<!-- Externe Libraries (CDN) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>

<!-- App-Daten (inline) -->
<script>
${dataJs}
</script>

<!-- App-Logik (inline) -->
<script>
${appJs}
</script>

<!-- Service Worker – nur unter HTTPS registrieren -->
<script>
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(r  => console.log('[SW] Registriert:', r.scope))
      .catch(e => console.warn('[SW] Registrierung fehlgeschlagen:', e));
  });
}
</script>

</body>
</html>
`;

fs.writeFileSync(path.join(BASE, 'index.html'), html, 'utf8');

const lines = html.split('\n').length;
const kb    = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
console.log(`✅ index.html gebaut: ${lines} Zeilen, ${kb} KB`);
console.log(`   CSS:     ${css.split('\n').length} Zeilen`);
console.log(`   data.js: ${dataJs.split('\n').length} Zeilen`);
console.log(`   app.js:  ${appJs.split('\n').length} Zeilen`);

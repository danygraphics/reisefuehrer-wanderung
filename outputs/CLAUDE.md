# Altmühltal-Panoramaweg 2026 – Interaktiver Reiseführer

## Projekt
PWA-Reiseführer für eine 16-tägige Wanderung (Dany & Lena, 13.–28. April 2026, Gunzenhausen → Kelheim, ~199 km). Single-page App mit Leaflet-Karte, Chart.js-Höhenprofil, Packliste und Etappenplanung.

## Dateistruktur
```
app.css       ← Styles (Quelle)
data.js       ← Reisedaten: TRACK, ELEV, STAGES, SIGHTS, RESTAURANTS, etc. (Quelle)
app.js        ← App-Logik: 33 Funktionen (Quelle)
build.js      ← Bundler: liest Quellen → schreibt index.html
index.html    ← Build-Artefakt (NICHT direkt editieren!)
manifest.json ← PWA-Manifest
sw.js         ← Service Worker (Cache-Strategie)
icons/        ← PWA-Icons (192px, 512px)
```

## Build-Workflow
- **Quelldateien editieren**: `app.css`, `data.js`, `app.js`
- **Danach bauen**: `node build.js` → erzeugt `index.html` mit allem inline
- **Niemals `index.html` direkt editieren** – wird beim nächsten Build überschrieben
- Die Cowork-Vorschau kann nur einzelne HTML-Dateien rendern (keine lokalen `src="…"`-Referenzen), deshalb das Build-System

## Tech-Stack
- **Leaflet 1.9.4** (CDN) – Karte mit OSM-Tiles
- **Chart.js 4.4.1** (CDN) – Höhenprofil
- **Vanilla JS** – kein Framework, keine Build-Tools außer `build.js`
- **localStorage** – Packlisten-Fortschritt

## Architektur-Überblick
- 8 Seiten via Bottom-Nav (Home, Karte, Etappen, Packliste + 4 im Mehr-Menü)
- Karte hat 5 z-index-Schichten: Map, Filter-Panel, Stage-Panel, Elevation, Legende
- `getDiff()` berechnet Schwierigkeit: `kmPts + elevPts × 1.5` → leicht/mittel/schwer/anspruchsvoll/genuss
- `STAGE_SEGS` IIFE teilt 374 GPX-Punkte per Haversine-Distanz in 14 Etappensegmente
- Detaildiagramm: `app-architektur.mermaid`

## Wichtige Gotchas
- **Leaflet Popup-X-Button**: `map.on('popupopen')` patcht `href="#close"` → sonst externer Link-Dialog in Sandbox-Umgebungen
- **Chart.js update**: `chart.update()` ohne Argumente aufrufen (nicht `chart.update('none')`) damit `afterDraw`-Plugin korrekt feuert
- **Höhenprofil**: Wenn Elevation-Panel offen → `#the-map` braucht `style.bottom = '190px'`
- **SW nur HTTPS**: Service Worker registriert sich nur unter `location.protocol === 'https:'`
- **iOS PWA**: Kein Install-Banner. User muss Safari → Teilen → „Zum Home-Bildschirm"

## Deployment
GitHub Pages: Repo → Settings → Pages → Branch main / root. URL dann in Safari öffnen und zum Home-Bildschirm hinzufügen.

## Sprache
Kommentare und Commit-Messages auf Deutsch (Projekt-Sprache). Code-Identifier auf Englisch.

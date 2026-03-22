# 🥾 Altmühltal-Panoramaweg 2026

Interaktiver Reiseführer für die Wanderung Gunzenhausen → Kelheim (196 km, 16 Tage, April 2026).

---

## Dateistruktur

```
outputs/
├── index.html          ← Build-Artefakt (nicht direkt editieren!)
├── app.css             ← Quelldatei: alle Styles
├── data.js             ← Quelldatei: alle Reisedaten
├── app.js              ← Quelldatei: gesamte App-Logik
├── build.js            ← Build-Script (Node.js)
├── manifest.json       ← PWA-Konfiguration
├── sw.js               ← Service Worker (Offline-Caching)
├── icons/
│   ├── icon-192.png    ← App-Icon (Home Screen / Android)
│   └── icon-512.png    ← App-Icon (Splash Screen)
└── app-architektur.mermaid  ← Architektur-Diagramm
```

---

## Build-Prozess

Die App besteht aus **Quelldateien** (`app.css`, `data.js`, `app.js`) und einer **gebauten `index.html`**, die alles inline enthält.

> ⚠️ `index.html` wird automatisch generiert – nie direkt bearbeiten, Änderungen gehen beim nächsten Build verloren.

### Nach jeder Änderung an Quelldateien:

```bash
node build.js
```

Das Script liest `app.css`, `data.js` und `app.js` und schreibt eine fertige `index.html` mit allen Styles und Scripts inline.

**Warum inline?** Die Cowork-Vorschau und GitHub Pages benötigen eine einzelne, selbstständige HTML-Datei. Externe lokale Script-Referenzen (`src="app.js"`) werden in der Vorschau nicht aufgelöst.

---

## Was wo editiert wird

| Ich möchte…                              | Datei editieren |
|------------------------------------------|-----------------|
| Layout, Farben, Abstände ändern          | `app.css`       |
| Hotel/Restaurant/Sight hinzufügen        | `data.js`       |
| Etappendaten korrigieren                 | `data.js`       |
| Packliste anpassen                       | `data.js`       |
| Neue Funktion / UI-Verhalten hinzufügen  | `app.js`        |
| App-Name, Theme-Farbe, Icons             | `manifest.json` |
| Offline-Verhalten anpassen              | `sw.js`         |

---

## PWA – Deployment auf GitHub Pages

1. Alle Dateien in das GitHub-Repo pushen (inkl. `icons/`, `manifest.json`, `sw.js`)
2. GitHub Pages aktivieren: **Settings → Pages → Branch: main / root**
3. App-URL in Safari (iPhone) öffnen
4. **Teilen → „Zum Home-Bildschirm"** → App ist installiert 🥾

Der Service Worker registriert sich automatisch unter `https://` und cached:
- `index.html`, `manifest.json`, Icons beim ersten Aufruf
- OSM-Kartenkacheln beim Browsen (einmal angeschaut = offline verfügbar)

---

## Cowork-Vorschau

Die Vorschau in Cowork öffnet `index.html` direkt – das funktioniert, weil alle Scripts und Styles inline sind. Der Service Worker wird in der Vorschau **nicht** registriert (nur unter `https://` aktiv), das ist korrekt und erzeugt keinen Fehler.

---

## Architektur auf einen Blick

```
app.css  ──┐
data.js  ──┤  node build.js  ──→  index.html  ──→  Cowork-Vorschau
app.js   ──┘                                   ──→  GitHub Pages (PWA)
```

Für eine detaillierte Übersicht aller Komponenten: `app-architektur.mermaid`

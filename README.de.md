# Monatlicher Projekt- & Kalenderplaner (A4 Druckformat)

Ein minimalistischer, tinten- und tonersparender A4-Monats- und Projektplaner für das Drucken auf Papier oder das Speichern als PDF.

[ **English** ](README.md) | [ **Deutsch** ] | [ **Türkçe** ](README.tr.md) | [ **Русский** ](README.ru.md) | [ **Azərbaycan** ](README.az.md)

**Live-Demo:** [https://isihussain.github.io/monthly-project-planner-a4/](https://isihussain.github.io/monthly-project-planner-a4/)

---

## Funktionen

- **Tintensparendes Monochrom-Design:** Reines Schwarz und dezente Graustufen ohne deckende Schwarzflächen – spart Tinte und Toner.
- **Einzelblatt-Garantie (A4):** Präzise kalibriert auf 210 mm × 297 mm (Hochformat) und 297 mm × 210 mm (Querformat) mit CSS-Druckregeln zur Vermeidung von Leerseiten.
- **Mehrsprachigkeit:** Umschaltung mit einem Klick zwischen **Englisch (EN)**, **Deutsch (DE)**, **Türkisch (TR)**, **Russisch (RU)** und **Aserbaidschanisch (AZ)**.
- **Duale Layouts:**
  - **Hochformat (Portrait):** Kalenderübersicht oben, zweispaltige Aufteilung für aktuelle Projekte und Roadmap unten.
  - **Querformat (Landscape):** Großzügige Kalenderzellen links, Projektkarten und Notizen rechts.
- **Interaktive Checkboxen:** Klickbare Aufgaben- und Status-Checkboxen mit druckoptimierten Häkchen (`✓`).
- **Lokale Speicherung & JSON-Datenaustausch:**
  - Automatische Sicherung im Browser (`localStorage`).
  - Vollständiger JSON-Export und -Import zum Archivieren und Laden individueller Monatspläne.
  - Tastenkombination `Strg + S` / `Cmd + S` zum manuellen Speichern mit Toast-Bestätigung.
- **Schnelle Monatsnavigation:** Ein-Klick-Vor- und Zurück-Tasten (`◀` / `▶`) neben der Datumsauswahl.
- **Null Abhängigkeiten:** Reines HTML5, CSS3 und Vanilla JavaScript – läuft vollständig offline ohne Build-Tools oder Server.

---

## Enthaltene Abschnitte

1. **Kopfzeile & Monatlicher Fokus:** Monat, Jahr und eine dedizierte Zeile für das Hauptziel des Monats.
2. **Monatskalender-Raster:** 35-Zellen-Übersicht von Montag bis Sonntag mit Datumsfeldern und Notizlinien.
3. **Aktuelle Projekte (Aktiv):** Bis zu 4 parallele Projekte mit Meilenstein-Checkboxen, Fristen und Statusanzeigen (`Gestartet`, `50%`, `Im Test`, `Erledigt`).
4. **Zukünftige Projekte (Pipeline):** Vorbereitete Projekte mit Zielterminen, Voraussetzungen und Prioritätsstufen.
5. **Kritische Notizen & Hindernisse:** Platz für Risiken, externe Abhängigkeiten und offene Entscheidungen.

---

## Schnelleinstieg

### 1. Im Browser öffnen
```bash
git clone https://github.com/isihussain/monthly-project-planner-a4.git
cd monthly-project-planner-a4
open index.html
```

### 2. Als PDF drucken oder speichern
- Drücken Sie `Strg + P` (Windows/Linux) oder `Cmd + P` (macOS).
- Wählen Sie **Als PDF speichern** oder Ihren Drucker.
- Papierformat: **A4**.
- Ränder: **Standard** oder **Keine**.
- Option **Hintergrundgrafiken aktivieren** auswählen.

---

## Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert. Entworfen und gepflegt von [Ismayil Hussain](https://github.com/isihussain).

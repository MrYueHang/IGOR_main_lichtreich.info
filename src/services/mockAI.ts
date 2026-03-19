export const AI_PROMPTS = {
  audio: `Du bist Producer + Autor + Sprecher-Coach für „Herr Künstler“.
Erstelle eine Audio-Episode (3–5 Minuten) zur Etappe: {ETAPPE}.

AKTUELLE FAKTEN (aus Notizen, als gegeben behandeln):
- Kein fixes Atelier in Berlin.
- Priv-Gast-Fundus/Atelier/Studio: Bad Saarow.
- Aufbau eines Ateliers in Zenica.
- Ausstellung: Havanna, Januar 2025.
- Projekte: „Tage der Münchener Akademie“ (München/Zenica/Havanna/Berlin/Damaskus/Bukarest) + „Herr Künstler ☯️ Herr Ingenieur“.
- IG: @igorgrgurev

STIL / TON:
- ruhig, klar, bildhaft, nicht kitschig.
- deutsch als Basis; optional 1–2 bosnische Wörter/Zeilen.
- vermeide Pathos-Dauerwörter.
- Fokus: Szene, Bild, Erkenntnis, Einladung.`,

  assistant: `SYSTEM / ROLLE:
Du bist „Der Assistent“ von Herr Künstler: Office + Presse + Kunden + Fans.
Dein Job: Ausdruck schützen UND Kommunikation liefern.

HARD RULES:
- Ton: ruhig, präzise, freundlich, nicht anbiedernd.
- Keine Pathos-Schleifen.
- Wenn Fakten fehlen: stelle max. 3 Rückfragen.
- Keine erfundenen Referenzen/Orte/Termine.

AKTUELLE FAKTEN:
- Berlin: aktuell kein fixes Atelier.
- Bad Saarow: priv. Gast-Fundus/Atelier/Studio.
- Zenica: Atelier-Aufbau.
- Havanna: Ausstellung Januar 2025.`,

  social: `Du bist Content-Strategist für Herr Künstler. Erstelle einen 4-Wochen-Plan für Instagram + LinkedIn, der Website/Serien und Newsletter stärkt.

INPUTS:
- Handle: @igorgrgurev
- Serien: Hotel Hospital | Face to Face | Mi Habanna | Blue Book Pictures
- Aktuell: Bad Saarow, Zenica, Havanna (Jan 2025)
- Projekte: „Tage der Münchener Akademie“ + „Herr Künstler ☯️ Herr Ingenieur“

STYLE:
- klar, bildhaft, nicht kitschig.
- Jede Woche 1 Thema → wiederverwendbar.`
};

export const generateMockSocialStrategy = (idea: string) => {
  return `Woche 1: Fokus auf "${idea}"
- Ziel: Community-Aufbau & Newsletter-Signups
- Instagram Reel: Skript (20s) - "Der Prozess hinter den Kulissen in Bad Saarow."
- LinkedIn Post: "Wie Umgebung die Kunst formt. Einblicke in mein Gast-Studio."
- Newsletter: "Neue Räume, neue Gedanken."

Woche 2: Die Brücke zu vergangenen Serien
- Ziel: Kontext schaffen (Face to Face)
- Instagram Carousel: 5 Slides über die Entwicklung der Serie.
- LinkedIn Post: "Transkulturelle Fragilität in der modernen Kunst."

Woche 3: Ausblick Havanna & Zenica
- Ziel: Event-Push & Vorfreude
- Instagram Story: Q&A zum Atelier-Aufbau in Zenica.
- LinkedIn Post: "Warum Havanna 2025 ein Meilenstein wird."

Woche 4: Herr Künstler ☯️ Herr Ingenieur
- Ziel: Die Dualität erklären
- Instagram Reel: Die zwei Seiten der Medaille (Kunst vs. Therapie).
- Newsletter: "Die transformative Ordnung."`;
};

export const generateMockProjectStrategy = (idea: string) => {
  return `Projekt-Strategie: ${idea}

Phase 1: Konzeption & Recherche (Woche 1-2)
- [ ] Historische und kulturelle Referenzen sammeln
- [ ] Materialbedarf ermitteln (Leinwände, Öl, Acryl)
- [ ] Erste Skizzen im Skizzenbuch anfertigen

Phase 2: Kreation (Woche 3-6)
- [ ] Grundierung und erste Schichten
- [ ] Integration der "Magischer Realismus" Elemente
- [ ] Reflexion und Anpassung der Komposition

Phase 3: Dokumentation & PR (Woche 7-8)
- [ ] Professionelle Fotografie der Werke
- [ ] Pressetext verfassen (Fokus: Spätmodernes Chaos)
- [ ] Social Media Teaser vorbereiten

Phase 4: Ausstellung / Abschluss (Woche 9)
- [ ] Logistik klären (Transport)
- [ ] Vernissage planen
- [ ] Newsletter an Sammler versenden`;
};

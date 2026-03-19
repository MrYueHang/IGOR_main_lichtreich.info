# Herr Künstler - Digitales Atelier & Management System

## Lasten- und Pflichtenheft / Handbuch (Meilenstein 1)

Dieses Dokument beschreibt den aktuellen Funktionsumfang und die Architektur des digitalen Ateliers für "Herr Künstler" (Igor Grgurev) sowie die Backend-Strukturen für den "Muster-Ingenieur".

### 1. Öffentlicher Bereich (Public Frontend)
Das Frontend ist im charakteristischen "Herr Künstler"-Design gestaltet (Polaroid-Ästhetik, zerrissene Kanten, handschriftliche Notizen).

*   **Home (`/`)**: Landingpage mit animiertem Hero-Bereich, Vorstellung der Persona und aktuellen Projekten.
*   **Vision (`/vision`)**: Darstellung der künstlerischen Philosophie und des Werdegangs.
*   **Galerie (`/gallery`)**: Portfolio-Ansicht der Kunstwerke. Filterbar nach Serien (z.B. "Hotel Hospital", "Face to Face") und Status.
*   **Projekte (`/projects`)**: Übersicht der aktuellen und vergangenen Projekte (z.B. "Tage der Münchener Akademie", "Studio-Aufbau Zenica").
*   **Preise (`/prices`)**: Transparente Darstellung der Preisstruktur für Kunstwerke, Auftragsarbeiten und kunstheiltherapeutisches Coaching.

### 2. Administrativer Bereich (Backend / Muster-Ingenieur)
Der Admin-Bereich (`/admin`) dient der Verwaltung aller Inhalte, Kunden und Strategien. Er integriert tiefgreifende KI-Funktionen (Gemini API).

#### 2.1. KI-Strategie Planer (MECAN)
Eine zentrale, wiederverwendbare Komponente (`AIStrategyPlanner`), die in verschiedenen Bereichen eingesetzt wird:
*   **Idee -> Strategie -> Ausführung**: Der Nutzer gibt eine Idee ein, die KI generiert einen Entwurf. Dieser kann im Chat iterativ verfeinert werden.
*   **Push to Action**: Mit einem Klick wird die finale Strategie in das jeweilige Tool (Social Media Planer, Projekt-Checkliste) überführt.

#### 2.2. Social Media & Workflow (`/admin/social`)
*   **Planungstool**: Terminierung von Posts für Instagram, Facebook und LinkedIn.
*   **KI-Integration**: Generierung kompletter Content-Strategien (z.B. 4-Wochen-Plan für "Face to Face"). Die KI-Ausgabe wird automatisch geparst und als einzelne, terminierte Posts in die Liste "Geplante Veröffentlichungen" übertragen.

#### 2.3. Projekte & Ausstellungen (`/admin/projects`)
*   **Verwaltung**: Status-Updates (In Planung, Aktiv, Abgeschlossen) und Checklisten-Management.
*   **KI-Integration**: Generierung von Projektstrategien (z.B. "Die Brücke von Zenica nach Berlin"). Die KI-generierten Aufgaben und Meilensteine werden automatisch extrahiert und als Checklisten-Punkte an bestehende Projekte (z.B. "Studio-Aufbau Zenica") angehängt.

#### 2.4. PR & Presse (`/admin/pr`)
*   **KI-Pressemitteilungen**: Automatische Generierung von Pressemitteilungen basierend auf den Daten bestehender Projekte.
*   **Verwaltung**: Speichern, Bearbeiten und Verwalten von Entwürfen und veröffentlichten Mitteilungen.

#### 2.5. Kundenverwaltung (`/admin/customers`)
*   **Profile**: Detaillierte Kundenprofile mit Kontaktdaten, Interessen und Status.
*   **Kunstwerk-Zuordnung**: Anzeige der mit dem Kunden verknüpften Kunstwerke aus der Galerie-Datenbank.
*   **Historie & Notizen**: Hinzufügen von Gesprächsnotizen und Kontakthistorie (Email, Telefonat, Meeting) direkt im Profil.

#### 2.6. Content & Audio (`/admin/content`)
*   **Text-Drafts**: Verwaltung von Textentwürfen.
*   **Audio-Skript Generator**: Spezieller Prompt-Generator für NotebookLM/StudioLM. Erstellt 3-5 minütige Audio-Episoden basierend auf biografischen Etappen unter Berücksichtigung aktueller Fakten (Bad Saarow, Zenica, Havanna).

#### 2.7. Databases (Muster) (`/admin/databases`)
*   **Blaupause**: Dokumentation der relationalen Datenbank-Schemata (Projekte, Checklisten, Social Posts, Content Drafts) und RESTful API-Endpunkte für zukünftige Backend-Implementierungen (z.B. Supabase, Firebase).

### 3. Technische Architektur
*   **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion (für Animationen), Lucide React (Icons).
*   **KI-Integration**: `@google/genai` (Gemini 3.1 Flash Preview).
*   **Persistenz**: Aktuell `localStorage` für schnelles Prototyping (Projekte, PRs, Galerie, etc.). Bereit für die Migration auf ein echtes Backend gemäß den "Muster-Ingenieur"-Spezifikationen.

### 4. Nächste Schritte
*   Anbindung an ein echtes Backend (z.B. Firebase/Supabase) anhand der definierten Schemata.
*   Erweiterung der KI-Funktionen um Bildgenerierung oder -analyse.
*   Implementierung von Authentifizierung für den Admin-Bereich.

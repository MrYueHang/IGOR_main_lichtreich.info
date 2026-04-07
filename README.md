# Igor Grgurevic - Artist Portfolio & Family Back-Office

Dieses Projekt ist eine umfassende Plattform für den bildenden Künstler Igor Grgurevic. Es kombiniert eine öffentliche Portfolio-Website mit einem leistungsstarken, KI-gestützten "Family Back-Office" für die Verwaltung von Kunstwerken, Projekten, Finanzen und Kommunikation.

## Architektur & "Nächste Instanz"

Aktuell läuft das System in einer **Frontend-First** Architektur mit `localStorage` als temporärem Datenspeicher und Mock-APIs. Dies dient als hochfunktionaler Prototyp und Platzhalter-Muster.

Für die **Nächste Instanz** (Produktion) ist das System darauf vorbereitet, an ein echtes Backend (z.B. Supabase, Firebase oder einen Custom Node.js/Express Server) angebunden zu werden. 
Die Abstraktionsschicht hierfür befindet sich in `src/services/db.ts`.

## Features

*   **Public Landingpage**: Dynamische Galerie, Vision, Projektübersicht.
*   **MECAN KI-Assistenz**: Integrierte Google Gemini API für C-Level Consulting, Dokumentenanalyse und Chat.
*   **Workingspace**: Zentrale Verwaltung für Cloud-Speicher (Drive, Dropbox), Social Media (Instagram, X, etc.), Messenger (WhatsApp, Telegram) und Wallets.
*   **Projektmanagement**: KI-gestützte Projektplanung, Sub-Projekte, Checklisten und Collaboration.
*   **Dokumenten-Verarbeitung**: Automatisierte Analyse von Belegen, Rechnungen und Verträgen via KI.

## Setup & Installation

1.  Abhängigkeiten installieren:
    ```bash
    npm install
    ```
2.  Umgebungsvariablen konfigurieren:
    Kopieren Sie die `.env.example` nach `.env` und tragen Sie Ihre API-Keys ein (insbesondere `VITE_GEMINI_API_KEY`).
3.  Entwicklungsserver starten:
    ```bash
    npm run dev
    ```

## Dokumentation

*   **Handbuch**: Siehe `HANDBUCH.md` für eine Bedienungsanleitung des Back-Offices.
*   **Ticket-System / Backlog**: Siehe `TICKETS.md` für anstehende Erweiterungen und API-Anbindungen.

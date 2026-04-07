# HANDBUCH: Family Back-Office & MECAN KI

Willkommen im Handbuch für das digitale Back-Office von Igor Grgurevic. Dieses Dokument erklärt die wichtigsten Module und Workflows.

## 1. MECAN KI-Assistenz (`/admin/ai`)
MECAN ist das Herzstück des Back-Offices, angetrieben durch die Google Gemini API.
*   **Standard Assistenz**: Für alltägliche Fragen, Textentwürfe und schnelle Recherchen.
*   **C-Level Consulting**: MECAN analysiert den Gesamtkontext (Projekte, Finanzen, Ziele) und gibt strategische Handlungsempfehlungen.
*   **Batch & Ordner Sync**: Hier können ganze Daten-Lakes (Google Drive, Dropbox) synchronisiert werden. MECAN durchsucht die Ordner nach neuen Skizzen, Verträgen oder Ideen und wandelt diese automatisch in Aufgaben um.
*   **Vorlagen**: Nutzen Sie die vorgefertigten Prompts (z.B. für Pressemitteilungen, Social Media Posts, Verträge), um wiederkehrende Aufgaben zu automatisieren.

## 2. Workingspace & Infrastruktur (`/admin/workspace`)
Die Kommandozentrale für alle externen Anbindungen.
*   **Cloud & Data Lakes**: Verknüpfen Sie hier AWS S3, Google Drive oder Dropbox.
*   **Social Media & Messenger**: Verwalten Sie die Zugangsdaten für Instagram, WhatsApp, Telegram etc. (Platzhalter für zukünftige OAuth-Integrationen).
*   **Finanzen**: Übersicht der angebundenen Geschäftskonten und Krypto-Wallets.

## 3. Projekte & Collaboration (`/admin/projects`)
*   **Hierarchie**: Projekte können in **Sub-Projekte** unterteilt werden.
*   **Checklisten**: Jedes Projekt/Sub-Projekt hat eigene Aufgaben.
*   **KI-Strategie**: Über den Button "KI-Strategie generieren" erstellt MECAN einen kompletten Projektplan und fügt die Schritte automatisch als Checkliste hinzu.
*   **Delegation**: Weisen Sie Aufgaben an "Gallerist", "Verwalter" oder "Logistik-Team" zu.

## 4. Posteingang & Belege (`/admin/documents`)
*   **Workflow**: Laden Sie ein Foto einer Quittung, eines Briefes oder eines Vertrags hoch.
*   **KI-Analyse**: MECAN liest das Dokument (OCR + semantische Analyse), erkennt den Typ (Rechnung, Idee, Vertrag), fasst den Inhalt zusammen und erstellt einen "Nächsten Schritt".
*   **Freigabe**: Die analysierten Dokumente landen in den "Aktuellen Vorgängen" und können dort von der nächsten Instanz (z.B. Gallerist) geprüft und freigegeben werden.

## 5. Nächste Instanz (Für Entwickler/Admins)
Das System nutzt aktuell `localStorage` und Platzhalter-APIs. Um das System für den Live-Betrieb mit mehreren Nutzern (Künstler, Gallerist, Eltern) zu rüsten, müssen die in `TICKETS.md` beschriebenen Backend-Anbindungen durchgeführt werden.

# TICKET-SYSTEM & BACKLOG (Austausch zum Erweitern)

Dieses Dokument dient als Übergabepunkt und Ticket-System für die "Nächste Instanz" (Entwickler, Agenturen oder Administratoren), die das System erweitern.

## 🟢 Phase 1: Backend & Datenbank Migration
- [ ] **TICKET-001: Datenbank-Infrastruktur aufsetzen**
  - *Beschreibung*: `localStorage` durch eine echte Datenbank (Supabase PostgreSQL oder Firebase Firestore) ersetzen.
  - *Abhängigkeit*: `src/services/db.ts` muss mit echten API-Calls befüllt werden.
- [ ] **TICKET-002: Authentifizierung & Rollen (RBAC)**
  - *Beschreibung*: Login-System implementieren. Rollen definieren: `Artist` (Igor), `Gallerist`, `Admin` (Eltern/Verwalter).
  - *Abhängigkeit*: JWT / Session Management.

## 🟡 Phase 2: API & Connector Implementierungen
- [ ] **TICKET-003: Social Media OAuth2**
  - *Beschreibung*: Echte OAuth-Flows für Instagram Graph API, Facebook, X und YouTube einbauen, um das automatische Posting via MECAN zu aktivieren.
- [ ] **TICKET-004: Messenger Webhooks**
  - *Beschreibung*: Webhooks für WhatsApp Business und Telegram Bot API einrichten, damit MECAN direkt auf Nachrichten antworten kann.
- [ ] **TICKET-005: Cloud Storage Sync (Data Lakes)**
  - *Beschreibung*: Google Drive API und Dropbox API anbinden, um den "Batch & Ordner Sync" im AIAssistant funktional zu machen.

## 🔵 Phase 3: Finanzen & Verträge
- [ ] **TICKET-006: Banking API (Open Banking)**
  - *Beschreibung*: Anbindung von N26/Fidor via FinTS/PSD2 API (z.B. via Tink oder Plaid) für automatischen Zahlungsabgleich von Kunstverkäufen.
- [ ] **TICKET-007: Web3 Wallet Integration**
  - *Beschreibung*: MetaMask / WalletConnect Integration für den Empfang von Krypto-Zahlungen oder NFT-Verwaltung.
- [ ] **TICKET-008: Digitale Signatur für Verträge**
  - *Beschreibung*: DocuSign oder Docuseal API integrieren, um von MECAN generierte Verträge (Miete, Galeristenvertrag) direkt digital signieren zu lassen.

## 🟣 Phase 4: Frontend & UX
- [ ] **TICKET-009: Dynamisches KI-Packaging auf der Landingpage**
  - *Beschreibung*: Die Funktion "KI-Auto Packaging" auf der Startseite so erweitern, dass sie echte Nutzerdaten (Analytics) nutzt, um das Portfolio für jeden Besucher individuell zu sortieren.
- [ ] **TICKET-010: Live-Collaboration WebSockets**
  - *Beschreibung*: Yjs oder Socket.io einbauen, damit Igor und der Gallerist in Echtzeit an Projekt-Checklisten und Dokumenten arbeiten können.

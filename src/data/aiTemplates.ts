/**
 * KI-Vorlagen (Templates) für MECAN Assistenz
 * Platzhalter-Muster für verschiedene Eventualitäten und Workflows.
 */

export interface AITemplate {
  id: string;
  category: 'PR' | 'Social' | 'Legal' | 'Consulting' | 'Orga';
  title: string;
  description: string;
  prompt: string;
}

export const aiTemplates: AITemplate[] = [
  {
    id: 'pr_exhibition',
    category: 'PR',
    title: 'Pressemitteilung: Neue Ausstellung',
    description: 'Generiert einen professionellen PR-Text für eine anstehende Ausstellung.',
    prompt: 'Erstelle eine professionelle Pressemitteilung für meine neue Ausstellung. \n\nTitel der Ausstellung: [TITEL EINFÜGEN]\nOrt: [ORT EINFÜGEN]\nDatum: [DATUM EINFÜGEN]\nKernbotschaft/Thema: [THEMA EINFÜGEN]\n\nDer Ton soll anspruchsvoll, kunsthistorisch fundiert, aber zugänglich sein.'
  },
  {
    id: 'social_artwork',
    category: 'Social',
    title: 'Instagram Post: Neues Kunstwerk',
    description: 'Erstellt eine fesselnde Caption für Social Media inkl. Hashtags.',
    prompt: 'Schreibe eine fesselnde Instagram-Caption für mein neuestes Kunstwerk. \n\nTitel: [TITEL]\nMedium: [MEDIUM]\nGedanken zum Werk: [GEDANKEN EINFÜGEN]\n\nFüge passende, reichweitenstarke Hashtags aus dem Bereich Contemporary Art hinzu.'
  },
  {
    id: 'legal_gallery_contract',
    category: 'Legal',
    title: 'Vertragsentwurf: Galeristen-Vereinbarung',
    description: 'Erstellt ein Grundgerüst für einen Zusammenarbeitsvertrag mit einer Galerie.',
    prompt: 'Erstelle einen strukturierten Entwurf für einen Galeristenvertrag (Konsignationsvertrag). \n\nVertragspartner: Igor Grgurevic (Künstler) und [NAME DER GALERIE]. \nProvisionsverteilung: [PROZENTSATZ, z.B. 50/50]. \nDauer: [LAUFZEIT]. \n\nBitte füge Platzhalter für Versicherung, Transportkosten und Exklusivität ein.'
  },
  {
    id: 'legal_rental_contract',
    category: 'Legal',
    title: 'Vertragsentwurf: Kunstwerk-Vermietung',
    description: 'Entwurf für die Vermietung von Kunstwerken an Unternehmen/Privat.',
    prompt: 'Erstelle einen rechtlichen Entwurf für einen Mietvertrag über Kunstwerke. \n\nMieter: [NAME DES MIETERS]\nMietobjekt: [KUNSTWERK TITEL]\nMietdauer: [DAUER]\nMonatliche Miete: [BETRAG]\n\nBerücksichtige Klauseln zu Beschädigung, Versicherungspflicht durch den Mieter und Kaufoption.'
  },
  {
    id: 'consulting_strategy',
    category: 'Consulting',
    title: 'C-Level: Quartals-Strategie',
    description: 'Analysiert den aktuellen Stand und schlägt Fokus-Themen vor.',
    prompt: 'Agiere als mein C-Level Consultant. Basierend auf meinen aktuellen Projekten (bitte frage mich nach den wichtigsten 3, falls du sie nicht im Kontext hast), erstelle eine strategische Roadmap für das nächste Quartal. \n\nFokus: Maximierung der Sichtbarkeit, Optimierung der Einnahmequellen (Verkauf vs. Vermietung) und effiziente Ressourcennutzung.'
  },
  {
    id: 'orga_task_breakdown',
    category: 'Orga',
    title: 'Projekt-Dekonstruktion (WBS)',
    description: 'Bricht ein großes Ziel in kleine, delegierbare Aufgaben herunter.',
    prompt: 'Ich plane folgendes Großprojekt: [PROJEKT BESCHREIBEN]. \n\nBitte brich dieses Projekt in eine Work Breakdown Structure (WBS) herunter. Erstelle eine Checkliste mit konkreten, delegierbaren Aufgaben und weise sie logischen Rollen zu (z.B. Künstler, Gallerist, Logistik, PR).'
  }
];

export interface Project {
  id: string;
  title: string;
  year: string;
  location: string;
  description: string;
  status: 'In Planung' | 'Aktiv' | 'Abgeschlossen';
  checklist: { id: string; text: string; completed: boolean }[];
}

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Tage der Münchener Akademie',
    year: '2025',
    location: 'München / Zenica / Havanna / Berlin / Damaskus / Bukarest',
    description: 'Kunst als unzerstörbares soziales Band. Ein fortlaufender Diskurs zwischen Meistern ihres Fachs, der die globale Vision kontinuierlich schärft.',
    status: 'In Planung',
    checklist: [
      { id: 'c1', text: 'Teilnehmerliste finalisieren', completed: false },
      { id: 'c2', text: 'Locations buchen', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Havanna Ausstellung',
    year: 'Januar 2025',
    location: 'Havanna-Miramar (Municipio Playa)',
    description: 'Eine Rückkehr mit neuer Perspektive. Das Wiederaufgreifen der Wurzeln in der Comunidad Artística Casa Yeti. Die kommende Ausstellung vereint die mystifologische Vision der Gegenwart mit der lebendigen, kulturellen Energie Kubas.',
    status: 'In Planung',
    checklist: [
      { id: 'c3', text: 'Kunstwerke verpacken', completed: true },
      { id: 'c4', text: 'Flüge buchen', completed: true },
      { id: 'c5', text: 'Pressemitteilung senden', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Studio-Aufbau Zenica',
    year: 'Aktuell',
    location: 'Zenica, Bosnien-Herzegowina',
    description: 'Die Brücke zum Ursprung. Der Aufbau dieses Studios feiert die kulturelle Herkunft – ein Kraftort für zukünftige kreative und infrastrukturelle Entwicklungen.',
    status: 'Aktiv',
    checklist: [
      { id: 'c6', text: 'Renovierung abschließen', completed: true },
      { id: 'c7', text: 'Materialien bestellen', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Bad Saarow Studio',
    year: 'Aktuell',
    location: 'Bad Saarow, Deutschland',
    description: 'Die Oase. Ein Raum der Natur und Stille, konzipiert für fokussierte Schaffensprozesse und tiefe kunsttherapeutische Interventionen.',
    status: 'Aktiv',
    checklist: [
      { id: 'c8', text: 'Heizung warten', completed: true }
    ]
  },
];

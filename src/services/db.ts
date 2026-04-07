/**
 * Backend Abstraction Layer (Placeholder / Muster-Format)
 * 
 * Diese Datei dient als Schnittstelle für die "Nächste Instanz".
 * Aktuell werden alle Daten im `localStorage` gespeichert (Mock-Backend).
 * Sobald ein echtes Backend (Supabase, Firebase, Custom API) angebunden wird,
 * müssen nur die Funktionen in dieser Datei ausgetauscht werden.
 */

// Hilfsfunktion für künstliche Verzögerung (simuliert Netzwerk-Latenz)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  projects: {
    getAll: async () => {
      await delay(300);
      return JSON.parse(localStorage.getItem('igor_projects') || '[]');
    },
    saveAll: async (data: any) => {
      await delay(300);
      localStorage.setItem('igor_projects', JSON.stringify(data));
      return true;
    }
  },
  
  artworks: {
    getAll: async () => {
      await delay(300);
      return JSON.parse(localStorage.getItem('igor_artworks') || '[]');
    },
    saveAll: async (data: any) => {
      await delay(300);
      localStorage.setItem('igor_artworks', JSON.stringify(data));
      return true;
    }
  },

  documents: {
    getAll: async () => {
      await delay(300);
      return JSON.parse(localStorage.getItem('igor_documents') || '[]');
    },
    saveAll: async (data: any) => {
      await delay(300);
      localStorage.setItem('igor_documents', JSON.stringify(data));
      return true;
    }
  },

  // Platzhalter für zukünftige API-Anbindungen
  social: {
    postToInstagram: async (imageUrl: string, caption: string) => {
      console.log('Mock: Posting to Instagram...', { imageUrl, caption });
      await delay(1000);
      return { success: true, platform: 'instagram' };
    }
  },

  cloud: {
    syncFolder: async (provider: 'gdrive' | 'dropbox' | 's3', folderId: string) => {
      console.log(`Mock: Syncing folder ${folderId} from ${provider}...`);
      await delay(2000);
      return { success: true, filesSynced: 12 };
    }
  }
};

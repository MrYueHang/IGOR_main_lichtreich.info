/**
 * Multi-LLM Router — HerrKuenstler / GEZy Ecosystem
 *
 * Routing-Logik aus Doc 07_FREEMIUM_KI_SERVICES:
 * Gemini (free) -> OpenAI -> DeepSeek (ultra-guenstig) -> Groq (ultra-schnell) -> OpenRouter (fallback)
 */

// === TYPES ===

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  text: string;
  provider: string;
  model: string;
  tokens?: number;
  latencyMs: number;
}

export interface AIRouterConfig {
  geminiKey?: string;
  openaiKey?: string;
  deepseekKey?: string;
  groqKey?: string;
  openrouterKey?: string;
  anthropicKey?: string;
}

type TaskType = 'chat' | 'strategy' | 'content' | 'code' | 'translate' | 'summarize';

// === PROVIDER DEFINITIONS ===

const PROVIDERS = {
  gemini: {
    name: 'Google Gemini',
    model: 'gemini-2.5-flash',
    cost: 'free',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    strengths: ['multimodal', 'long-context', 'free'],
  },
  openai: {
    name: 'OpenAI',
    model: 'gpt-4o-mini',
    cost: 'low',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    strengths: ['allrounder', 'function-calling'],
  },
  deepseek: {
    name: 'DeepSeek',
    model: 'deepseek-chat',
    cost: 'minimal',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    strengths: ['code', 'math', 'bulk'],
  },
  groq: {
    name: 'Groq',
    model: 'llama-3.3-70b-versatile',
    cost: 'free',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    strengths: ['ultra-fast', 'realtime'],
  },
  openrouter: {
    name: 'OpenRouter',
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    cost: 'free',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    strengths: ['fallback', 'multi-model'],
  },
} as const;

// === TASK -> PROVIDER PRIORITY ===

const TASK_ROUTING: Record<TaskType, (keyof typeof PROVIDERS)[]> = {
  chat:      ['gemini', 'groq', 'openai', 'deepseek', 'openrouter'],
  strategy:  ['gemini', 'openai', 'deepseek', 'openrouter'],
  content:   ['gemini', 'openai', 'deepseek', 'openrouter'],
  code:      ['deepseek', 'gemini', 'openai', 'groq', 'openrouter'],
  translate: ['gemini', 'deepseek', 'openai', 'openrouter'],
  summarize: ['groq', 'gemini', 'deepseek', 'openrouter'],
};

// === PROVIDER CALL FUNCTIONS ===

async function callGemini(messages: ChatMessage[], apiKey: string): Promise<string> {
  const systemMsg = messages.find(m => m.role === 'system')?.content || '';
  const userMsgs = messages.filter(m => m.role !== 'system');

  const contents = userMsgs.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const res = await fetch(`${PROVIDERS.gemini.endpoint}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: systemMsg ? { parts: [{ text: systemMsg }] } : undefined,
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callOpenAICompatible(
  messages: ChatMessage[],
  apiKey: string,
  endpoint: string,
  model: string,
  extraHeaders?: Record<string, string>
): Promise<string> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) throw new Error(`${model} ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// === MAIN ROUTER CLASS ===

export class AIRouter {
  private config: AIRouterConfig;
  private callLog: AIResponse[] = [];

  constructor(config?: AIRouterConfig) {
    this.config = config || this.loadFromEnv();
  }

  private loadFromEnv(): AIRouterConfig {
    // In Vite, env vars are accessed via import.meta.env
    return {
      geminiKey: (import.meta as any).env?.VITE_GEMINI_API_KEY || '',
      openaiKey: (import.meta as any).env?.VITE_OPENAI_API_KEY || '',
      deepseekKey: (import.meta as any).env?.VITE_DEEPSEEK_API_KEY || '',
      groqKey: (import.meta as any).env?.VITE_GROQ_API_KEY || '',
      openrouterKey: (import.meta as any).env?.VITE_OPENROUTER_API_KEY || '',
      anthropicKey: (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '',
    };
  }

  /** Get available providers (ones with API keys set) */
  getAvailableProviders(): string[] {
    const available: string[] = [];
    if (this.config.geminiKey) available.push('gemini');
    if (this.config.openaiKey) available.push('openai');
    if (this.config.deepseekKey) available.push('deepseek');
    if (this.config.groqKey) available.push('groq');
    if (this.config.openrouterKey) available.push('openrouter');
    return available;
  }

  /** Get provider status for admin dashboard */
  getProviderStatus(): Array<{ name: string; provider: string; model: string; status: 'connected' | 'not_configured'; cost: string }> {
    return Object.entries(PROVIDERS).map(([key, p]) => ({
      name: p.name,
      provider: key,
      model: p.model,
      cost: p.cost,
      status: this.getAvailableProviders().includes(key) ? 'connected' as const : 'not_configured' as const,
    }));
  }

  /** Main chat function with automatic routing and fallback */
  async chat(messages: ChatMessage[], task: TaskType = 'chat'): Promise<AIResponse> {
    const start = Date.now();
    const priority = TASK_ROUTING[task];
    const available = this.getAvailableProviders();
    const ordered = priority.filter(p => available.includes(p));

    if (ordered.length === 0) {
      // No API keys -> return mock response
      return {
        text: '[MECAN Demo-Modus] Kein KI-Provider konfiguriert. Bitte API-Keys in .env eintragen. Verfuegbare Free-Tier: Gemini (aistudio.google.com/apikey), Groq (console.groq.com), OpenRouter (openrouter.ai).',
        provider: 'mock',
        model: 'none',
        latencyMs: Date.now() - start,
      };
    }

    // Try providers in priority order
    for (const providerKey of ordered) {
      try {
        const text = await this.callProvider(providerKey, messages);
        const response: AIResponse = {
          text,
          provider: providerKey,
          model: PROVIDERS[providerKey].model,
          latencyMs: Date.now() - start,
        };
        this.callLog.push(response);
        return response;
      } catch (err) {
        console.warn(`[AIRouter] ${providerKey} failed, trying next:`, err);
        continue;
      }
    }

    // All failed
    return {
      text: '[MECAN] Alle KI-Provider sind aktuell nicht erreichbar. Bitte spaeter erneut versuchen.',
      provider: 'error',
      model: 'none',
      latencyMs: Date.now() - start,
    };
  }

  /** Call a specific provider */
  private async callProvider(provider: string, messages: ChatMessage[]): Promise<string> {
    switch (provider) {
      case 'gemini':
        return callGemini(messages, this.config.geminiKey!);
      case 'openai':
        return callOpenAICompatible(messages, this.config.openaiKey!, PROVIDERS.openai.endpoint, PROVIDERS.openai.model);
      case 'deepseek':
        return callOpenAICompatible(messages, this.config.deepseekKey!, PROVIDERS.deepseek.endpoint, PROVIDERS.deepseek.model);
      case 'groq':
        return callOpenAICompatible(messages, this.config.groqKey!, PROVIDERS.groq.endpoint, PROVIDERS.groq.model);
      case 'openrouter':
        return callOpenAICompatible(messages, this.config.openrouterKey!, PROVIDERS.openrouter.endpoint, PROVIDERS.openrouter.model, {
          'HTTP-Referer': 'https://herrkuenstler.lichtreich.info',
          'X-Title': 'HerrKuenstler MECAN',
        });
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  /** Force a specific provider */
  async chatWith(provider: keyof typeof PROVIDERS, messages: ChatMessage[]): Promise<AIResponse> {
    const start = Date.now();
    const text = await this.callProvider(provider, messages);
    return { text, provider, model: PROVIDERS[provider].model, latencyMs: Date.now() - start };
  }

  /** Get call log for admin dashboard */
  getCallLog(): AIResponse[] {
    return [...this.callLog];
  }

  /** Get usage stats */
  getStats(): { totalCalls: number; byProvider: Record<string, number>; avgLatency: number } {
    const byProvider: Record<string, number> = {};
    let totalLatency = 0;
    for (const call of this.callLog) {
      byProvider[call.provider] = (byProvider[call.provider] || 0) + 1;
      totalLatency += call.latencyMs;
    }
    return {
      totalCalls: this.callLog.length,
      byProvider,
      avgLatency: this.callLog.length ? Math.round(totalLatency / this.callLog.length) : 0,
    };
  }
}

// === SINGLETON ===
export const aiRouter = new AIRouter();

// === MECAN SYSTEM PROMPT ===
export const MECAN_SYSTEM_PROMPT = `Du bist MECAN — der KI-Assistent von Herr Kuenstler (Igor Grgurevic).
MECAN steht fuer: Management, Email, Content, Analytics, Networking.

ROLLEN: Office + Presse + Kunden + Fans
TON: Ruhig, praezise, freundlich, nicht anbiedernd. Bildhaft aber konkret.
SPRACHE: Deutsch als Basis; optional einzelne bosnische Woerter (sparsam, erklaerend).

HARD RULES:
- Keine Pathos-Schleifen; vermeide Wiederholungen von 'Ueberlebender'
- Wenn Fakten fehlen: max 3 Rueckfragen, sonst mit Platzhaltern {...} arbeiten
- Keine erfundenen Referenzen/Orte/Termine

AKTUELLE FAKTEN:
- Berlin: aktuell kein fixes Atelier
- Bad Saarow: priv. Gast-Fundus/Atelier/Studio
- Zenica: Atelier-Aufbau
- Havanna: Ausstellung Januar 2025
- Projekte: 'Tage der Muenchener Akademie' + 'Herr Kuenstler Herr Ingenieur'
- IG: @igorgrgurev
- Werkzyklen: Hotel Hospital, Face to Face, Mi Habanna, Blue Book Pictures`;

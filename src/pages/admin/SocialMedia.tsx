import React, { useState } from 'react';
import { Instagram, Facebook, MessageCircle, Send, Image as ImageIcon, Smartphone, ArrowRight, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import AIStrategyPlanner from '../../components/admin/AIStrategyPlanner';

interface ScheduledPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'linkedin';
  content: string;
  date: string;
  time: string;
}

export default function SocialMedia() {
  const [posts, setPosts] = useState<ScheduledPost[]>([
    { id: '1', platform: 'instagram', content: 'Neuer Einblick in die Serie "Hotel Hospital"...', date: '2026-03-20', time: '18:00' },
    { id: '2', platform: 'facebook', content: 'Ausstellung in Havanna - Die Vorbereitungen laufen!', date: '2026-03-22', time: '12:00' }
  ]);
  const [newPost, setNewPost] = useState({ platform: 'instagram' as const, content: '', date: '', time: '' });

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.content || !newPost.date || !newPost.time) return;
    setPosts([...posts, { ...newPost, id: Date.now().toString() }]);
    setNewPost({ platform: 'instagram', content: '', date: '', time: '' });
  };

  const handlePushToAction = (strategy: string) => {
    // Parse the strategy to create multiple posts if it looks like a multi-post plan
    // This is a simple heuristic: split by "Post", "Woche", or "Tag"
    const lines = strategy.split('\n').filter(l => l.trim().length > 0);
    const newPosts: ScheduledPost[] = [];
    let currentDate = new Date();
    
    // If it's a long strategy, try to extract posts
    if (lines.length > 5) {
      let currentContent = '';
      let platform: 'instagram' | 'linkedin' | 'facebook' = 'instagram';
      
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes('linkedin')) platform = 'linkedin';
        else if (line.toLowerCase().includes('instagram')) platform = 'instagram';
        
        if (line.match(/^(Woche|Tag|Post|Reel|Carousel|Story) \d+:/i) || line.match(/^\*\*.*(Woche|Tag|Post).*\*\*/i)) {
          if (currentContent) {
            newPosts.push({
              id: Date.now().toString() + index,
              platform,
              content: currentContent.trim(),
              date: currentDate.toISOString().split('T')[0],
              time: '12:00'
            });
            currentDate.setDate(currentDate.getDate() + 2); // Schedule every 2 days
          }
          currentContent = line + '\n';
        } else {
          currentContent += line + '\n';
        }
      });
      
      if (currentContent) {
        newPosts.push({
          id: Date.now().toString() + 'last',
          platform,
          content: currentContent.trim(),
          date: currentDate.toISOString().split('T')[0],
          time: '12:00'
        });
      }
      
      if (newPosts.length > 0) {
        setPosts([...posts, ...newPosts]);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return;
      }
    }

    // Fallback: just put it in the new post form
    setNewPost(prev => ({ ...prev, content: `[KI Strategie Entwurf]\n${strategy}` }));
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Social Media & Workflow</h1>
        <p className="text-zinc-600">Strategische Projektvermarktung: Von der Leinwand bis zur digitalen Präsenz.</p>
      </div>

      {/* AI Strategy Planner */}
      <AIStrategyPlanner type="social" onPushToAction={handlePushToAction} />

      {/* Workflow Visualization */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-8">
        <h2 className="text-lg font-semibold text-zinc-900 mb-6">Digitalisierungs-Workflow</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center text-center p-4 bg-zinc-50 rounded-xl flex-1 w-full">
            <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-3">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-zinc-900">1. Reale Kunst</h3>
            <p className="text-xs text-zinc-500 mt-1">Bild auf Leinwand & Skizzen</p>
          </div>
          
          <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />
          
          <div className="flex flex-col items-center text-center p-4 bg-zinc-50 rounded-xl flex-1 w-full">
            <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-3">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-zinc-900">2. Digitalisierung</h3>
            <p className="text-xs text-zinc-500 mt-1">Foto, Scan & Cloud-Upload</p>
          </div>

          <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />

          <div className="flex flex-col items-center text-center p-4 bg-zinc-50 rounded-xl flex-1 w-full">
            <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-3">
              <Instagram className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-zinc-900">3. Strategie</h3>
            <p className="text-xs text-zinc-500 mt-1">Projektbezogenes Social Media</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Post Scheduling Form */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50">
            <h2 className="text-lg font-semibold text-zinc-900">Neuen Post planen</h2>
          </div>
          <form onSubmit={handleSchedule} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Plattform</label>
              <select 
                value={newPost.platform}
                onChange={(e) => setNewPost({...newPost, platform: e.target.value as 'instagram' | 'facebook' | 'linkedin'})}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
              >
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Inhalt</label>
              <textarea 
                rows={3}
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
                placeholder="Text für den Post..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Datum</label>
                <input 
                  type="date" 
                  value={newPost.date}
                  onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Uhrzeit</label>
                <input 
                  type="time" 
                  value={newPost.time}
                  onChange={(e) => setNewPost({...newPost, time: e.target.value})}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post terminieren
            </button>
          </form>
        </div>

        {/* Scheduled Posts List */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-zinc-500" />
            <h2 className="text-lg font-semibold text-zinc-900">Geplante Veröffentlichungen</h2>
          </div>
          <div className="divide-y divide-zinc-200">
            {posts.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()).map(post => (
              <div key={post.id} className="p-4 hover:bg-zinc-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {post.platform === 'instagram' ? (
                      <Instagram className="w-4 h-4 text-pink-600" />
                    ) : post.platform === 'facebook' ? (
                      <Facebook className="w-4 h-4 text-blue-600" />
                    ) : (
                      <span className="font-bold text-blue-700 text-sm">in</span>
                    )}
                    <span className="text-sm font-medium text-zinc-900 capitalize">{post.platform}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Clock className="w-3 h-3" />
                    {post.date} {post.time}
                  </div>
                </div>
                <p className="text-sm text-zinc-600 line-clamp-2">{post.content}</p>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="p-6 text-center text-zinc-500 text-sm">
                Keine Posts geplant.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connected Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Verbundene Kanäle</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">Instagram</p>
                  <p className="text-xs text-zinc-500">@igorgrgurev</p>
                </div>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Verbunden</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">Facebook</p>
                  <p className="text-xs text-zinc-500">Künstlerseite</p>
                </div>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Verbunden</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Messenger & Direkter Kontakt</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">WhatsApp Business</p>
                  <p className="text-xs text-zinc-500">Für schnelle Kundenanfragen</p>
                </div>
              </div>
              <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">Telegram</p>
                  <p className="text-xs text-zinc-500">Community & Updates</p>
                </div>
              </div>
              <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

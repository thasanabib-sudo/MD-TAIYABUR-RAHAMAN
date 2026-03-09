import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, LogIn, LayoutDashboard, Calendar, Image as ImageIcon, Briefcase, Type, Loader2, Share2 } from 'lucide-react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'events' | 'portfolio' | 'gallery' | 'links'>('content');
  const [data, setData] = useState<any>({ content: [], events: [], portfolio: [], gallery: [], links: [] });
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for demo
      setIsLoggedIn(true);
    } else {
      alert('Invalid password');
    }
  };

  const fetchData = async () => {
    const [content, events, portfolio, gallery, links] = await Promise.all([
      fetch('/api/content').then(res => res.json()),
      fetch('/api/events').then(res => res.json()),
      fetch('/api/portfolio').then(res => res.json()),
      fetch('/api/gallery').then(res => res.json()),
      fetch('/api/links').then(res => res.json()),
    ]);
    setData({ content, events, portfolio, gallery, links });
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleSaveContent = async (key: string) => {
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, en: editForm.en, bn: editForm.bn }),
    });
    setEditingId(null);
    fetchData();
  };

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    let imageUrl = formData.get('image_url') as string;
    
    if (fileInput.files?.[0]) {
      imageUrl = await handleFileUpload({ target: fileInput } as any) || imageUrl;
    }

    const payload = {
      title_en: formData.get('title_en'),
      title_bn: formData.get('title_bn'),
      desc_en: formData.get('desc_en'),
      desc_bn: formData.get('desc_bn'),
      date: formData.get('date'),
      images: [imageUrl],
    };
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    form.reset();
    setUploading(false);
    fetchData();
  };

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    let url = formData.get('url') as string;
    
    if (fileInput.files?.[0]) {
      url = await handleFileUpload({ target: fileInput } as any) || url;
    }

    const payload = {
      title_en: formData.get('title_en'),
      title_bn: formData.get('title_bn'),
      desc_en: formData.get('desc_en'),
      desc_bn: formData.get('desc_bn'),
      url: url,
      type: formData.get('type'),
    };
    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    form.reset();
    setUploading(false);
    fetchData();
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    let url = formData.get('url') as string;
    
    if (fileInput.files?.[0]) {
      url = await handleFileUpload({ target: fileInput } as any) || url;
    }

    const payload = {
      title_en: formData.get('title_en'),
      title_bn: formData.get('title_bn'),
      url: url,
      category: formData.get('category'),
    };
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    form.reset();
    setUploading(false);
    fetchData();
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      platform: formData.get('platform'),
      url: formData.get('url'),
      icon: formData.get('icon'),
    };
    await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    form.reset();
    fetchData();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogIn size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 text-sm">Enter password to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-indigo-900 text-white rounded-xl font-bold hover:bg-indigo-800 transition-all"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white p-6 hidden lg:block">
        <div className="flex items-center space-x-3 mb-12">
          <LayoutDashboard size={28} />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
        <nav className="space-y-2">
          {[
            { id: 'content', icon: <Type size={20} />, label: 'Text Content' },
            { id: 'events', icon: <Calendar size={20} />, label: 'Events' },
            { id: 'portfolio', icon: <Briefcase size={20} />, label: 'Portfolio' },
            { id: 'gallery', icon: <ImageIcon size={20} />, label: 'Gallery' },
            { id: 'links', icon: <Share2 size={20} />, label: 'Social Links' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-white text-indigo-900 shadow-lg' : 'hover:bg-white/10'
              }`}
            >
              {item.icon}
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 capitalize">{activeTab} Management</h2>
            <button onClick={() => setIsLoggedIn(false)} className="text-gray-500 hover:text-red-600 font-medium">Logout</button>
          </div>

          {activeTab === 'content' && (
            <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-black/5">
                  <tr>
                    <th className="px-6 py-4 font-bold text-gray-700">Key</th>
                    <th className="px-6 py-4 font-bold text-gray-700">English</th>
                    <th className="px-6 py-4 font-bold text-gray-700">Bangla</th>
                    <th className="px-6 py-4 font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {data.content.map((item: any) => (
                    <tr key={item.key}>
                      <td className="px-6 py-4 font-mono text-sm text-indigo-600">{item.key}</td>
                      <td className="px-6 py-4">
                        {editingId === item.key ? (
                          <textarea
                            className="w-full p-2 border rounded"
                            value={editForm.en}
                            onChange={(e) => setEditForm({ ...editForm, en: e.target.value })}
                          />
                        ) : (
                          <span className="text-sm text-gray-600">{item.en}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === item.key ? (
                          <textarea
                            className="w-full p-2 border rounded"
                            value={editForm.bn}
                            onChange={(e) => setEditForm({ ...editForm, bn: e.target.value })}
                          />
                        ) : (
                          <span className="text-sm text-gray-600">{item.bn}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === item.key ? (
                          <div className="flex space-x-2">
                            <button onClick={() => handleSaveContent(item.key)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Save size={18} /></button>
                            <button onClick={() => setEditingId(null)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><X size={18} /></button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingId(item.key);
                              setEditForm({ en: item.en, bn: item.bn });
                            }}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-8">
              <form onSubmit={handleAddEvent} className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="title_en" placeholder="Title (EN)" className="p-3 border rounded-xl" required />
                <input name="title_bn" placeholder="Title (BN)" className="p-3 border rounded-xl" required />
                <textarea name="desc_en" placeholder="Description (EN)" className="p-3 border rounded-xl md:col-span-2" required />
                <textarea name="desc_bn" placeholder="Description (BN)" className="p-3 border rounded-xl md:col-span-2" required />
                <input name="date" type="date" className="p-3 border rounded-xl" required />
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Event Image</label>
                  <input type="file" accept="image/*" className="w-full p-2 border rounded-xl" />
                  <p className="text-xs text-gray-500">Or enter URL below</p>
                  <input name="image_url" placeholder="Image URL" className="w-full p-3 border rounded-xl" />
                </div>
                <button type="submit" disabled={uploading} className="md:col-span-2 py-3 bg-indigo-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                  {uploading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} {uploading ? 'Uploading...' : 'Add Event'}
                </button>
              </form>
              <div className="grid grid-cols-1 gap-4">
                {data.events.map((event: any) => (
                  <div key={event.id} className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{event.title_en}</h4>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                    <button onClick={() => handleDelete('events', event.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <form onSubmit={handleAddPortfolio} className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="title_en" placeholder="Title (EN)" className="p-3 border rounded-xl" required />
                <input name="title_bn" placeholder="Title (BN)" className="p-3 border rounded-xl" required />
                <textarea name="desc_en" placeholder="Description (EN)" className="p-3 border rounded-xl md:col-span-2" required />
                <textarea name="desc_bn" placeholder="Description (BN)" className="p-3 border rounded-xl md:col-span-2" required />
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Project Image</label>
                  <input type="file" accept="image/*" className="w-full p-2 border rounded-xl" />
                  <p className="text-xs text-gray-500">Or enter URL below</p>
                  <input name="url" placeholder="Image/Project URL" className="w-full p-3 border rounded-xl" />
                </div>
                <select name="type" className="p-3 border rounded-xl" required>
                  <option value="graphic">Graphic</option>
                  <option value="printing">Printing</option>
                  <option value="social">Social</option>
                  <option value="video">Video</option>
                </select>
                <button type="submit" disabled={uploading} className="md:col-span-2 py-3 bg-indigo-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                  {uploading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} {uploading ? 'Uploading...' : 'Add Portfolio Item'}
                </button>
              </form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.portfolio.map((item: any) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{item.title_en}</h4>
                      <p className="text-xs text-indigo-600 font-bold uppercase">{item.type}</p>
                    </div>
                    <button onClick={() => handleDelete('portfolio', item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <form onSubmit={handleAddGallery} className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="title_en" placeholder="Title (EN)" className="p-3 border rounded-xl" required />
                <input name="title_bn" placeholder="Title (BN)" className="p-3 border rounded-xl" required />
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Gallery Image</label>
                  <input type="file" accept="image/*" className="w-full p-2 border rounded-xl" />
                  <p className="text-xs text-gray-500">Or enter URL below</p>
                  <input name="url" placeholder="Image URL" className="w-full p-3 border rounded-xl" />
                </div>
                <input name="category" placeholder="Category" className="p-3 border rounded-xl" required />
                <button type="submit" disabled={uploading} className="md:col-span-2 py-3 bg-indigo-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                  {uploading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} {uploading ? 'Uploading...' : 'Add Gallery Image'}
                </button>
              </form>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.gallery.map((img: any) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDelete('gallery', img.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'links' && (
            <div className="space-y-8">
              <form onSubmit={handleAddLink} className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="platform" placeholder="Platform (e.g. Instagram)" className="p-3 border rounded-xl" required />
                <input name="url" placeholder="URL" className="p-3 border rounded-xl" required />
                <select name="icon" className="p-3 border rounded-xl" required>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="send">Telegram</option>
                  <option value="message-circle">WhatsApp</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="globe">Other</option>
                </select>
                <button type="submit" className="md:col-span-2 py-3 bg-indigo-900 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                  <Plus size={20} /> Add Social Link
                </button>
              </form>
              <div className="grid grid-cols-1 gap-4">
                {data.links.map((link: any) => (
                  <div key={link.id} className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{link.platform}</h4>
                      <p className="text-sm text-indigo-600 truncate max-w-xs">{link.url}</p>
                    </div>
                    <button onClick={() => handleDelete('links', link.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;

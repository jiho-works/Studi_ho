
import React, { useState } from 'react';
import { RecordEntry, FeaturedContent } from '../types';

interface AdminProps {
  isAuthorized: boolean;
  onAuthorize: () => void;
  onClose: () => void;
  addRecord: (record: Omit<RecordEntry, 'id' | 'date'>) => void;
  deleteRecord: (id: string) => void;
  records: RecordEntry[];
  updateFeatured: (data: FeaturedContent) => void;
  currentFeatured: FeaturedContent;
}

const Admin: React.FC<AdminProps> = ({ 
  isAuthorized, 
  onAuthorize, 
  onClose, 
  addRecord, 
  deleteRecord, 
  records,
  updateFeatured,
  currentFeatured
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newYoutubeId, setNewYoutubeId] = useState(currentFeatured.youtubeId);
  const [newFeaturedImg, setNewFeaturedImg] = useState(currentFeatured.imageUrl);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '202400') {
      onAuthorize();
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newImage) return;
    addRecord({ title: newTitle, content: newContent, imageUrl: newImage });
    setNewTitle('');
    setNewContent('');
    setNewImage('');
    alert('Record added successfully.');
  };

  const handleUpdateFeatured = (e: React.FormEvent) => {
    e.preventDefault();
    updateFeatured({ imageUrl: newFeaturedImg, youtubeId: newYoutubeId });
    alert('Home content updated.');
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 backdrop-blur-sm">
        <div className="bg-white p-10 max-w-md w-full shadow-2xl rounded-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-tighter">Admin Access</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Security Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-400 text-lg tracking-widest"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter">Manage Content</h1>
          <button onClick={onClose} className="p-3 bg-black text-white hover:bg-gray-800 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Featured Management */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold uppercase tracking-widest border-b border-black pb-2">Home Page</h2>
            <form onSubmit={handleUpdateFeatured} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Featured Image URL</label>
                <input 
                  type="text" 
                  value={newFeaturedImg}
                  onChange={(e) => setNewFeaturedImg(e.target.value)}
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black text-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">YouTube URL / ID</label>
                <input 
                  type="text" 
                  value={newYoutubeId}
                  onChange={(e) => setNewYoutubeId(extractYoutubeId(e.target.value))}
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black text-sm"
                  placeholder="YouTube video ID or Link"
                />
              </div>
              <button 
                type="submit"
                className="w-full border border-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                Update Home
              </button>
            </form>
          </section>

          {/* New Record */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold uppercase tracking-widest border-b border-black pb-2">New Record</h2>
            <form onSubmit={handleAddRecord} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Image URL</label>
                <input 
                  type="text" 
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black text-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Content</label>
                <textarea 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black text-sm resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Create Record
              </button>
            </form>
          </section>
        </div>

        {/* List of Existing Records */}
        <section className="mt-24 space-y-10">
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-black pb-2">Existing Records</h2>
          <div className="space-y-4">
            {records.length === 0 ? (
              <p className="text-gray-400 italic text-sm">No records to manage.</p>
            ) : (
              records.map(record => (
                <div key={record.id} className="flex items-center justify-between p-4 border border-gray-100 hover:border-black transition-colors group">
                  <div className="flex items-center space-x-4">
                    <img src={record.imageUrl} className="w-12 h-12 object-cover grayscale" alt="" />
                    <div>
                      <h4 className="font-bold text-sm">{record.title}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{record.date}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if(confirm('Delete this record?')) deleteRecord(record.id);
                    }}
                    className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;

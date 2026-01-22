
import React, { useState, useEffect } from 'react';
import { Page, RecordEntry, FeaturedContent } from './types';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Records from './components/Records';
import Admin from './components/Admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [records, setRecords] = useState<RecordEntry[]>(() => {
    const saved = localStorage.getItem('studi_ho_records');
    return saved ? JSON.parse(saved) : [];
  });

  const [featured, setFeatured] = useState<FeaturedContent>(() => {
    const saved = localStorage.getItem('studi_ho_featured');
    return saved ? JSON.parse(saved) : {
      imageUrl: 'https://picsum.photos/1200/800?grayscale',
      youtubeId: 'dQw4w9WgXcQ'
    };
  });

  useEffect(() => {
    localStorage.setItem('studi_ho_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('studi_ho_featured', JSON.stringify(featured));
  }, [featured]);

  const addRecord = (newRecord: Omit<RecordEntry, 'id' | 'date'>) => {
    const entry: RecordEntry = {
      ...newRecord,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString()
    };
    setRecords([entry, ...records]);
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const updateFeatured = (data: FeaturedContent) => {
    setFeatured(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        onAdminClick={() => setIsAdminOpen(true)}
      />
      
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {currentPage === 'home' ? (
          <Home featured={featured} />
        ) : (
          <Records records={records} />
        )}
      </main>

      {isAdminOpen && (
        <Admin 
          isAuthorized={isAuthorized}
          onAuthorize={() => setIsAuthorized(true)}
          onClose={() => setIsAdminOpen(false)}
          addRecord={addRecord}
          deleteRecord={deleteRecord}
          records={records}
          updateFeatured={updateFeatured}
          currentFeatured={featured}
        />
      )}

      <footer className="py-12 px-6 border-t border-gray-100 mt-20 text-center">
        <p className="text-xs tracking-widest text-gray-400 uppercase">
          &copy; {new Date().getFullYear()} studi_ho. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;

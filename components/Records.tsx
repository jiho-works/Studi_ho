
import React, { useState } from 'react';
import { RecordEntry } from '../types';

interface RecordsProps {
  records: RecordEntry[];
}

const Records: React.FC<RecordsProps> = ({ records }) => {
  const [selectedRecord, setSelectedRecord] = useState<RecordEntry | null>(null);

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <p className="text-gray-400 italic font-light">No records yet.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-16">
        <h1 className="text-5xl font-light tracking-tighter">Records</h1>
        <p className="mt-4 text-gray-400 text-sm tracking-wide">A chronological archive of thoughts and imagery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {records.map((record) => (
          <div 
            key={record.id} 
            className="group cursor-pointer"
            onClick={() => setSelectedRecord(record)}
          >
            <div className="aspect-square bg-gray-100 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-6">
              <img 
                src={record.imageUrl} 
                alt={record.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">{record.date}</span>
              <h3 className="text-lg font-medium leading-tight">{record.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{record.content}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedRecord && (
        <div 
          className="fixed inset-0 z-[60] bg-white flex flex-col md:flex-row p-6 md:p-12 overflow-y-auto"
          onClick={() => setSelectedRecord(null)}
        >
          <button 
            className="fixed top-8 right-8 text-black z-[70] p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setSelectedRecord(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
          
          <div 
            className="w-full md:w-1/2 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedRecord.imageUrl} 
              alt={selectedRecord.title} 
              className="max-w-full max-h-[80vh] object-contain shadow-sm"
            />
          </div>
          
          <div 
            className="w-full md:w-1/2 flex flex-col justify-center px-0 md:px-16 py-12 md:py-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs tracking-widest text-gray-400 uppercase mb-4">{selectedRecord.date}</span>
            <h2 className="text-4xl font-light tracking-tight mb-8 border-b border-black pb-4">{selectedRecord.title}</h2>
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {selectedRecord.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_LOST_ITEMS } from '../data/mockData';
import { LostItem } from '../types';
import { Search, UploadCloud, Tag, Check, CheckCircle2, RotateCw, AlertCircle } from 'lucide-react';

export default function LostFoundAI() {
  const [items, setItems] = useState<LostItem[]>(INITIAL_LOST_ITEMS);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Personal Effects');
  const [itemLocation, setItemLocation] = useState('');
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchReport, setMatchReport] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    const newItem: LostItem = {
      id: `lost-${Date.now()}`,
      item: itemName,
      category: itemCategory,
      location: itemLocation || 'Unknown Concourse Sector',
      reportedAt: '15:20',
      status: 'searching',
      volunteerUpdate: 'AI analysis initiating visual clustering checks...'
    };

    setItems(prev => [newItem, ...prev]);
    setItemName('');
    setItemLocation('');
    setUploadedImageName(null);

    // Simulate AI Visual Matching Trigger
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setItems(current => current.map(item => {
        if (item.id === newItem.id) {
          return {
            ...item,
            status: 'matched',
            volunteerUpdate: 'AI match confidence 94% with item found at Gate B corridor bins! Directed Sector 3 stewards.'
          };
        }
        return item;
      }));
      setMatchReport(`AI clustered similar photo markers for "${newItem.item}". Match found!`);
    }, 4000);
  };

  const handleFileUploadSim = () => {
    setUploadedImageName('lost_item_camera_snap_32.png');
  };

  const filteredItems = items.filter(i => 
    i.item.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Report form & drag and drop */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white">AI Vision Item Portal</h3>
              <span className="text-[10px] font-mono text-[#38FFB3]">REAL-TIME VISION PATTERN MATCH</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">Item Name</label>
                  <input
                    type="text"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-[#4FD1FF]/30 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    placeholder="e.g. Leather Keyholder"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">Category</label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-[#4FD1FF]/30 rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Personal Effects" className="bg-[#070B17]">Personal Effects / Wallets</option>
                    <option value="Electronics" className="bg-[#070B17]">Electronics / Phones</option>
                    <option value="Clothing" className="bg-[#070B17]">Clothing / Flags / Caps</option>
                    <option value="Keys / Cards" className="bg-[#070B17]">Keys / Match Tickets</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase">Estimated Loss Location</label>
                <input
                  type="text"
                  value={itemLocation}
                  onChange={(e) => setItemLocation(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 focus:border-[#4FD1FF]/30 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  placeholder="e.g. Row 12, West concessions hall"
                />
              </div>

              {/* Upload image placeholder */}
              <div 
                onClick={handleFileUploadSim}
                className="border border-dashed border-white/10 hover:border-[#4FD1FF]/30 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl p-5 text-center cursor-pointer transition-all duration-150"
              >
                <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                {uploadedImageName ? (
                  <span className="text-xs text-[#38FFB3] font-mono">{uploadedImageName} (UPLOADED)</span>
                ) : (
                  <div>
                    <span className="text-xs text-gray-300 block font-semibold">Simulate Camera Upload / Drag & Drop</span>
                    <span className="text-[10px] text-gray-500 font-mono mt-1">PNG, JPG, HEIC up to 10MB</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#4FD1FF] text-[#070B17] hover:bg-[#4FD1FF]/80 py-2.5 rounded-xl text-xs font-bold transition-all duration-150"
              >
                File Loss & Report Item
              </button>
            </form>
          </div>

          {matchReport && (
            <div className="bg-emerald-500/10 border border-emerald-500/25 text-[#38FFB3] p-3 rounded-xl text-xs font-mono mt-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38FFB3]" />
              <span>{matchReport}</span>
            </div>
          )}
        </div>

        {/* Recent reports & tracking progress */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white">Live Tracking & Matching</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/[0.02] border border-white/5 rounded-lg py-1.5 pl-8 pr-3 text-[10px] text-white outline-none placeholder-gray-500 w-36 focus:w-48 transition-all"
                  placeholder="Filter matching feed..."
                />
              </div>
            </div>

            {isMatching && (
              <div className="flex items-center gap-2 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs font-mono text-[#7C5CFF]">
                <RotateCw className="w-4 h-4 animate-spin text-[#7C5CFF]" />
                <span>AI visual clusters actively indexing and analyzing sector footage...</span>
              </div>
            )}

            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
              <AnimatePresence initial={false}>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl space-y-3 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-[#4FD1FF]" />
                          <h4 className="text-xs font-bold text-white">{item.item}</h4>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono block">
                          {item.category} // Loss Area: {item.location}
                        </span>
                      </div>
                      
                      <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === 'matched' 
                          ? 'bg-emerald-500/15 text-[#38FFB3] border border-emerald-500/20' 
                          : 'bg-indigo-500/15 text-[#7C5CFF] border border-indigo-500/20 animate-pulse'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="bg-[#070B17] border border-white/5 rounded-lg p-3 flex gap-3 items-start">
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl} 
                          alt="Lost item lookup" 
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded object-cover border border-white/10 shrink-0"
                        />
                      )}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-[#38FFB3] block">AI DISPATCHER / VOLUNTEER FLOW</span>
                        <p className="text-xs text-gray-400 leading-relaxed">{item.volunteerUpdate}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

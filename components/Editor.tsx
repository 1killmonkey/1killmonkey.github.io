import React, { useState } from 'react';
import { PortfolioData } from '../types';
import { X, Save, Download, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface EditorProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  isOpen: boolean;
  onClose: () => void;
}

const EditorSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-gray-700">
      <button 
        className="w-full flex justify-between items-center p-4 text-left font-semibold hover:bg-white/5 transition"
        onClick={() => setExpanded(!expanded)}
      >
        {title}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expanded && <div className="p-4 space-y-4 bg-black/20">{children}</div>}
    </div>
  );
};

const Editor: React.FC<EditorProps> = ({ data, onChange, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleExport = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "portfolio-config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateHero = (field: string, value: string) => {
    onChange({
      ...data,
      hero: { ...data.hero, [field]: value }
    });
  };

  const updateTheme = (field: string, value: string) => {
    onChange({
      ...data,
      theme: { ...data.theme, [field]: value }
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-700 shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <RefreshCw size={20} className="text-blue-400" /> Editor Mode
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition">
          <X size={24} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <EditorSection title="Theme & Colors">
          <div>
            <label className="block text-xs uppercase text-gray-400 mb-1">Primary Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={data.theme.primaryColor}
                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                className="h-10 w-10 rounded cursor-pointer border-none bg-transparent"
              />
              <input 
                type="text" 
                value={data.theme.primaryColor}
                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase text-gray-400 mb-1">Background Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={data.theme.backgroundColor}
                onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                className="h-10 w-10 rounded cursor-pointer border-none bg-transparent"
              />
               <input 
                type="text" 
                value={data.theme.backgroundColor}
                onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </EditorSection>

        <EditorSection title="Hero Section">
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                value={data.hero.name}
                onChange={(e) => updateHero('name', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Title/Role</label>
              <input 
                type="text" 
                value={data.hero.title}
                onChange={(e) => updateHero('title', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tagline</label>
              <textarea 
                rows={2}
                value={data.hero.tagline}
                onChange={(e) => updateHero('tagline', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Avatar URL</label>
              <input 
                type="text" 
                value={data.hero.avatarUrl}
                onChange={(e) => updateHero('avatarUrl', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </EditorSection>

        <div className="p-4 bg-blue-900/20 m-4 rounded border border-blue-500/30 text-xs text-blue-200">
          <p className="font-bold mb-1">How to Save Permanently:</p>
          <ol className="list-decimal pl-4 space-y-1">
            <li>Make your changes here.</li>
            <li>Click "Export Config" below.</li>
            <li>Replace the `INITIAL_DATA` in <code>constants.ts</code> in your code with the downloaded JSON.</li>
            <li>Push to GitHub.</li>
          </ol>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 grid grid-cols-2 gap-3">
        <button 
          onClick={handleExport}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition"
        >
          <Download size={18} /> Export Config
        </button>
        <button 
          onClick={() => alert("Changes are saved to browser storage. Export to make them permanent on your site.")}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-medium transition"
        >
          <Save size={18} /> Auto-Saved
        </button>
      </div>
    </div>
  );
};

export default Editor;
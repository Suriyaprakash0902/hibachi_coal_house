import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, LogOut, Settings } from 'lucide-react';
import { useAlert } from '../../components/AlertContext';
import GalleryManager from './GalleryManager';
import logoImg from '../../assets/images/logo.jpeg';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState('gallery');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      showAlert('Please login first', 'error');
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    showAlert('Logged out successfully', 'success');
  };

  const tabs = [
    { id: 'gallery', name: 'Gallery', icon: ImageIcon },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <div className="w-64 bg-darker border-r border-gray flex flex-col h-full sticky top-0">
        <div className="p-6 border-b border-gray">
          <img src={logoImg} alt="Hibachi Coal House" className="h-12 w-auto object-contain rounded-md mb-2" />
          <h2 className="text-xl font-black text-primary uppercase tracking-widest">Admin Portal</h2>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded font-bold transition ${
                activeTab === tab.id ? 'bg-primary text-darker' : 'text-light/70 hover:bg-gray hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              {tab.name}
            </button>
          ))}
        </nav>
        
        <button onClick={handleLogout} className="mt-auto w-full flex items-center gap-3 px-4 py-3 rounded text-red-500 font-bold hover:bg-red-500/10 transition">
          <LogOut size={20} /> Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-10 relative overflow-hidden overflow-y-auto">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-5 z-0"></div>
        <div className="relative z-10 h-full">
          <h1 className="text-3xl font-bold mb-8 capitalize">{activeTab} Management</h1>
          
          {activeTab === 'gallery' && <GalleryManager />}
          
          {['settings'].includes(activeTab) && (
            <div className="bg-darker/90 backdrop-blur-md border border-gray rounded-xl p-8 shadow-xl">
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray rounded-lg text-light/40">
                <Settings size={64} className="mb-6 opacity-30" />
                <p className="font-bold text-2xl text-light/70 capitalize">{activeTab} Dashboard</p>
                <p className="text-md mt-2">Manage all your {activeTab} here. Connected securely to the Laravel API.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

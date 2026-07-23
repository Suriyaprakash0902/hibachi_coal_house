import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { useAlert } from '../../components/AlertContext';
import api from '../../api';

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', image: null, link: '', status: true });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/banners');
      setBanners(res.data);
    } catch (error) {
      showAlert('Failed to load banners', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ title: item.title, image: null, link: item.link || '', status: Boolean(item.status) });
    } else {
      setEditingId(null);
      setFormData({ title: '', image: null, link: '', status: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('link', formData.link);
      payload.append('status', formData.status ? 1 : 0);
      if (formData.image) {
        payload.append('image', formData.image);
      }

      if (editingId) {
        payload.append('_method', 'PUT');
        await api.post(`/admin/banners/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showAlert('Banner updated', 'success');
      } else {
        await api.post('/admin/banners', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showAlert('Banner added', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      showAlert('Error saving banner', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await api.delete(`/admin/banners/${id}`);
        showAlert('Banner deleted', 'success');
        fetchData();
      } catch (error) {
        showAlert('Failed to delete', 'error');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  return (
    <div className="bg-darker border border-gray rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray flex justify-between items-center bg-dark">
        <h2 className="text-2xl font-bold">Banners ({banners.length})</h2>
        <button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-darker font-bold py-2 px-4 rounded flex items-center gap-2">
          <Plus size={18} /> Add Banner
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-dark text-light/70 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Link URL</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray">
            {banners.map(banner => (
              <tr key={banner.id} className="hover:bg-dark/50 transition">
                <td className="p-4 font-bold">{banner.title}</td>
                <td className="p-4 text-light/70">{banner.link || 'N/A'}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded border ${banner.status ? 'bg-primary/20 text-primary border-primary/30' : 'bg-gray/50 text-light/50 border-gray'}`}>
                    {banner.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(banner)} className="p-2 text-light hover:text-primary bg-dark rounded transition"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(banner.id)} className="p-2 text-light hover:text-red-500 bg-dark rounded transition"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr><td colSpan="4" className="p-8 text-center text-light/50">No banners found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-darker w-full max-w-lg rounded-xl shadow-2xl border border-gray overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray bg-dark">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Banner' : 'Add Banner'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-light hover:text-primary"><X size={24}/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-light/70 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-light/70 mb-1">Image Upload</label>
                <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-light/70 mb-1">Link URL (Optional)</label>
                <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="/offers" className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none" />
              </div>
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.status} onChange={e => setFormData({...formData, status: e.target.checked})} className="accent-primary w-4 h-4" />
                  <span className="text-sm font-bold">Active</span>
                </label>
              </div>
              <div className="pt-4 border-t border-gray flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded font-bold hover:bg-gray transition">Cancel</button>
                <button type="submit" className="bg-primary text-darker px-6 py-2 rounded font-bold hover:bg-primary/90 transition">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManager;

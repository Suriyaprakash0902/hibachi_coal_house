import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useAlert } from '../../components/AlertContext';
import api from '../../api';

const OfferManager = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '',
    discount_info: '',
    image: null, 
    status: true 
  });

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/storage')) return `https://vazhithunai.ai/backend2/public${url}`;
    return url;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/offers');
      setOffers(res.data);
    } catch (error) {
      showAlert('Failed to load offers', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ 
        title: item.title, 
        description: item.description || '',
        discount_info: item.discount_info || '',
        image: null, 
        status: Boolean(item.status) 
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', discount_info: '', image: null, status: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('discount_info', formData.discount_info);
      payload.append('status', formData.status ? 1 : 0);
      if (formData.image) {
        payload.append('image', formData.image);
      }

      if (editingId) {
        payload.append('_method', 'PUT');
        await api.post(`/admin/offers/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showAlert('Offer updated successfully', 'success');
      } else {
        await api.post('/admin/offers', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showAlert('Offer added successfully', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error saving offer', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      await api.delete(`/admin/offers/${id}`);
      showAlert('Offer deleted', 'success');
      fetchData();
    } catch (error) {
      showAlert('Error deleting offer', 'error');
    }
  };

  const handleStatusToggle = async (offer) => {
    try {
      const payload = new FormData();
      payload.append('title', offer.title);
      payload.append('status', offer.status ? 0 : 1);
      payload.append('_method', 'PUT');
      
      await api.post(`/admin/offers/${offer.id}`, payload);
      fetchData();
      showAlert('Offer status updated', 'success');
    } catch (error) {
      showAlert('Error updating status', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-light/60">Manage promotional offers and discounts.</p>
        <button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-darker font-bold py-2 px-4 rounded flex items-center gap-2 transition">
          <Plus size={20} /> Add Offer
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={48} /></div>
      ) : (
        <div className="bg-darker border border-gray rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm text-light">
            <thead className="bg-dark text-primary uppercase font-black text-xs">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title & Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray">
              {offers.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-light/50">No offers found. Add your first offer!</td></tr>
              ) : (
                offers.map(offer => (
                  <tr key={offer.id} className="hover:bg-dark/50 transition">
                    <td className="px-6 py-4">
                      {offer.image ? (
                        <img src={getImageUrl(offer.image)} alt={offer.title} className="w-24 h-16 object-cover rounded border border-gray" />
                      ) : (
                        <div className="w-24 h-16 bg-dark rounded border border-gray flex items-center justify-center text-light/20">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-base mb-1">{offer.title}</div>
                      {offer.discount_info && <div className="text-primary font-black text-xs uppercase tracking-wider mb-1">{offer.discount_info}</div>}
                      {offer.description && <div className="text-light/60 text-xs truncate max-w-xs">{offer.description}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleStatusToggle(offer)}
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${offer.status ? 'bg-green-500/20 text-green-500 border border-green-500/50' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}
                      >
                        {offer.status ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button onClick={() => handleOpenModal(offer)} className="text-blue-400 hover:text-blue-300 transition" title="Edit"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(offer.id)} className="text-red-500 hover:text-red-400 transition" title="Delete"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-darker rounded-xl w-full max-w-2xl border border-gray shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray bg-dark/50">
              <h2 className="text-xl font-black text-primary uppercase tracking-wider">{editingId ? 'Edit Offer' : 'Add New Offer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-light hover:text-red-500 transition"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-light/70 mb-1">Offer Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-dark border border-gray rounded p-2.5 text-light focus:border-primary focus:outline-none transition" placeholder="e.g., Weekend Special" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-light/70 mb-1">Discount Info</label>
                  <input type="text" value={formData.discount_info} onChange={e => setFormData({...formData, discount_info: e.target.value})} className="w-full bg-dark border border-gray rounded p-2.5 text-light focus:border-primary focus:outline-none transition" placeholder="e.g., 20% OFF or FLAT ₹100" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-light/70 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-dark border border-gray rounded p-2.5 text-light focus:border-primary focus:outline-none transition" placeholder="Detail the terms or what the offer includes..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-light/70 mb-1">Offer Image</label>
                <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none transition" />
                <p className="text-xs text-light/40 mt-1">Leave empty to keep the existing image when editing.</p>
              </div>

              <div className="flex items-center gap-2 mt-4 p-4 bg-dark rounded border border-gray">
                <input type="checkbox" id="offerStatus" checked={formData.status} onChange={e => setFormData({...formData, status: e.target.checked})} className="w-4 h-4 accent-primary" />
                <label htmlFor="offerStatus" className="font-bold cursor-pointer">Active / Visible on site</label>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded font-bold text-light hover:bg-gray transition">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded font-black bg-primary text-darker hover:bg-primary/90 transition shadow-lg shadow-primary/20">
                  {editingId ? 'Save Changes' : 'Create Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferManager;

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { useAlert } from '../../components/AlertContext';
import api from '../../api';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    discount_price: '',
    is_veg: true,
    status: true,
    image: null,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/admin/products'),
        api.get('/admin/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (error) {
      showAlert('Failed to load data', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        category_id: product.category_id,
        description: product.description || '',
        price: product.price,
        discount_price: product.discount_price || '',
        is_veg: Boolean(product.is_veg),
        status: Boolean(product.status),
        image: null,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        description: '',
        price: '',
        discount_price: '',
        is_veg: true,
        status: true,
        image: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('category_id', formData.category_id);
      payload.append('description', formData.description);
      payload.append('price', formData.price);
      if (formData.discount_price) {
        payload.append('discount_price', formData.discount_price);
      }
      payload.append('is_veg', formData.is_veg ? 1 : 0);
      payload.append('status', formData.status ? 1 : 0);
      
      if (formData.image) {
        payload.append('image', formData.image);
      }

      if (editingId) {
        payload.append('_method', 'PUT'); // Laravel workaround for multipart PUT
        await api.post(`/admin/products/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showAlert('Product updated successfully', 'success');
      } else {
        await api.post('/admin/products', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showAlert('Product added successfully', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error saving product', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/admin/products/${id}`);
        showAlert('Product deleted', 'success');
        fetchData();
      } catch (error) {
        showAlert('Failed to delete', 'error');
      }
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      await api.put(`/admin/products/${product.id}`, {
        ...product,
        status: !product.status
      });
      fetchData();
    } catch (error) {
      showAlert('Failed to update status', 'error');
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  return (
    <div className="bg-darker border border-gray rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray flex justify-between items-center bg-dark">
        <h2 className="text-2xl font-bold">Products ({products.length})</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 text-darker font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-dark text-light/70 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-dark/50 transition">
                <td className="p-4 font-bold">{product.name}</td>
                <td className="p-4 text-light/70">{product.category?.name}</td>
                <td className="p-4 font-bold text-primary">
                  {product.discount_price ? (
                    <div>
                      <span className="line-through text-light/40 text-xs mr-2">₹{product.price}</span>
                      <span>₹{product.discount_price}</span>
                    </div>
                  ) : (
                    `₹${product.price}`
                  )}
                </td>
                <td className="p-4">
                  {product.is_veg ? (
                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded border border-green-500/30">Veg</span>
                  ) : (
                    <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded border border-red-500/30">Non-Veg</span>
                  )}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleToggleStatus(product)}
                    className={`text-xs px-2 py-1 rounded border transition ${
                      product.status ? 'bg-primary/20 text-primary border-primary/30' : 'bg-gray/50 text-light/50 border-gray'
                    }`}
                  >
                    {product.status ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(product)} className="p-2 text-light hover:text-primary bg-dark rounded transition">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-light hover:text-red-500 bg-dark rounded transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan="6" className="p-8 text-center text-light/50">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-darker w-full max-w-lg rounded-xl shadow-2xl border border-gray overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray bg-dark">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-light hover:text-primary"><X size={24}/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-light/70 mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-light/70 mb-1">Category</label>
                  <select required value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none">
                    <option value="">Select...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-light/70 mb-1">Price (₹)</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-light/70 mb-1">Discount (₹)</label>
                  <input type="number" step="0.01" value={formData.discount_price} onChange={e => setFormData({...formData, discount_price: e.target.value})} placeholder="Optional" className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-light/70 mb-1">Image Upload</label>
                  <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-light/70 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-dark border border-gray rounded p-2 text-light focus:border-primary focus:outline-none"></textarea>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_veg} onChange={e => setFormData({...formData, is_veg: e.target.checked})} className="accent-primary w-4 h-4" />
                  <span className="text-sm font-bold">Vegetarian</span>
                </label>
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

export default ProductManager;

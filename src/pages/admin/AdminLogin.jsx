import React, { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../components/AlertContext';
import api from '../../api';
import logoImg from '../../assets/images/logo.jpeg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showAlert('Please enter email and password', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token && response.data.user.role === 'admin') {
        localStorage.setItem('adminToken', response.data.token);
        showAlert('Welcome back, Admin!', 'success');
        navigate('/admin');
      } else {
        showAlert('Unauthorized access.', 'error');
      }
    } catch (error) {
      showAlert('Invalid credentials.', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-darker border border-gray rounded-xl shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        <div className="text-center mb-8">
          <img src={logoImg} alt="Hibachi Coal House" className="h-20 w-auto mx-auto object-contain rounded-md mb-4" />
          <h2 className="text-3xl font-black uppercase tracking-wider text-primary">Admin Access</h2>
          <p className="text-light/50 mt-2">Authorized personnel only</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-light/80 mb-2 uppercase tracking-wide">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-light/40" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark border border-gray rounded px-10 py-3 text-light focus:outline-none focus:border-primary transition"
                placeholder="admin@hibachi.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-light/80 mb-2 uppercase tracking-wide">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-light/40" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark border border-gray rounded px-10 py-3 text-light focus:outline-none focus:border-primary transition"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-darker font-black text-lg py-4 rounded transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Secure Login'} <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

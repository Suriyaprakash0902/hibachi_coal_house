import React, { useState, useEffect } from 'react';
import { Loader2, Star, Plus, Search, ChevronRight } from 'lucide-react';
import { useAlert } from '../components/AlertContext';
import api from '../api';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/storage')) return `https://vazhithunai.ai/backend2/public${url}`;
    return url;
  };
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu:', error);
        showAlert('Failed to load menu.', 'error');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category?.name === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const catName = product.category?.name || 'Uncategorized';
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(product);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={64} />
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen pb-20">
      
      {/* Compact Premium Header */}
      <div className="bg-darker border-b border-white/5 pt-12 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white mb-8">Explore <span className="text-primary">Menu</span></h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-light/40 group-focus-within:text-primary transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Search for your favorite dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark/50 border border-white/10 rounded-full py-4 pl-14 pr-6 text-light focus:border-primary focus:bg-dark focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner text-lg"
            />
          </div>
        </div>
      </div>

      {/* Sleek Sticky Category Bar */}
      <div className="sticky top-0 z-40 bg-dark/90 backdrop-blur-xl border-b border-white/5 shadow-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-3 scrollbar-hide items-center justify-start md:justify-center">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full font-black uppercase tracking-wider text-sm transition-all duration-300 ${
                activeCategory === 'All' 
                  ? 'bg-primary text-darker shadow-[0_0_15px_rgba(255,184,0,0.4)] scale-105' 
                  : 'bg-white/5 text-light/70 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              All Dishes
            </button>
            
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full font-black uppercase tracking-wider text-sm transition-all duration-300 ${
                  activeCategory === cat.name 
                    ? 'bg-primary text-darker shadow-[0_0_15px_rgba(255,184,0,0.4)] scale-105' 
                    : 'bg-white/5 text-light/70 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 pt-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 text-light/40">
            <Search size={64} className="mx-auto mb-6 opacity-20" />
            <p className="text-2xl font-medium">No dishes found matching your criteria.</p>
          </div>
        ) : (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-20">
               {/* Elegant, compact section header */}
               <div className="flex items-center gap-6 mb-10">
                  <h2 className="text-3xl font-black uppercase tracking-widest text-white drop-shadow-md">{category}</h2>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-primary/30 to-transparent rounded-full"></div>
               </div>
               
               {/* Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(product => (
              <div key={product.id} className="bg-darker rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 group shadow-lg hover:shadow-[0_0_40px_rgba(255,184,0,0.15)] transform hover:-translate-y-2 flex flex-col relative">
                
                {/* Image Container with Gradient Overlay */}
                <div className="h-64 bg-dark relative overflow-hidden">
                  <img 
                    src={getImageUrl(product.image) || `https://via.placeholder.com/600x400.png/141414/FFB800?text=${encodeURIComponent(product.name)}`} 
                    alt={product.name}
                    className="w-full h-full object-cover z-0 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/20 to-transparent z-10"></div>
                  
                  {/* Veg/Non-veg beautifully styled tag */}
                  {product.is_veg ? (
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-green-500/30 z-20 flex items-center gap-2 shadow-xl">
                      <Star size={12} className="text-green-500 fill-green-500" />
                      <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Veg</span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 z-20 flex items-center gap-2 shadow-xl">
                      <Star size={12} className="text-red-500 fill-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Non-Veg</span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6 relative z-20 flex-1 flex flex-col -mt-12 bg-gradient-to-b from-transparent via-darker to-darker">
                  <div className="bg-primary/10 text-primary w-max px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3 border border-primary/20 backdrop-blur-sm shadow-sm">
                    {product.category?.name || 'Chef Special'}
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-light/50 text-sm leading-relaxed flex-1 font-medium">{product.description || 'Prepared with our signature blend of spices and coal-fired to perfection.'}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;

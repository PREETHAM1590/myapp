import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, ShoppingCart, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Marketplace = () => {
  const navigate = useNavigate();
  const { ecoTokens, updateEcoTokens } = useWallet();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'eco-products', name: 'Eco Products' },
    { id: 'recycled', name: 'Recycled Items' },
    { id: 'sustainable', name: 'Sustainable Goods' },
    { id: 'upcycled', name: 'Upcycled Items' }
  ];

  useEffect(() => {
    fetchMarketplaceItems();
  }, [selectedCategory]);

  const fetchMarketplaceItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/marketplace`, {
        params: selectedCategory !== 'all' ? { category: selectedCategory } : {}
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
      // Use mock data for demo
      setItems([
        {
          id: '1',
          title: 'Recycled Plastic Water Bottle',
          description: 'Eco-friendly water bottle made from 100% recycled materials',
          price: 50,
          category: 'eco-products',
          image_url: null,
          is_available: true
        },
        {
          id: '2',
          title: 'Bamboo Phone Case',
          description: 'Sustainable phone case made from bamboo fiber',
          price: 75,
          category: 'sustainable',
          image_url: null,
          is_available: true
        },
        {
          id: '3',
          title: 'Upcycled Tote Bag',
          description: 'Stylish tote bag made from recycled fabric',
          price: 40,
          category: 'upcycled',
          image_url: null,
          is_available: true
        },
        {
          id: '4',
          title: 'Solar Power Bank',
          description: 'Portable charger powered by solar energy',
          price: 120,
          category: 'eco-products',
          image_url: null,
          is_available: true
        },
        {
          id: '5',
          title: 'Recycled Paper Notebook',
          description: 'Beautiful notebook made from 100% recycled paper',
          price: 25,
          category: 'recycled',
          image_url: null,
          is_available: true
        },
        {
          id: '6',
          title: 'Organic Cotton T-Shirt',
          description: 'Comfortable t-shirt made from organic cotton',
          price: 60,
          category: 'sustainable',
          image_url: null,
          is_available: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (item) => {
    if (ecoTokens < item.price) {
      toast.error(`Not enough ECO tokens! You need ${item.price - ecoTokens} more tokens.`);
      return;
    }

    try {
      // In a real app, you would make an API call to process the purchase
      updateEcoTokens(-item.price);
      toast.success(`Successfully purchased ${item.title}!`);
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    }
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category) => {
    const colors = {
      'eco-products': 'bg-green-100 text-green-800',
      'recycled': 'bg-blue-100 text-blue-800',
      'sustainable': 'bg-yellow-100 text-yellow-800',
      'upcycled': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button 
            onClick={() => navigate('/community')}
            className="p-2 -ml-2 text-gray-500 hover:text-primary-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">Marketplace</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* ECO Token Balance */}
        <div className="card bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">Your Balance</h2>
              <p className="text-2xl font-bold">{ecoTokens} ECO</p>
            </div>
            <Coins className="w-12 h-12 opacity-80" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
            placeholder="Search eco-friendly products..."
          />
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">🌱 Eco Week Special</h3>
              <p className="text-green-100 text-sm">20% off on sustainable products</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-100 mb-1">Use code</p>
              <p className="font-bold">ECO20</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-300 h-32 rounded-lg mb-3"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-3 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="card hover:shadow-lg transition-shadow">
                {/* Product Image Placeholder */}
                <div className="bg-gray-100 h-32 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl">
                    {item.category === 'eco-products' ? '🌱' :
                     item.category === 'recycled' ? '♻️' :
                     item.category === 'sustainable' ? '🌍' :
                     item.category === 'upcycled' ? '🔄' : '📦'}
                  </span>
                </div>
                
                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Category Badge */}
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category.replace('-', ' ')}
                  </span>
                  
                  {/* Price and Purchase */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-900">{item.price}</span>
                    </div>
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={ecoTokens < item.price}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        ecoTokens >= item.price
                          ? 'bg-primary-500 text-white hover:bg-primary-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {ecoTokens >= item.price ? 'Buy' : 'Insufficient'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* How to Earn ECO Tokens */}
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Need more ECO tokens?</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Scan and recycle items to earn tokens</p>
            <p>• Complete community challenges</p>
            <p>• Participate in educational activities</p>
            <p>• Invite friends to join Waste Wise</p>
          </div>
          <button 
            onClick={() => navigate('/scan')}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            Start Scanning to Earn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
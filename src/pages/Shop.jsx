import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../context/CartContext';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCollection = searchParams.get('collection') || 'All';

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCollection);
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync with URL query parameter
  useEffect(() => {
    const queryCol = searchParams.get('collection');
    if (queryCol) {
      setSelectedCategory(queryCol);
    }
  }, [searchParams]);

  // Categories & Fabrics lists
  const categories = ['All', 'Silk Dreams', 'Lace Nights', 'Cotton Comfort', 'Home Serene', 'Accessories'];
  const fabrics = ['All', 'Silk', 'Cotton', 'Velvet', 'Gold'];

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category match
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;

    // Price range match
    let priceMatch = true;
    if (selectedPriceRange === 'under-2000') {
      priceMatch = product.price < 2000;
    } else if (selectedPriceRange === '2000-4000') {
      priceMatch = product.price >= 2000 && product.price <= 4000;
    } else if (selectedPriceRange === 'above-4000') {
      priceMatch = product.price > 4000;
    }

    // Fabric match
    const fabricMatch =
      selectedFabric === 'All' ||
      product.fabric.toLowerCase().includes(selectedFabric.toLowerCase());

    return categoryMatch && priceMatch && fabricMatch;
  }).sort((a, b) => {
    if (sortOption === 'price-low') {
      return a.price - b.price;
    } else if (sortOption === 'price-high') {
      return b.price - a.price;
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // Default sorting
  });

  return (
    <div className="w-full bg-surface pt-32 pb-section-gap min-h-screen">
      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Header Title */}
        <header className="mb-12 text-center md:text-left animate-fade-in">
          <span className="font-ui text-xs text-primary block uppercase tracking-[0.3em] mb-2">Atelier</span>
          <h1 className="font-editorial text-4xl md:text-5xl text-on-surface">Shop All</h1>
          <div className="w-12 h-px bg-primary/20 mt-4 hidden md:block"></div>
        </header>

        {/* Mobile Filter Toggle & Sort */}
        <div className="flex md:hidden justify-between items-center bg-surface-container p-4 mb-6 rounded-sm border border-primary/10">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="flex items-center gap-2 font-ui text-xs uppercase tracking-widest text-primary font-semibold"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent border-none text-xs font-ui text-on-surface uppercase tracking-widest focus:ring-0 outline-none pr-8 cursor-pointer"
            >
              <option value="default" className="bg-surface text-on-surface">Sort By</option>
              <option value="price-low" className="bg-surface text-on-surface">Price: Low to High</option>
              <option value="price-high" className="bg-surface text-on-surface">Price: High to Low</option>
              <option value="rating" className="bg-surface text-on-surface">Customer Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 items-start">
          {/* Left Sidebar: Filters (Hidden on Mobile unless toggled) */}
          <aside
            className={`space-y-8 lg:block ${
              showFiltersMobile ? 'block' : 'hidden'
            } p-6 lg:p-0 bg-surface-container lg:bg-transparent border border-primary/10 lg:border-none rounded-sm mb-8 lg:mb-0`}
          >
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="font-ui font-semibold text-xs text-primary uppercase tracking-widest">
                Collections
              </h3>
              <div className="flex flex-col gap-3 font-ui text-sm text-on-surface-variant">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowFiltersMobile(false);
                    }}
                    className={`text-left hover:text-primary transition-colors ${
                      selectedCategory === cat ? 'text-primary font-semibold' : ''
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-primary/10" />

            {/* Price Filter */}
            <div className="space-y-4">
              <h3 className="font-ui font-semibold text-xs text-primary uppercase tracking-widest">
                Price
              </h3>
              <div className="flex flex-col gap-3 font-ui text-sm text-on-surface-variant">
                {[
                  { label: 'All Prices', value: 'All' },
                  { label: 'Under ₹2,000', value: 'under-2000' },
                  { label: '₹2,000 - ₹4,000', value: '2000-4000' },
                  { label: 'Above ₹4,000', value: 'above-4000' }
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      setSelectedPriceRange(range.value);
                      setShowFiltersMobile(false);
                    }}
                    className={`text-left hover:text-primary transition-colors ${
                      selectedPriceRange === range.value ? 'text-primary font-semibold' : ''
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-primary/10" />

            {/* Fabric Filter */}
            <div className="space-y-4">
              <h3 className="font-ui font-semibold text-xs text-primary uppercase tracking-widest">
                Fabric Material
              </h3>
              <div className="flex flex-col gap-3 font-ui text-sm text-on-surface-variant">
                {fabrics.map((fab) => (
                  <button
                    key={fab}
                    onClick={() => {
                      setSelectedFabric(fab);
                      setShowFiltersMobile(false);
                    }}
                    className={`text-left hover:text-primary transition-colors ${
                      selectedFabric === fab ? 'text-primary font-semibold' : ''
                    }`}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Column: Grid and Sorting Bar */}
          <div className="space-y-6">
            {/* Sorting bar (Desktop only) */}
            <div className="hidden md:flex justify-between items-center border-b border-primary/10 pb-4">
              <span className="font-ui text-xs text-on-surface-variant">
                Showing {filteredProducts.length} masterpieces
              </span>
              <div className="flex items-center gap-3">
                <span className="font-ui text-xs text-on-surface-variant uppercase tracking-widest">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent border border-primary/20 text-xs font-ui text-on-surface uppercase tracking-widest py-1.5 px-4 focus:border-primary focus:ring-0 outline-none cursor-pointer rounded-sm"
                >
                  <option value="default" className="bg-surface text-on-surface">Signature Edit</option>
                  <option value="price-low" className="bg-surface text-on-surface">Price: Low to High</option>
                  <option value="price-high" className="bg-surface text-on-surface">Price: High to Low</option>
                  <option value="rating" className="bg-surface text-on-surface">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group cursor-pointer flex flex-col h-full animate-fade-in"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden mb-6 border border-primary/10 transition-colors duration-500 group-hover:border-primary/40 bg-surface-container rounded-sm">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {product.tag && (
                        <div className="absolute top-4 left-4 bg-tertiary/60 backdrop-blur-md px-3 py-1 border border-primary/20">
                          <span className="font-ui text-[9px] font-semibold text-primary uppercase tracking-widest">
                            {product.tag}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-center mt-auto">
                      <h4 className="font-ui text-base text-on-surface group-hover:text-primary transition-colors duration-400">
                        {product.name}
                      </h4>
                      <p className="font-ui text-xs text-primary mt-2 font-semibold tracking-wider">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty Results State
              <div className="py-24 text-center glass-card p-12 rounded-sm border border-primary/10">
                <h3 className="font-editorial text-2xl text-on-surface mb-4">No matching creations found.</h3>
                <p className="text-on-surface-variant font-ui text-sm mb-8 max-w-md mx-auto">
                  Adjust your filters or reset selections to discover items in our midnight collection.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedPriceRange('All');
                    setSelectedFabric('All');
                  }}
                  className="bg-primary text-surface font-ui text-xs uppercase tracking-widest font-semibold py-4 px-10 hover:bg-primary-fixed transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;

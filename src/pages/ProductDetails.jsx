import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart, PRODUCTS } from '../context/CartContext';
import { Star, Minus, Plus, ChevronDown, X } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find product by URL ID
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  // Component State
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Sync state when product change
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setMainImage(product.images[0]);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return <div className="text-center py-40 font-editorial text-2xl text-primary">Creation not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/checkout');
  };

  // Filter 4 related products (excluding the current one)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.category === 'Accessories')
  ).slice(0, 4);

  return (
    <div className="w-full bg-surface pt-32 pb-section-gap">
      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto custom-scrollbar md:w-24 max-h-[500px]">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-20 h-24 md:w-full md:h-28 border hover:border-primary transition-all overflow-hidden group rounded-sm bg-surface-container ${
                    mainImage === img ? 'border-primary' : 'border-primary/20'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </button>
              ))}
            </div>

            {/* Main Zooming image */}
            <div className="flex-1 aspect-[4/5] bg-surface-container-low border border-primary/10 overflow-hidden relative group rounded-sm">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 bg-tertiary/60 backdrop-blur-md px-3 py-1 border border-primary/20">
                  <span className="font-ui text-[9px] font-semibold text-primary uppercase tracking-widest">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details and Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="font-ui text-xs text-primary tracking-widest uppercase block mb-1">
                {product.category}
              </span>
              <h1 className="font-editorial text-3xl md:text-5xl text-on-surface leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 pt-2">
                <span className="font-ui text-xl text-primary font-semibold">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-ui text-sm text-on-surface-variant line-through opacity-60">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <div className="flex items-center gap-1.5 border-l border-primary/20 pl-4 text-primary">
                  <Star size={14} fill="#e6c364" stroke="none" />
                  <span className="font-ui text-xs font-semibold">{product.rating}</span>
                  <span className="font-ui text-xs text-on-surface-variant ml-1">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="font-ui text-sm md:text-base text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            <hr className="border-primary/15" />

            {/* Color Selector */}
            <div className="space-y-3">
              <span className="font-ui text-xs uppercase tracking-widest text-on-surface-variant">
                Color: <span className="text-primary font-semibold">{selectedColor}</span>
              </span>
              <div className="flex gap-4">
                {product.colors.map((color) => {
                  let bgColor = '#1A1A2E'; // Midnight
                  if (color === 'Burgundy') bgColor = '#4A0E0E';
                  if (color === 'Ivory') bgColor = '#F5F5F0';
                  if (color === 'Gold') bgColor = '#C9A84C';
                  if (color === 'Black' || color === 'Onyx') bgColor = '#0A0A0A';
                  if (color === 'Dusty Rose') bgColor = '#C4A0A0';
                  if (color === 'Slate') bgColor = '#4F5D75';

                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border transition-all duration-300 ${
                        selectedColor === color
                          ? 'ring-2 ring-primary ring-offset-4 ring-offset-surface scale-105'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: bgColor }}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes[0] !== 'OS' && product.sizes[0] !== 'One Size' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-ui text-xs uppercase tracking-widest text-on-surface-variant">
                    Size: <span className="text-primary font-semibold">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="font-ui text-xs uppercase tracking-widest text-primary underline underline-offset-4 hover:text-primary-fixed transition-colors font-semibold"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 border font-ui text-xs tracking-widest transition-all rounded-sm font-semibold active:scale-95 ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-surface'
                          : 'border-primary/20 text-on-surface-variant hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-primary/20 h-14 bg-surface-container rounded-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 text-primary hover:text-primary-fixed transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-ui text-sm font-semibold w-12 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 text-primary hover:text-primary-fixed transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-surface h-14 font-ui text-xs uppercase tracking-widest font-semibold hover:bg-primary-fixed transition-all active:scale-[0.98] rounded-sm shadow-xl shadow-primary/10"
                >
                  Add to Cart
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="w-full border border-primary/50 text-primary h-14 font-ui text-xs uppercase tracking-widest font-semibold hover:bg-primary/5 transition-all active:scale-[0.98] rounded-sm"
              >
                Buy Now
              </button>
            </div>

            {/* Success Toast */}
            {showSuccessToast && (
              <div className="bg-primary/10 border border-primary/30 p-4 rounded-sm text-center animate-fade-in">
                <p className="text-primary font-ui text-xs uppercase tracking-widest font-semibold">
                  ✓ Scent of luxury added to your cart
                </p>
              </div>
            )}

            {/* Collapsible Details Accordions */}
            <div className="mt-8 border-t border-primary/15">
              <details className="group" open>
                <summary className="flex justify-between items-center py-5 cursor-pointer list-none select-none">
                  <span className="font-ui text-xs uppercase tracking-widest font-semibold text-on-surface group-open:text-primary">
                    Description
                  </span>
                  <ChevronDown size={16} className="text-primary group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="pb-5 font-ui text-sm text-on-surface-variant leading-relaxed">
                  {product.description}
                </div>
              </details>
              
              <details className="group border-t border-primary/10">
                <summary className="flex justify-between items-center py-5 cursor-pointer list-none select-none">
                  <span className="font-ui text-xs uppercase tracking-widest font-semibold text-on-surface group-open:text-primary">
                    Fabric & Care
                  </span>
                  <ChevronDown size={16} className="text-primary group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="pb-5 font-ui text-sm text-on-surface-variant leading-relaxed">
                  <p className="font-semibold text-on-surface mb-1">Fabric details:</p>
                  <p className="mb-3">{product.fabric}</p>
                  <p className="font-semibold text-on-surface mb-1">Care instructions:</p>
                  <p>{product.care}</p>
                </div>
              </details>

              <details className="group border-t border-primary/10">
                <summary className="flex justify-between items-center py-5 cursor-pointer list-none select-none">
                  <span className="font-ui text-xs uppercase tracking-widest font-semibold text-on-surface group-open:text-primary">
                    Fit Details
                  </span>
                  <ChevronDown size={16} className="text-primary group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="pb-5 font-ui text-sm text-on-surface-variant leading-relaxed">
                  {product.fit}
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-section-gap border-t border-primary/10 pt-20">
          <h2 className="font-editorial text-3xl text-center text-on-surface mb-12">
            You May Also Love
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="flex flex-col gap-4 group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden border border-primary/10 relative rounded-sm bg-surface-container">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-surface/90 text-primary px-5 py-2 font-ui text-[10px] uppercase tracking-widest font-semibold">
                      View Creation
                    </button>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-ui text-sm text-on-surface group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-ui text-xs text-primary font-semibold">
                    ₹{p.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="mt-section-gap border-t border-primary/10 pt-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6 border-b border-primary/10 pb-8">
              <div className="text-center sm:text-left">
                <h2 className="font-editorial text-2xl mb-2 text-on-surface">Customer Reviews</h2>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex text-primary gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#e6c364" stroke="none" />
                    ))}
                  </div>
                  <span className="font-ui text-sm font-semibold">{product.rating} out of 5 stars</span>
                </div>
              </div>
              <button className="border border-primary/50 px-8 py-3 font-ui text-xs uppercase tracking-widest font-semibold text-primary hover:bg-primary/5 transition-all active:scale-95 rounded-sm">
                Write A Review
              </button>
            </div>
            
            <div className="space-y-12">
              <div className="border-b border-primary/10 pb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-ui text-sm font-semibold text-on-surface">Aditi R.</h4>
                    <div className="flex text-primary text-[14px] mt-1 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#e6c364" stroke="none" />
                      ))}
                    </div>
                  </div>
                  <span className="font-ui text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Oct 12, 2026
                  </span>
                </div>
                <p className="font-ui text-sm text-on-surface-variant leading-relaxed">
                  "The quality of the silk is exceptional. It feels like a second skin. Perfectly true to size and the Midnight blue is stunningly deep."
                </p>
              </div>
              
              <div className="border-b border-primary/10 pb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-ui text-sm font-semibold text-on-surface">Meera K.</h4>
                    <div className="flex text-primary text-[14px] mt-1 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#e6c364" stroke="none" />
                      ))}
                    </div>
                  </div>
                  <span className="font-ui text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Sep 28, 2026
                  </span>
                </div>
                <p className="font-ui text-sm text-on-surface-variant leading-relaxed">
                  "Beautifully packaged and the delivery was prompt. This has become my favorite evening-wear. Looking forward to more collections!"
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Size Guide Modal (Rendered conditionally) */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSizeGuide(false)}
          ></div>
          <div className="absolute w-[90%] max-w-xl glass-panel p-8 md:p-12 shadow-2xl animate-fade-in rounded-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-editorial text-2xl text-on-surface">Size Guide</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-on-surface-variant hover:text-primary transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <table className="w-full text-left font-ui border-collapse">
              <thead>
                <tr className="border-b border-primary/20 text-primary">
                  <th className="py-4 font-ui text-xs font-semibold uppercase tracking-widest">Size</th>
                  <th className="py-4 font-ui text-xs font-semibold uppercase tracking-widest">Bust (in)</th>
                  <th className="py-4 font-ui text-xs font-semibold uppercase tracking-widest">Waist (in)</th>
                  <th className="py-4 font-ui text-xs font-semibold uppercase tracking-widest">Hip (in)</th>
                </tr>
              </thead>
              <tbody className="text-on-surface-variant text-sm">
                {[
                  { size: 'XS', bust: '32-33', waist: '24-25', hip: '34-35' },
                  { size: 'S', bust: '34-35', waist: '26-27', hip: '36-37' },
                  { size: 'M', bust: '36-37', waist: '28-29', hip: '38-39' },
                  { size: 'L', bust: '38-40', waist: '30-32', hip: '40-42' },
                  { size: 'XL', bust: '41-43', waist: '33-35', hip: '43-45' }
                ].map((row) => (
                  <tr key={row.size} className="border-b border-primary/10">
                    <td className="py-4 font-ui font-semibold text-on-surface">{row.size}</td>
                    <td className="py-4">{row.bust}</td>
                    <td className="py-4">{row.waist}</td>
                    <td className="py-4">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <p className="mt-8 font-ui text-xs text-on-surface-variant italic leading-relaxed">
              *Measurements are approximate guidelines. Our silk slips are bias-cut, designed for a relaxed and elegant drape.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

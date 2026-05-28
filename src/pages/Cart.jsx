import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'LUNAIRE10' || code === 'SILK10') {
      setDiscount(0.1); // 10% discount
      setCouponApplied(true);
    } else if (code) {
      setCouponError('Invalid coupon code');
    }
  };

  const subtotal = getCartTotal();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="w-full bg-surface pt-40 pb-section-gap min-h-screen flex items-center justify-center">
        <div className="text-center px-margin-mobile animate-fade-in max-w-lg">
          <div className="mb-8 opacity-20 flex justify-center text-primary">
            <ShoppingBag size={80} strokeWidth={1} />
          </div>
          <h2 className="font-editorial text-3xl text-on-surface mb-4">
            Your cart is whispering… it's empty.
          </h2>
          <p className="text-on-surface-variant font-ui text-sm mb-12 max-w-md mx-auto leading-relaxed">
            Discover our latest creations and find something extraordinary for your midnight repertoire.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-surface font-ui text-xs uppercase tracking-widest font-semibold px-12 py-5 hover:bg-primary-fixed transition-all duration-400 active:scale-95 shadow-xl shadow-primary/10"
          >
            Explore Creations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface pt-32 pb-section-gap min-h-screen">
      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h1 className="font-editorial text-4xl md:text-6xl mb-12 text-center text-on-surface animate-fade-in">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start animate-fade-in">
          {/* Left Column: Cart Items List */}
          <section className="space-y-8">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex flex-col md:flex-row gap-6 pb-8 border-b border-primary/10 group transition-all duration-300"
              >
                {/* Item Image */}
                <div className="w-full md:w-[100px] h-[133px] overflow-hidden rounded-sm bg-surface-container flex-shrink-0 border border-primary/10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="font-editorial text-xl text-on-surface hover:text-primary transition-colors cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <p className="text-on-surface-variant font-ui text-xs mt-1.5 uppercase tracking-wider">
                        Size: {item.selectedSize} / Color: {item.selectedColor}
                      </p>
                    </div>
                    <span className="font-ui text-lg text-primary font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-end mt-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-primary/20 rounded-sm h-10 px-2 space-x-3 bg-surface-container-low">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                        className="text-primary hover:text-primary-fixed transition-colors p-1"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-on-surface font-ui text-xs font-semibold w-6 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                        className="text-primary hover:text-primary-fixed transition-colors p-1"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                      className="text-on-surface-variant font-ui text-[10px] uppercase tracking-widest font-semibold underline underline-offset-4 hover:text-error transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Right Column: Order Summary Aside */}
          <aside className="glass-card p-8 rounded-sm sticky top-28 border border-primary/10">
            <h2 className="font-editorial text-2xl text-on-surface mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8 border-b border-primary/10 pb-8 font-ui text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-on-surface">₹{subtotal.toLocaleString()}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-secondary">
                  <span>Promo Discount (10%)</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Shipping</span>
                <span className="text-primary font-semibold uppercase tracking-widest">Free</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="mb-8 font-ui">
              <div className="flex items-end gap-2">
                <div className="flex-grow">
                  <label className="block text-[10px] text-on-surface-variant mb-2 uppercase tracking-widest">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter code (LUNAIRE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary outline-none py-2 text-on-surface placeholder:text-outline/40 transition-all text-sm px-1 focus:ring-0 rounded-none"
                    disabled={couponApplied}
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied || !couponCode}
                  className="font-ui text-xs font-semibold uppercase tracking-widest text-primary border border-primary/40 px-5 py-2 hover:bg-primary/10 transition-colors disabled:opacity-50"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {couponError && (
                <p className="text-error font-ui text-[11px] mt-2 font-semibold tracking-wider">
                  {couponError}
                </p>
              )}
              {couponApplied && (
                <p className="text-primary font-ui text-[11px] mt-2 font-semibold tracking-wider">
                  ✓ Luxury discount applied successfully
                </p>
              )}
            </div>

            <div className="flex justify-between items-baseline mb-8">
              <span className="font-editorial text-xl text-on-surface">Total</span>
              <span className="text-3xl font-editorial text-primary">
                ₹{total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout', { state: { discount } })}
              className="w-full bg-primary text-surface font-ui text-xs uppercase tracking-widest font-semibold py-5 rounded-sm hover:bg-primary-fixed transition-all duration-400 active:scale-95 shadow-xl shadow-primary/10"
            >
              Proceed to Checkout
            </button>

            <div className="text-center mt-6">
              <Link
                to="/shop"
                className="font-ui text-[11px] text-on-surface-variant hover:text-primary transition-colors underline underline-offset-4 uppercase tracking-widest font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Cart;

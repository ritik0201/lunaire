import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check, Info, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getCartTotal, clearCart } = useCart();

  // Retrieve discount from location state if passed from Cart
  const discount = location.state?.discount || 0;

  // Active Payment Tab State
  const [activeTab, setActiveTab] = useState('upi');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form State
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    streetAddress: '',
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errors = {};
    if (!billingDetails.firstName) errors.firstName = 'Required';
    if (!billingDetails.lastName) errors.lastName = 'Required';
    if (!billingDetails.email) errors.email = 'Required';
    if (!billingDetails.phone) errors.phone = 'Required';
    if (!billingDetails.zipCode) errors.zipCode = 'Required';
    if (!billingDetails.streetAddress) errors.streetAddress = 'Required';

    if (activeTab === 'upi' && !billingDetails.upiId) {
      errors.upiId = 'UPI ID required';
    }
    if (activeTab === 'card') {
      if (!billingDetails.cardNumber) errors.cardNumber = 'Card number required';
      if (!billingDetails.expiry) errors.expiry = 'Required';
      if (!billingDetails.cvv) errors.cvv = 'Required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 200);
      return;
    }

    setFormErrors({});
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    clearCart();
    navigate('/');
  };

  const subtotal = getCartTotal();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <div className="text-center py-40 font-editorial text-2xl text-primary">
        Your cart is empty. Nothing to checkout.
      </div>
    );
  }

  return (
    <div className="w-full bg-surface pt-32 pb-section-gap min-h-screen">
      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h1 className="font-editorial text-4xl md:text-5xl mb-12 text-center md:text-left animate-fade-in text-on-surface">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-gutter items-start animate-fade-in">
          {/* Left Column: Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-12">
            
            {/* Step 1: Billing Details */}
            <section>
              <h2 className="font-editorial text-xl md:text-2xl mb-8 flex items-center gap-4 text-on-surface">
                <span className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center font-ui text-xs font-semibold text-primary select-none">
                  01
                </span>
                Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-8">
                <div className="flex flex-col gap-1.5">
                  <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Julianne"
                    value={billingDetails.firstName}
                    onChange={handleInputChange}
                    className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0"
                  />
                  {formErrors.firstName && <span className="text-error text-xs font-ui">{formErrors.firstName}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Moore"
                    value={billingDetails.lastName}
                    onChange={handleInputChange}
                    className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0"
                  />
                  {formErrors.lastName && <span className="text-error text-xs font-ui">{formErrors.lastName}</span>}
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="julianne.m@example.com"
                    value={billingDetails.email}
                    onChange={handleInputChange}
                    className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0 w-full"
                  />
                  {formErrors.email && <span className="text-error text-xs font-ui">{formErrors.email}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 99999 99999"
                    value={billingDetails.phone}
                    onChange={handleInputChange}
                    className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0"
                  />
                  {formErrors.phone && <span className="text-error text-xs font-ui">{formErrors.phone}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                    Zip / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="110001"
                    value={billingDetails.zipCode}
                    onChange={handleInputChange}
                    className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0"
                  />
                  {formErrors.zipCode && <span className="text-error text-xs font-ui">{formErrors.zipCode}</span>}
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="245 Midnight Avenue, Apartment 4B"
                    value={billingDetails.streetAddress}
                    onChange={handleInputChange}
                    className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0 w-full"
                  />
                  {formErrors.streetAddress && <span className="text-error text-xs font-ui">{formErrors.streetAddress}</span>}
                </div>
              </div>
            </section>

            {/* Step 2: Payment Method */}
            <section>
              <h2 className="font-editorial text-xl md:text-2xl mb-8 flex items-center gap-4 text-on-surface">
                <span className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center font-ui text-xs font-semibold text-primary select-none">
                  02
                </span>
                Payment Method
              </h2>
              
              <div className="glass-card p-6 md:p-8 rounded-sm">
                <div className="flex gap-8 border-b border-primary/10 mb-8 overflow-x-auto">
                  {[
                    { id: 'upi', label: 'UPI Transfer' },
                    { id: 'card', label: 'Credit / Debit Card' },
                    { id: 'cod', label: 'Cash On Delivery' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setFormErrors({});
                      }}
                      className={`font-ui text-xs uppercase tracking-widest pb-4 transition-all duration-300 font-semibold whitespace-nowrap cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* UPI Content */}
                {activeTab === 'upi' && (
                  <div className="space-y-6 animate-fade-in">
                    <p className="text-on-surface-variant font-ui text-xs italic leading-relaxed">
                      Enter your VPA / UPI ID to receive a secure payment request on your mobile device.
                    </p>
                    <div className="flex flex-col gap-1.5 max-w-sm">
                      <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        placeholder="username@bank"
                        value={billingDetails.upiId}
                        onChange={handleInputChange}
                        className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0"
                      />
                      {formErrors.upiId && <span className="text-error text-xs font-ui">{formErrors.upiId}</span>}
                    </div>
                  </div>
                )}

                {/* Card Content */}
                {activeTab === 'card' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={billingDetails.cardNumber}
                        onChange={handleInputChange}
                        className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0 w-full"
                      />
                      {formErrors.cardNumber && <span className="text-error text-xs font-ui">{formErrors.cardNumber}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-gutter">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM / YY"
                          value={billingDetails.expiry}
                          onChange={handleInputChange}
                          className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0"
                        />
                        {formErrors.expiry && <span className="text-error text-xs font-ui">{formErrors.expiry}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-ui text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                          CVV
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          placeholder="***"
                          maxLength="3"
                          value={billingDetails.cvv}
                          onChange={handleInputChange}
                          className="input-elegant text-on-surface text-sm py-3 px-1 border-b focus:border-primary border-primary/20 bg-transparent rounded-none outline-none focus:ring-0"
                        />
                        {formErrors.cvv && <span className="text-error text-xs font-ui">{formErrors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* COD Content */}
                {activeTab === 'cod' && (
                  <div className="bg-primary/5 border border-primary/20 p-6 rounded-sm flex gap-4 items-start animate-fade-in">
                    <Info size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-on-surface-variant font-ui text-xs leading-relaxed">
                      Cash on Delivery is enabled for this purchase. No processing fee applies. Please ensure someone is available at the shipping address to fulfill payment upon package arrival.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <button
              type="submit"
              className="w-full py-6 bg-primary text-surface font-ui text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary-fixed transition-all duration-400 active:scale-[0.98] shadow-2xl shadow-primary/10 rounded-sm"
            >
              Place Order
            </button>
          </form>

          {/* Right Column: Order Preview Aside */}
          <aside className="glass-card p-8 rounded-sm sticky top-28 border border-primary/10">
            <h2 className="font-editorial text-2xl text-on-surface mb-8">Your Order</h2>
            
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 items-center">
                  <div className="w-16 h-20 bg-surface-container overflow-hidden rounded-sm border border-primary/10 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-ui text-xs text-on-surface font-semibold truncate">{item.name}</p>
                    <p className="font-ui text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider">
                      QTY: {item.quantity} / {item.selectedSize}
                    </p>
                  </div>
                  <span className="font-ui text-xs text-primary font-semibold flex-shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-primary/10 font-ui text-xs uppercase tracking-widest font-semibold">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-secondary">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span className="text-primary font-semibold">FREE</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-primary/10 text-on-surface">
                <span className="font-editorial text-lg text-on-surface normal-case font-normal">Total</span>
                <span className="font-editorial text-lg text-primary normal-case font-semibold">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-primary/5 pt-6 flex items-center justify-center gap-2 text-on-surface-variant">
              <ShieldCheck size={16} className="text-primary" />
              <span className="font-ui text-[10px] uppercase tracking-widest font-semibold">
                Secure SSL Encrypted Checkout
              </span>
            </div>
          </aside>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in">
          <div className="absolute inset-0 bg-surface/90 backdrop-blur-2xl"></div>
          <div className="relative glass-card p-12 max-w-lg w-[90%] mx-4 text-center border border-primary/20 shadow-2xl rounded-sm">
            <div className="w-20 h-20 rounded-full border-2 border-primary mx-auto mb-8 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
              <Check size={36} strokeWidth={1.5} />
            </div>
            <h2 className="font-editorial text-4xl text-on-surface mb-4">Order Placed!</h2>
            <p className="text-on-surface-variant font-ui text-sm mb-10 leading-relaxed max-w-sm mx-auto">
              Your journey to midnight serenity has begun. A confirmation with shipping and tracking details has been sent to your inbox.
            </p>
            <button
              onClick={handleSuccessClose}
              className="w-full sm:w-auto px-12 py-4 bg-primary text-surface font-ui text-xs uppercase tracking-widest font-semibold hover:bg-primary-fixed transition-all"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

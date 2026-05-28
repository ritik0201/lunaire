import React, { createContext, useContext, useState, useEffect } from 'react';

// Static image paths from public folder
const heroBedroomImg = '/assets/images/hero_bedroom.png';
const silkDreamsImg = '/assets/images/silk_dreams.png';
const laceNightsImg = '/assets/images/lace_nights.png';
const cottonComfortImg = '/assets/images/cotton_comfort.png';
const midnightSlipMainImg = '/assets/images/midnight_slip_main.png';
const pearlEarringsImg = '/assets/images/pearl_earrings.png';
const silkPillowcaseImg = '/assets/images/silk_pillowcase.png';
const scentedCandleImg = '/assets/images/scented_candle.png';

const CartContext = createContext();

export const PRODUCTS = [
  {
    id: 'midnight-silk-slip',
    name: 'Midnight Silk Slip',
    price: 4499,
    originalPrice: 5999,
    description: 'Draped in pure mulberry silk, this bias-cut slip dress moves with you through the night. Designed for the woman who values intimacy and elegance in her quietest moments. Features a delicate V-neckline and adjustable cross-back spaghetti straps.',
    fabric: '100% Mulberry Silk (19-momme)',
    care: 'Hand wash cold with silk-safe detergent. Dry flat in shade. Do not tumble dry. Iron on low heat if needed.',
    fit: 'True to size. Model is 5\'9" wearing size Small.',
    images: [midnightSlipMainImg, silkDreamsImg, heroBedroomImg],
    colors: ['Midnight', 'Burgundy', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Silk Dreams',
    rating: 4.9,
    reviewsCount: 24,
    bestSeller: true,
    tag: 'BEST SELLER'
  },
  {
    id: 'velvet-lace-chemise',
    name: 'Velvet Lace Chemise',
    price: 3999,
    originalPrice: 4999,
    description: 'An elegant velvet lace chemise in deep burgundy, captured with soft focus edges and premium lace detailing. Extremely romantic, offering absolute comfort and warmth with an exquisite sensory touch.',
    fabric: 'Premium Plush Velvet & Intricate Chantilly Lace',
    care: 'Dry clean recommended, or ultra-gentle hand wash cold. Dry flat.',
    fit: 'Elegantly contoured fit. Model is 5\'8" wearing size Medium.',
    images: [laceNightsImg, silkDreamsImg, heroBedroomImg],
    colors: ['Burgundy', 'Midnight'],
    sizes: ['S', 'M', 'L'],
    category: 'Lace Nights',
    rating: 4.8,
    reviewsCount: 18,
    bestSeller: true
  },
  {
    id: 'cloud-cotton-set',
    name: 'Cloud Cotton Set',
    price: 5200,
    originalPrice: 6500,
    description: 'A soft cloud cotton pyjama set consisting of a button-down shirt and relaxed trousers. Breathable, airy, and perfect for early dawn lounging and serene morning rituals.',
    fabric: '100% Organic Pima Cotton',
    care: 'Machine wash warm, tumble dry low. Warm iron if desired.',
    fit: 'Relaxed, oversized fit for ultimate lounge luxury.',
    images: [cottonComfortImg, heroBedroomImg],
    colors: ['Ivory', 'Dusty Rose', 'Slate'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Cotton Comfort',
    rating: 4.9,
    reviewsCount: 32,
    bestSeller: false
  },
  {
    id: 'onyx-satin-robe',
    name: 'Onyx Satin Robe',
    price: 6800,
    originalPrice: 8500,
    description: 'A majestic satin robe in deep onyx black. Styled with a classic shawl collar, wide kimono sleeves, and a removable waist tie. Designed to float beautifully behind you as you walk.',
    fabric: 'High-gloss Ultra-soft Satin Silk Blend',
    care: 'Gentle machine wash cold, hang dry in shade. Cool iron.',
    fit: 'One size fits most, adjustable waist wrap.',
    images: [heroBedroomImg, midnightSlipMainImg],
    colors: ['Onyx', 'Midnight', 'Burgundy'],
    sizes: ['OS'],
    category: 'Silk Dreams',
    rating: 5.0,
    reviewsCount: 15,
    bestSeller: true
  },
  {
    id: 'lunar-pearl-drops',
    name: 'Lunar Pearl Drops',
    price: 3499,
    description: 'Delicate gold-plated drop earrings featuring a single dangling freshwater pearl. Glimmers warmly under low light, adding a touch of nocturnal elegance to your evening loungewear.',
    fabric: '18k Gold Plated Brass & Organic Freshwater Pearls',
    care: 'Keep away from moisture, perfumes, and store in a soft velvet pouch.',
    fit: 'One Size (Drop length: 1.5 inches)',
    images: [pearlEarringsImg],
    colors: ['Gold'],
    sizes: ['One Size'],
    category: 'Accessories',
    rating: 4.7,
    reviewsCount: 9,
    bestSeller: false
  },
  {
    id: 'silk-pillowcase-set',
    name: 'Silk Pillowcase Set',
    price: 1899,
    originalPrice: 2499,
    description: 'Two premium 100% mulberry silk pillowcases. Naturally hypoallergenic and moisture-retaining, designed to eliminate hair friction and skin irritation during deep sleep.',
    fabric: '100% Pure Mulberry Silk (19-momme both sides)',
    care: 'Hand wash cold or machine wash delicate inside a mesh bag. Air dry.',
    fit: 'Standard Queen Size (20" x 30")',
    images: [silkPillowcaseImg],
    colors: ['Midnight', 'Ivory', 'Dusty Rose'],
    sizes: ['Standard'],
    category: 'Home Serene',
    rating: 4.9,
    reviewsCount: 42,
    bestSeller: false
  },
  {
    id: 'nocturne-candle',
    name: 'Nocturne Scented Candle',
    price: 1200,
    description: 'An luxury burning candle in a matte black ceramic jar. Notes of dark amber, vanilla orchids, and burning cedarwood. Perfect for setting a calm, luxurious midnight atmosphere.',
    fabric: 'Natural Soy Wax, Lead-free Cotton Wick, Custom Fragrance Oils',
    care: 'Trim wick to 1/4" before lighting. Burn for a maximum of 4 hours at a time.',
    fit: '8 oz (Burn time: ~45 hours)',
    images: [scentedCandleImg],
    colors: ['Black'],
    sizes: ['8 oz'],
    category: 'Home Serene',
    rating: 4.8,
    reviewsCount: 29,
    bestSeller: false
  },
  {
    id: 'satin-eye-mask',
    name: 'Satin Eye Mask',
    price: 999,
    description: 'A cushioned satin sleep eye mask with an elasticated band, designed to block out all ambient light while being gentle on the delicate skin surrounding your eyes.',
    fabric: '100% Ultra-soft Satin Silk',
    care: 'Hand wash cool with mild soap, flat dry.',
    fit: 'Flexible elastic strap, contoured design.',
    images: [silkDreamsImg],
    colors: ['Midnight', 'Ivory', 'Burgundy'],
    sizes: ['One Size'],
    category: 'Accessories',
    rating: 4.6,
    reviewsCount: 14,
    bestSeller: false
  }
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('lunaire_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('lunaire_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, size, color) => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || product.colors[0];

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            selectedSize,
            selectedColor,
            image: product.images[0]
          }
        ];
      }
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateQuantity = (productId, size, color, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (
            item.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          ) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

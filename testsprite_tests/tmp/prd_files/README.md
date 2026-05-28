# Lunaire — Premium Sleepwear & Loungewear e-Commerce

Lunaire is a premium, high-end sleepwear and loungewear digital boutique designed for the modern woman who cherishes quiet moments, evening serenity, and domestic luxury. Engineered with rich aesthetics, sleek animations, and a seamless shopping flow, the application reflects the sophisticated elegance of the products it showcases.

---

## ✦ Key Features

- **Dynamic Curated Home Page**: Incorporates a smooth parallax hero banner, intersection observers for scroll reveal transitions, product curations ("The Signature Edit"), bestseller displays, and customer testimonials ("Love Notes").
- **Smart Shop & Discovery**: Advanced product filtering by curated collections (e.g., *Silk Dreams*, *Lace Nights*, *Cotton Comfort*, *Accessories*) and sorting parameters (Price, Customer Rating) for a personalized shopping experience.
- **Rich Product Showcases**: Interactive product details page featuring dynamic color and size selectors, interactive multi-image galleries, detailed fabric/care/fit accordion-style specs, and related product recommendations.
- **Robust Cart Management**: A modern sliding cart drawer with real-time quantity adjustments, size/color variant tracking, persistent `localStorage` synchronization, and instant subtotal recalculation.
- **Seamless Checkout**: Complete multi-step billing and shipping interface, dynamic tax/handling cost estimation, order summary sidebars, and clean feedback for mocked transactions.
- **Brand Storytelling Pages**: Beautiful, narrative-driven **About** and **Collections** pages detailing the craftsmanship, design philosophy, and small-batch production rhythm championed by founder Meera Nair.
- **Nocturnal Interaction Channels**: Custom floating WhatsApp integration, active email subscription gateways, and responsive contact forms with simulated API actions.

---

## ✦ Aesthetic & Design System

Lunaire uses a premium visual style designed to wow visitors at first glance:
- **Color Palette**: Sleek dark mode background (`#0A0A0A`), sophisticated high-contrast text (`#e5e2e1`), and HSL-tailored gold branding highlights (`#e6c364`, `#C9A84C`).
- **Typography**: Editorial titles styled with **EB Garamond** (serif) to evoke classic couture, paired with **DM Sans** (sans-serif) for extremely legible and polished UI buttons and menus.
- **Effects**: Premium glassmorphism cards and panels (`backdrop-filter: blur(20px)`), subtle gold micro-borders, and high-fidelity micro-interactions on hover and active states.
- **Responsiveness**: Completely customized for all viewport sizes, featuring an elegant sliding mobile navigation menu.

---

## ✦ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) for high-performance builds and hot module replacement (HMR).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for a modern utility-first framework and theme customization.
- **Routing**: [React Router v7](https://reactrouter.com/) for fluid client-side navigation.
- **Icons**: [Lucide React](https://lucide.dev/) for ultra-crisp, lightweight iconography.
- **State Management**: Built-in React **Context API** (`CartContext`) for highly performant global shopping cart state tracking.

---

## ✦ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd lunaire
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build the application for production:
   ```bash
   npm run build
   ```

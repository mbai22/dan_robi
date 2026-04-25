import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import Checkout from './Checkout';

export default function CartDrawer() {
  const [showCheckout, setShowCheckout] = useState(false);
  
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    isOpen, 
    closeCart, 
    removeFromCart,
    clearCart 
  } = useCart();

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={closeCart} />
      
      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={24} />
            <h3>Votre Panier ({cartCount})</h3>
          </div>
          <button className="cart-close-btn" onClick={closeCart}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={64} />
              <p>Votre panier est vide</p>
              <button className="btn-primary" onClick={closeCart}>
                Continuer les achats
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-icon" style={{ backgroundColor: `${item.color}20` }}>
                      <item.Icon size={24} color={item.color} />
                    </div>
                    <div className="cart-item-info">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p className="cart-item-genre">{item.genre}</p>
                      <p className="cart-item-price">{item.price}</p>
                    </div>
                    <button 
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="cart-total">
                <span>Total</span>
                <span>{cartTotal.toLocaleString()} FCFA</span>
              </div>

              {/* Actions */}
              <div className="cart-actions">
                <button className="btn-primary cart-checkout-btn" onClick={handleCheckout}>
                  <CreditCard size={20} />
                  Procéder au paiement
                </button>
                <button className="btn-secondary" onClick={clearCart}>
                  Vider le panier
                </button>
                <button className="cart-continue" onClick={closeCart}>
                  Continuer les achats
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Checkout isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
    </>
  );
}

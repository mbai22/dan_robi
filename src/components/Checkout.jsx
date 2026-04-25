import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, CreditCard, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

// Remplace par ta vraie clé publique Stripe (pk_test_...)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_demo');

function CheckoutForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, cartTotal, clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Simulation du paiement (en prod, appeler ton backend)
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      });

      if (paymentMethodError) {
        setPaymentError(paymentMethodError.message);
        setIsProcessing(false);
        return;
      }

      // Simulation d'un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 2000));

      // En production, tu enverrais paymentMethod.id à ton serveur
      // qui créerait un PaymentIntent avec Stripe
      
      setPaymentSuccess(true);
      clearCart();
      
      // Fermer après 3 secondes
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err) {
      setPaymentError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="checkout-success">
        <CheckCircle size={64} color="#22c55e" />
        <h3>Paiement réussi !</h3>
        <p>Merci pour votre achat. Vos beats vous seront envoyés par email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      {/* Résumé de la commande */}
      <div className="checkout-summary">
        <h4>Résumé de la commande</h4>
        <div className="checkout-items">
          {cartItems.map(item => (
            <div key={item.id} className="checkout-item">
              <span>{item.title}</span>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
        <div className="checkout-total">
          <span>Total</span>
          <span>{cartTotal.toLocaleString()} FCFA</span>
        </div>
      </div>

      {/* Email */}
      <div className="checkout-field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
          className="checkout-input"
        />
      </div>

      {/* Carte */}
      <div className="checkout-field">
        <label>
          <CreditCard size={16} />
          Informations de carte
        </label>
        <div className="checkout-card-element">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: '#6b7280',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Sécurisé */}
      <div className="checkout-secure">
        <Lock size={14} />
        <span>Paiement sécurisé par Stripe</span>
      </div>

      {/* Erreur */}
      {paymentError && (
        <div className="checkout-error">{paymentError}</div>
      )}

      {/* Bouton payer */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-primary checkout-pay-btn"
      >
        {isProcessing ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Traitement en cours...
          </>
        ) : (
          <>
            <Lock size={18} />
            Payer {cartTotal.toLocaleString()} FCFA
          </>
        )}
      </button>

      <p className="checkout-note">
        Les beats vous seront envoyés par email après confirmation du paiement.
      </p>
    </form>
  );
}

export default function Checkout({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="checkout-modal">
      <div className="checkout-backdrop" onClick={onClose} />
      <div className="checkout-content">
        <div className="checkout-header">
          <h3>Paiement</h3>
          <button onClick={onClose} className="checkout-close">
            <X size={24} />
          </button>
        </div>
        
        <div className="checkout-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm onClose={onClose} />
          </Elements>
        </div>
      </div>
    </div>
  );
}

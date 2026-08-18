import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function CheckoutModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div style={{
        background: '#f3eadb', color: '#0b1f3a', padding: '40px 32px',
        maxWidth: 400, width: '90%', border: '1px solid #0b1f3a',
      }}>
        <h3 style={{ fontSize: 24, marginBottom: 16 }}>결제 안내</h3>
        <p style={{ lineHeight: 1.7, marginBottom: 24 }}>
          결제 기능은 데모 버전입니다.<br />
          실제 결제는 지원되지 않으며, 현재 선택된 상품 정보는 데모용으로만 표시됩니다.
        </p>
        <button
          className="btn-primary"
          style={{ width: '100%' }}
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useShop();
  const [showModal, setShowModal] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('£', ''));
    return sum + price * item.qty;
  }, 0);
  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <div className="page-cart shop-page">
      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}

      <div className="shop-header">
        <h2>CART</h2>
      </div>
      <section className="cart-layout">
        <div className="cart-list">
          {cart.length === 0 ? (
            <div style={{ padding: '40px 24px', opacity: 0.6 }}>
              <p>장바구니가 비어 있습니다.</p>
              <Link to="/edition" className="btn-primary" style={{ display: 'inline-flex', marginTop: 16 }}>
                EDITION 보러 가기
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartKey} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>
                    {item.format ? `${item.format} / ${item.color}` : item.type}
                  </p>
                  <div className="item-actions">
                    <select
                      value={item.qty}
                      onChange={(e) => updateQty(item.cartKey, parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <button className="btn-text" onClick={() => removeFromCart(item.cartKey)}>삭제</button>
                  </div>
                </div>
                <div className="item-price">
                  £{(parseFloat(item.price.replace('£', '')) * item.qty).toFixed(2)}
                  {item.qty > 1 && (
                    <span style={{ fontSize: 12, display: 'block', opacity: 0.6 }}>
                      {item.price} × {item.qty}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>£{shipping.toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-line total">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <button className="btn-primary full-width" onClick={() => setShowModal(true)}>
              결제 진행
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

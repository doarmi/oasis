import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function CheckoutModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="checkout-modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="checkout-modal-close"
          aria-label="결제 안내 닫기"
          onClick={onClose}
        >
          ×
        </button>

        <span className="checkout-modal-label">OASIS STORE</span>
        <h3 id="checkout-modal-title">결제 안내</h3>

        <p>
          결제 기능은 데모 버전입니다.
          <br />
          실제 결제는 지원되지 않으며, 현재 선택된 상품 정보는 데모용으로만 표시됩니다.
        </p>

        <button
          type="button"
          className="btn-primary full-width"
          onClick={onClose}
        >
          확인
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
      {showModal && (
        <CheckoutModal onClose={() => setShowModal(false)} />
      )}

      <div className="shop-header">
        <h2>CART</h2>
      </div>

      <section className="cart-layout">
        <div className="cart-list">
          {cart.length === 0 ? (
            <div className="shop-empty-state">
              <p>장바구니가 비어 있습니다.</p>

              <Link to="/edition" className="btn-primary">
                EDITION 보러 가기
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartKey} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="item-details">
                  <h4>{item.title}</h4>

                  <p>
                    {item.format
                      ? `${item.format} / ${item.color}`
                      : item.type}
                  </p>

                  <div className="item-actions">
                    <label className="sr-only" htmlFor={`qty-${item.cartKey}`}>
                      {item.title} 수량
                    </label>

                    <select
                      id={`qty-${item.cartKey}`}
                      value={item.qty}
                      onChange={(event) =>
                        updateQty(
                          item.cartKey,
                          parseInt(event.target.value, 10),
                        )
                      }
                    >
                      {[1, 2, 3, 4, 5].map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="btn-text"
                      onClick={() => removeFromCart(item.cartKey)}
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <div className="item-price">
                  £{(
                    parseFloat(item.price.replace('£', '')) * item.qty
                  ).toFixed(2)}

                  {item.qty > 1 && (
                    <span className="item-price-detail">
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

            <button
              type="button"
              className="btn-primary full-width"
              onClick={() => setShowModal(true)}
            >
              결제 진행
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

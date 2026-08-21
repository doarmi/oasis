import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  loadTossPayments,
  ANONYMOUS,
} from '@tosspayments/tosspayments-sdk';

const CLIENT_KEY = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    updateQty,
  } = useShop();

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('£', ''));
    return sum + price * item.qty;
  }, 0);

  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    return () => {
      setIsPaymentLoading(false);
    };
  }, []);

  const handleClearCart = () => {
    const confirmed = window.confirm(
      '장바구니에 담긴 상품을 모두 삭제하시겠습니까?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      return;
    }

    try {
      setIsPaymentLoading(true);

      const tossPayments = await loadTossPayments(CLIENT_KEY);

      const widgets = tossPayments.widgets({
        customerKey: ANONYMOUS,
      });

      /*
        OASIS 사이트에서는 파운드(£) 가격을 사용하고 있지만
        토스페이먼츠 일반결제는 KRW를 사용합니다.

        포트폴리오 테스트용으로:
        £45.00 → 45,000원
        처럼 변환해서 결제 금액을 설정합니다.
      */
      const paymentAmount = Math.round(total * 1000);

      await widgets.setAmount({
        currency: 'KRW',
        value: paymentAmount,
      });

      const paymentWindow = await widgets.renderPaymentWindow();

      paymentWindow.on('paymentRequest', async () => {
        try {
          const orderId = `OASIS_${Date.now()}`;

          const orderName =
            cart.length === 1
              ? cart[0].title
              : `${cart[0].title} 외 ${cart.length - 1}건`;

          await widgets.requestPayment({
            orderId,
            orderName,
            successUrl: `${window.location.origin}/payment/success`,
            failUrl: `${window.location.origin}/payment/fail`,
          });
        } catch (error) {
          console.error('토스 결제 요청 오류:', error);

          alert('결제 요청 중 오류가 발생했습니다.');
        }
      });
    } catch (error) {
      console.error('토스페이먼츠 초기화 오류:', error);

      alert('결제창을 불러오지 못했습니다.');
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="page-cart shop-page">
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
            <>
              <div className="cart-list-header">
                <span>
                  총 {cart.reduce((sum, item) => sum + item.qty, 0)}개 상품
                </span>

                <button
                  type="button"
                  className="btn-text cart-clear-button"
                  onClick={handleClearCart}
                >
                  전체 삭제
                </button>
              </div>

              {cart.map((item) => (
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
                      <label
                        className="sr-only"
                        htmlFor={`qty-${item.cartKey}`}
                      >
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
                    £
                    {(
                      parseFloat(item.price.replace('£', '')) *
                      item.qty
                    ).toFixed(2)}

                    {item.qty > 1 && (
                      <span className="item-price-detail">
                        {item.price} × {item.qty}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </>
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
              onClick={handlePayment}
              disabled={isPaymentLoading}
            >
              {isPaymentLoading ? '결제창 준비 중...' : '결제 진행'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
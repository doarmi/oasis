import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Saved() {
  const {
    saved,
    removeFromSaved,
    moveToCart,
    selectProduct,
  } = useShop();

  return (
    <div className="page-saved shop-page">
      <div className="shop-header">
        <h2>SAVED</h2>
      </div>

      <section className="saved-list">
        {saved.length === 0 ? (
          <div className="shop-empty-state">
            <p>저장된 상품이 없습니다.</p>

            <Link to="/edition" className="btn-primary">
              EDITION 보러 가기
            </Link>
          </div>
        ) : (
          saved.map((item) => (
            <div key={item.id} className="saved-item">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="item-details">
                <h4>{item.title}</h4>
                <p>
                  {item.type} / {item.price}
                </p>

                <div className="action-buttons-sm">
                  <Link
                    to="/customize"
                    className="btn-outline"
                    onClick={() => selectProduct(item)}
                  >
                    상세 보기
                  </Link>

                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => moveToCart(item)}
                  >
                    장바구니 이동
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn-close"
                aria-label={`${item.title} 저장 해제`}
                onClick={() => removeFromSaved(item.id)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

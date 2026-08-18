import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

import definitelyMaybe from '../assets/definitely-maybe.jpg';

const FORMAT_OPTIONS = ['Vinyl 2LP', 'CD Deluxe', 'Cassette'];
const COLOR_OPTIONS = ['Standard Black', 'Limited Marble'];

// 옵션에 따른 가격 보정
const FORMAT_PRICE = { 'Vinyl 2LP': 0, 'CD Deluxe': -10, 'Cassette': -15 };

export default function Customize() {
  const { selectedProduct, addToCart, addToSaved } = useShop();
  const navigate = useNavigate();

  const product = selectedProduct || {
    id: 1,
    title: 'Definitely Maybe (30th Anniversary)',
    type: 'Vinyl / 2LP',
    price: '£35.00',
    basePrice: 35,
    image: definitelyMaybe,
  };
  const [format, setFormat] = useState(FORMAT_OPTIONS[0]);
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [qty, setQty] = useState(1);

  const basePrice = product.basePrice || parseFloat(product.price.replace('£', ''));
  const adjustedPrice = basePrice + (FORMAT_PRICE[format] || 0);
  const totalPrice = adjustedPrice * qty;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      format,
      color,
      qty,
      price: `£${adjustedPrice.toFixed(2)}`,
    });
    navigate('/cart');
  };

  const handleSave = () => {
    addToSaved(product);
    navigate('/saved');
  };

  return (
    <div className="page-customize shop-page">
      <div className="shop-header">
        <h2>CUSTOMIZE</h2>
      </div>
      <section className="customize-layout">
        <div className="customize-visual">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="customize-options">
          <h3>{product.title}</h3>
          <p className="price">£{adjustedPrice.toFixed(2)}</p>

          <div className="option-group">
            <label>Format</label>
            <div className="option-buttons">
              {FORMAT_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={format === opt ? 'active' : ''}
                  onClick={() => setFormat(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label>Edition Color</label>
            <div className="option-buttons">
              {COLOR_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={color === opt ? 'active' : ''}
                  onClick={() => setColor(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label>Quantity</label>
            <select
              className="qty-select"
              value={qty}
              onChange={e => setQty(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="customize-summary">
            <div className="summary-row">
              <span>
                {format} / {color} × {qty}
              </span>
            </div>
            <div className="summary-row">
              <span>Total</span>
              <strong>£{totalPrice.toFixed(2)}</strong>
            </div>
            <div className="action-buttons">
              <button className="btn-primary flex-1" onClick={handleAddToCart}>장바구니 추가</button>
              <button className="btn-secondary" onClick={handleSave}>♥</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

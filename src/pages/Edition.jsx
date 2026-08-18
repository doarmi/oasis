import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import definitelyMaybe from '../assets/definitely-maybe.jpg';
import morningGlory from '../assets/morning-glory.jpg';
import beHereNow from '../assets/be-here-now.jpg';
import theMasterplan from '../assets/the-masterplan.jpg';
const products = [
  {
    id: 1,
    title: "Definitely Maybe (30th Anniversary)",
    type: "Vinyl / 2LP",
    price: "£35.00",
    basePrice: 35,
    image: definitelyMaybe
  },
  {
    id: 2,
    title: "(What's the Story) Morning Glory?",
    type: "Vinyl / Limited",
    price: "£40.00",
    basePrice: 40,
    image: morningGlory
  },
  {
    id: 3,
    title: "Be Here Now",
    type: "CD / Remastered",
    price: "£15.00",
    basePrice: 15,
    image: beHereNow
  },
  {
    id: 4,
    title: "The Masterplan",
    type: "Vinyl / Silver",
    price: "£32.00",
    basePrice: 32,
    image: theMasterplan
  },
];
export default function Edition() {
  const { addToCart, addToSaved, saved, selectProduct } = useShop();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  const handleSave = (product) => {
    addToSaved(product);
    navigate('/saved');
  };

  const handleSelect = (product) => {
    selectProduct(product);
    navigate('/customize');
  };

  return (
    <div className="page-edition shop-page">
      <div className="shop-header">
        <h2>EDITION</h2>
        <div className="shop-actions">
          <Link to="/saved" className="btn-icon">♥</Link>
          <Link to="/cart" className="btn-icon">🛒</Link>
        </div>
      </div>
      <section className="edition-list">
        {products.map(p => {
          const isSaved = saved.find(item => item.id === p.id);
          return (
            <div key={p.id} className="product-card">
              <div className="product-image">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="product-info">
                <h3>{p.title}</h3>
                <p className="product-type">{p.type}</p>
                <p className="product-price">{p.price}</p>
                <div className="product-buttons">
                  <button className="btn-primary" onClick={() => handleSelect(p)}>선택</button>
                  <button className="btn-secondary" onClick={() => handleAddToCart(p)}>장바구니</button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleSave(p)}
                    style={isSaved ? { background: '#0b1f3a', color: '#f3eadb' } : {}}
                  >
                    {isSaved ? '저장됨' : '저장'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

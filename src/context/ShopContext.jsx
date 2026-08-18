import { createContext, useContext, useState } from 'react';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // EDITION → CUSTOMIZE 연결용

  // EDITION의 '선택' 버튼 클릭 시 상품 정보를 저장하고 /customize로 이동
  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  // CUSTOMIZE의 '장바구니 추가' 시 cartKey = id + format + color 로 중복 판단
  const addToCart = (product) => {
    setCart(prev => {
      const cartKey = `${product.id}__${product.format || ''}__${product.color || ''}`;
      const exists = prev.find(item => item.cartKey === cartKey);
      if (exists) {
        return prev.map(item =>
          item.cartKey === cartKey ? { ...item, qty: item.qty + (product.qty || 1) } : item
        );
      }
      return [...prev, { ...product, cartKey, qty: product.qty || 1 }];
    });
  };

  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(item => item.cartKey !== cartKey));
  };

  const updateQty = (cartKey, qty) => {
    if (qty < 1) return removeFromCart(cartKey);
    setCart(prev => prev.map(item => item.cartKey === cartKey ? { ...item, qty } : item));
  };

  const addToSaved = (product) => {
    setSaved(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromSaved = (id) => {
    setSaved(prev => prev.filter(item => item.id !== id));
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromSaved(product.id);
  };

  return (
    <ShopContext.Provider value={{
      cart, saved, selectedProduct,
      selectProduct, addToCart, removeFromCart, updateQty,
      addToSaved, removeFromSaved, moveToCart,
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}

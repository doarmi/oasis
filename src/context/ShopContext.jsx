import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shopReady, setShopReady] = useState(false);
  const [shopError, setShopError] = useState('');

  const userIdRef = useRef(null);

  /* 로그인 상태가 정해지면 사용자별 CART/SAVED를 한 번 불러옵니다. */
  useEffect(() => {
    let isActive = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setShopReady(false);
      setShopError('');
      userIdRef.current = user?.uid ?? null;

      if (!user) {
        if (isActive) {
          setCart([]);
          setSaved([]);
          setShopReady(true);
        }
        return;
      }

      try {
        const shopRef = doc(db, 'users', user.uid, 'shop', 'state');
        const snapshot = await getDoc(shopRef);

        if (!isActive || userIdRef.current !== user.uid) return;

        if (snapshot.exists()) {
          const data = snapshot.data();
          setCart(Array.isArray(data.cart) ? data.cart : []);
          setSaved(Array.isArray(data.saved) ? data.saved : []);
        } else {
          setCart([]);
          setSaved([]);
        }
      } catch (error) {
        console.error('쇼핑 데이터 불러오기 실패:', error);

        if (isActive) {
          setCart([]);
          setSaved([]);
          setShopError('저장된 쇼핑 정보를 불러오지 못했습니다.');
        }
      } finally {
        if (isActive && userIdRef.current === user.uid) {
          setShopReady(true);
        }
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  /* 불러오기가 끝난 뒤 변경된 CART/SAVED를 사용자 문서에 저장합니다. */
  useEffect(() => {
    const userId = userIdRef.current;
    if (!shopReady || !userId) return;

    const saveShopData = async () => {
      try {
        const shopRef = doc(db, 'users', userId, 'shop', 'state');

        await setDoc(
          shopRef,
          {
            cart,
            saved,
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );

        setShopError('');
      } catch (error) {
        console.error('쇼핑 데이터 저장 실패:', error);
        setShopError('쇼핑 정보를 저장하지 못했습니다.');
      }
    };

    saveShopData();
  }, [cart, saved, shopReady]);

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  const addToCart = (product) => {
    setCart((previousCart) => {
      const cartKey = `${product.id}__${product.format || ''}__${
        product.color || ''
      }`;

      const existingItem = previousCart.find(
        (item) => item.cartKey === cartKey,
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.cartKey === cartKey
            ? { ...item, qty: item.qty + (product.qty || 1) }
            : item,
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          cartKey,
          qty: product.qty || 1,
        },
      ];
    });
  };

  const removeFromCart = (cartKey) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.cartKey !== cartKey),
    );
  };

  const updateQty = (cartKey, qty) => {
    if (qty < 1) {
      removeFromCart(cartKey);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.cartKey === cartKey ? { ...item, qty } : item,
      ),
    );
  };

  const addToSaved = (product) => {
    setSaved((previousSaved) => {
      const existingItem = previousSaved.find(
        (item) => item.id === product.id,
      );

      if (existingItem) return previousSaved;
      return [...previousSaved, product];
    });
  };

  const removeFromSaved = (id) => {
    setSaved((previousSaved) =>
      previousSaved.filter((item) => item.id !== id),
    );
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromSaved(product.id);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        saved,
        selectedProduct,
        shopReady,
        shopError,
        selectProduct,
        addToCart,
        removeFromCart,
        updateQty,
        addToSaved,
        removeFromSaved,
        moveToCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}

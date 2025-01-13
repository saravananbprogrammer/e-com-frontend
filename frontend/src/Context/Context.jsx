// Context/Context.js
import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setAll_product(data))
      .catch((error) => console.error("Error fetching products:", error));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getcart', {
          method: 'POST',
          headers: {
              Accept: 'application/form-data',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'content-Type': 'application/json',
          },
          body: "",
      })
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error('Error fetching cart items:', error));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error adding to cart:', error));
    }
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/deletefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error deleting from cart:', error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    const productMap = all_product.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = productMap[item];
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    deleteFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

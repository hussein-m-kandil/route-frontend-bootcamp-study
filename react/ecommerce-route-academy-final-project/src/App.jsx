import { Outlet, ScrollRestoration, useMatch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import * as AuthService from './services/auth';
import * as ShopService from './services/shop';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loader from './Loader';

export const HOME_PATH = '/';
export const CART_PATH = '/cart';
export const SIGNUP_PATH = '/signup';
export const SIGNIN_PATH = '/signin';
export const PROFILE_PATH = '/profile';
export const SIGNOUT_PATH = '/signout';
export const WISHLIST_PATH = '/wishlist';
export const CATEGORY_PATH = '/category';
export const CATEGORIES_PATH = '/categories';
export const USER_ORDERS_PATH = '/allorders';
export const PRODUCT_DETAILS_PATH = '/details';

const AUTH_DATA_KEY = 'seco_seco';
const ERROR_TOAST_CONFIG = { type: 'error', autoClose: 3000 };

let parsedAuthData = null;
try {
  const serializedAuthData = localStorage.getItem(AUTH_DATA_KEY);
  if (serializedAuthData) {
    parsedAuthData = JSON.parse(serializedAuthData);
  }
} catch (error) {
  console.log(error);
}

const getError = (data, error, fallBackErrorMessage = 'Operation Failed!') => {
  if (data?.message) return data;
  if (error?.message) return error;
  return new Error(fallBackErrorMessage);
};

function App() {
  const [authData, setAuthData] = useState(parsedAuthData);
  const [updating, setUpdating] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (authData) {
      setLoading(true);
      const { token } = authData;
      AuthService.getSigninValidation(token)
        .then(({ data, error }) => {
          const userId = data?.decoded?.id;
          if (userId) {
            return Promise.allSettled([
              ShopService.getCart(token),
              ShopService.getWishlist(token),
              ShopService.getUserOrders(userId),
            ]);
          }
          throw error || new Error('Authentication failed!');
        })
        .then(([cartResult, wishlistResult, ordersResult]) => {
          const WISHLIST_ERROR = 'Wishlist synchronization failed!';
          const ORDERS_ERROR = 'Orders synchronization failed!';
          const CART_ERROR = 'Cart synchronization failed!';
          const cartItems = [];
          const errors = [];
          if (cartResult.status === 'fulfilled') {
            const { data, error } = cartResult.value;
            if (!data || !Array.isArray(data.products)) {
              errors.push(getError(data, error, CART_ERROR));
            } else {
              if (data._id) setCartId(data._id);
              setCart(
                data.products.map((item) => {
                  if (item.price || item.price === 0) {
                    item.product.price = item.price;
                  }
                  cartItems.push(item);
                  return item;
                }),
              );
            }
          } else errors.push(new Error(CART_ERROR));
          if (wishlistResult.status === 'fulfilled') {
            const { data, error } = wishlistResult.value;
            if (!Array.isArray(data)) {
              errors.push(getError(data, error, WISHLIST_ERROR));
            } else {
              setWishlist(
                data.map((product) => {
                  const cartItem = cartItems.find(
                    ({ product: cartProd }) => cartProd.id === product.id,
                  );
                  return cartItem || { product, count: 0 };
                }),
              );
            }
          } else errors.push(new Error(WISHLIST_ERROR));
          if (ordersResult.status === 'fulfilled') {
            const { data, error } = ordersResult.value;
            if (!Array.isArray(data)) {
              errors.push(getError(data, error, ORDERS_ERROR));
            } else setOrders(data);
          } else errors.push(new Error(ORDERS_ERROR));
          if (errors.length) throw errors;
        })
        .catch((error) => {
          if (Array.isArray(error)) {
            error.forEach(({ message }) => toast(message, ERROR_TOAST_CONFIG));
          } else {
            setAuthData(null);
            toast(error.message, ERROR_TOAST_CONFIG);
          }
        })
        .finally(() => {
          parsedAuthData = null;
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [authData]);

  const signoutPathMatch = useMatch(SIGNOUT_PATH);

  useEffect(() => {
    if (authData && signoutPathMatch) {
      try {
        localStorage.removeItem(AUTH_DATA_KEY);
      } catch (error) {
        console.log(error);
      } finally {
        setAuthData(null);
        setWishlist([]);
        setCartId(null);
        setOrders([]);
        setCart([]);
      }
    }
  }, [signoutPathMatch, authData]);

  const authenticate = (newAuthData) => {
    setAuthData(newAuthData);
    try {
      localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(newAuthData));
    } catch {
      toast('Storing authentication data failed!', ERROR_TOAST_CONFIG);
    }
  };

  const updateCart = (product, count) => {
    const productInCart = cart.find((item) => item.product.id === product.id);
    const { token } = authData;
    setUpdating(true);
    (count < 1
      ? ShopService.deleteCartItem(token, product.id)
      : productInCart
        ? ShopService.putCartItemCount(token, product.id, count)
        : ShopService.postCartItem(token, product.id)
    )
      .then(({ data, error }) => {
        if (!data || !Array.isArray(data.products)) {
          throw getError(data, error, 'Failed to update your cart!');
        } else {
          const newItem = { product, count };
          let isNew = count > 0;
          const indexInWishlist = wishlist.findIndex(
            (item) => item.product.id === product.id,
          );
          const updatedCart =
            count === 0
              ? cart.filter((item) => item.product.id !== product.id)
              : cart.map((item) => {
                  if (item.product.id === product.id) {
                    isNew = false;
                    return { ...item, count };
                  }
                  return item;
                });
          if (isNew) updatedCart.push(newItem);
          setCart(updatedCart);
          setCartId(data._id);
          if (indexInWishlist > -1) {
            setWishlist([
              ...wishlist.slice(0, indexInWishlist),
              newItem,
              ...wishlist.slice(indexInWishlist + 1),
            ]);
          }
        }
      })
      .catch((error) => toast(error.message, ERROR_TOAST_CONFIG))
      .finally(() => setUpdating(false));
  };

  const updateWishlist = (item) => {
    setUpdating(true);
    const { token } = authData;
    const index = wishlist.findIndex(
      (wishItem) => wishItem.product.id === item.product.id,
    );
    (index < 0
      ? ShopService.postWishlistItem(token, item.product.id)
      : ShopService.deleteWishlistItem(token, item.product.id)
    )
      .then(({ data, error }) => {
        if (!Array.isArray(data)) {
          throw getError(data, error, 'Failed to update your wishlist!');
        }
        index < 0
          ? setWishlist([...wishlist, item])
          : setWishlist([
              ...wishlist.slice(0, index),
              ...wishlist.slice(index + 1),
            ]);
      })
      .catch((error) => toast(error.message, ERROR_TOAST_CONFIG))
      .finally(() => setUpdating(false));
  };

  const checkout = (shippingAddress) => {
    setUpdating(true);
    ShopService.postCheckout(authData.token, cartId, location.origin, {
      shippingAddress,
    })
      .then(({ data, error }) => {
        const paymentUrl = data?.session?.url;
        if (!paymentUrl) {
          throw getError(data, error, 'Checkout failed!');
        }
        location.href = paymentUrl;
      })
      .catch((error) => {
        setUpdating(false);
        toast(error.message, ERROR_TOAST_CONFIG);
      });
  };

  return (
    <>
      <ScrollRestoration />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <header>
          <Navbar
            authData={authData}
            ordersCount={orders.length}
            wishlistLength={wishlist.length}
            cartLength={cart.reduce((sum, { count }) => sum + count, 0)}
          />
          <ToastContainer />
        </header>
        <main className="container mx-auto mb-4">
          {loading ? (
            <Loader />
          ) : (
            <Outlet
              context={{
                cart,
                orders,
                checkout,
                wishlist,
                authData,
                updating,
                getError,
                updateCart,
                authenticate,
                updateWishlist,
                authenticated: Boolean(authData),
              }}
            />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;

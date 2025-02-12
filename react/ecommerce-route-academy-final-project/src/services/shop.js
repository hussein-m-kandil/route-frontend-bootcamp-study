import { sendRequest } from './helpers';

const BASE_URL = import.meta.env.VITE_SHOP_BASE;
const CART_URL = `${BASE_URL}${import.meta.env.VITE_SHOP_CART}`;
const WISHLIST_URL = `${BASE_URL}${import.meta.env.VITE_SHOP_WISHLIST}`;

export function get(endpoint, ...args) {
  return sendRequest('get', `${BASE_URL}${endpoint}`, ...args);
}

export function getAllProducts() {
  return get(import.meta.env.VITE_SHOP_ALL_PRODUCTS);
}

export function getAllCategories() {
  return get(import.meta.env.VITE_SHOP_ALL_CATEGORIES);
}

export function getCategory(categoryId) {
  return get(
    `${import.meta.env.VITE_SHOP_ALL_PRODUCTS}?category=${categoryId}`,
  );
}

export function getUserOrders(userId) {
  return get(`${import.meta.env.VITE_SHOP_USER_ORDERS}/${userId}`);
}

export function getCart(token) {
  return get(import.meta.env.VITE_SHOP_CART, { headers: { token } });
}

export function postCartItem(token, productId) {
  return sendRequest('post', CART_URL, { productId }, { headers: { token } });
}

export function putCartItemCount(token, productId, count) {
  const url = `${CART_URL}/${productId}`;
  return sendRequest('put', url, { count }, { headers: { token } });
}

export function deleteCartItem(token, productId) {
  const url = `${CART_URL}/${productId}`;
  return sendRequest('delete', url, { headers: { token } });
}

export function postCheckout(token, cartId, url, body) {
  const CHECKOUT_URL = `${BASE_URL}${import.meta.env.VITE_SHOP_CHECKOUT}/${cartId}?url=${url}`;
  return sendRequest('post', CHECKOUT_URL, body, { headers: { token } });
}

export function getWishlist(token) {
  return get(import.meta.env.VITE_SHOP_WISHLIST, { headers: { token } });
}

export function postWishlistItem(token, productId) {
  return sendRequest(
    'post',
    WISHLIST_URL,
    { productId },
    { headers: { token } },
  );
}

export function deleteWishlistItem(token, productId) {
  const url = `${WISHLIST_URL}/${productId}`;
  return sendRequest('delete', url, { headers: { token } });
}

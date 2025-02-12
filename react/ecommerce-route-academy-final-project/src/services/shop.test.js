import { afterEach, describe, expect, it, vi } from 'vitest';
import * as shopService from './shop';
import axios from 'axios';

vi.mock('axios', () => {
  const axiosMock = {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  };
  return { ...axiosMock, default: axiosMock };
});

afterEach(() => vi.resetAllMocks());

const BASE_URL = import.meta.env.VITE_SHOP_BASE;
const TOKEN = 'JSON Web Token';

describe('Shop Service', () => {
  it('should use valid base url', () => {
    expect(BASE_URL).toBeDefined();
  });

  it('should use valid endpoints', () => {
    expect(import.meta.env.VITE_SHOP_ALL_PRODUCTS).toBeDefined();
    expect(import.meta.env.VITE_SHOP_ALL_CATEGORIES).toBeDefined();
    expect(import.meta.env.VITE_SHOP_USER_ORDERS).toBeDefined();
    expect(import.meta.env.VITE_SHOP_CATEGORY).toBeDefined();
    expect(import.meta.env.VITE_SHOP_WISHLIST).toBeDefined();
    expect(import.meta.env.VITE_SHOP_CHECKOUT).toBeDefined();
    expect(import.meta.env.VITE_SHOP_CART).toBeDefined();
  });

  it('should have a `get` function that calls Axios `get` method with the correct arguments', async () => {
    const END_POINT = '/endpoint';
    const url = `${BASE_URL}${END_POINT}`;
    await expect(shopService.get(END_POINT)).resolves.not.toThrowError();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});

describe('Shop Products Microservices', () => {
  it('should `getAllProducts` call Axios `get` method with correct URL', async () => {
    const END_POINT = import.meta.env.VITE_SHOP_ALL_PRODUCTS;
    await expect(shopService.getAllProducts()).resolves.not.toThrowError();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}${END_POINT}`);
  });
});

describe('Shop Categories Microservices', () => {
  it('should `getAllCategories` call Axios `get` method with correct URL', async () => {
    const END_POINT = import.meta.env.VITE_SHOP_ALL_CATEGORIES;
    await expect(shopService.getAllCategories()).resolves.not.toThrowError();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}${END_POINT}`);
  });

  it('should `getCategory` call Axios `get` method with the given category', async () => {
    const END_POINT = import.meta.env.VITE_SHOP_ALL_PRODUCTS;
    const CATEGORY = 'cat';
    await expect(shopService.getCategory(CATEGORY)).resolves.not.toThrowError();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}${END_POINT}?category=${CATEGORY}`,
    );
  });
});

describe('Shop Cart Microservices', () => {
  const CART_URL = `${BASE_URL}${import.meta.env.VITE_SHOP_CART}`;
  const OPTIONS = { headers: { token: TOKEN } };

  it('should `getCart` call Axios `get` method with correct arguments', async () => {
    await expect(shopService.getCart(TOKEN)).resolves.not.toThrowError();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(CART_URL, OPTIONS);
  });

  it('should `postCartItem` call Axios `post` method with correct arguments', async () => {
    const productId = '7';
    const body = { productId };
    await expect(
      shopService.postCartItem(TOKEN, productId),
    ).resolves.not.toThrowError();
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(CART_URL, body, OPTIONS);
  });

  it('should `putCartItemCount` call Axios `put` method with correct arguments', async () => {
    const productId = '7';
    const count = 3;
    const body = { count };
    const url = `${CART_URL}/${productId}`;
    await expect(
      shopService.putCartItemCount(TOKEN, productId, count),
    ).resolves.not.toThrowError();
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(url, body, OPTIONS);
  });

  it('should `deleteCartItem` call Axios `delete` method with correct arguments', async () => {
    const productId = '7';
    const url = `${CART_URL}/${productId}`;
    await expect(
      shopService.deleteCartItem(TOKEN, productId),
    ).resolves.not.toThrowError();
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(url, OPTIONS);
  });

  it('should `postCheckout` call Axios `post` method with correct arguments', async () => {
    const cartId = '7';
    const url = window.location.origin;
    const body = {
      shippingAddress: {
        details: 'details',
        phone: '01010700999',
        city: 'Cairo',
      },
    };
    const CHECKOUT_URL = `${BASE_URL}${import.meta.env.VITE_SHOP_CHECKOUT}/${cartId}?url=${url}`;
    await expect(
      shopService.postCheckout(TOKEN, cartId, url, body),
    ).resolves.not.toThrowError();
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(CHECKOUT_URL, body, OPTIONS);
  });
});

describe('Shop Wishlist Microservices', () => {
  const WISHLIST_URL = `${BASE_URL}${import.meta.env.VITE_SHOP_WISHLIST}`;
  const OPTIONS = { headers: { token: TOKEN } };

  it('should `getWishlist` call Axios `get` method with correct arguments', async () => {
    await expect(shopService.getWishlist(TOKEN)).resolves.not.toThrowError();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(WISHLIST_URL, OPTIONS);
  });

  it('should `postWishlistItem` call Axios `post` method with correct arguments', async () => {
    const productId = '7';
    const body = { productId };
    await expect(
      shopService.postWishlistItem(TOKEN, productId),
    ).resolves.not.toThrowError();
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(WISHLIST_URL, body, OPTIONS);
  });

  it('should `deleteWishlistItem` call Axios `delete` method with correct arguments', async () => {
    const productId = '7';
    const url = `${WISHLIST_URL}/${productId}`;
    await expect(
      shopService.deleteWishlistItem(TOKEN, productId),
    ).resolves.not.toThrowError();
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(url, OPTIONS);
  });
});

describe('Shop UserOrders Microservice', () => {
  it('should `getUserOrders` call Axios `get` method with correct arguments', async () => {
    const userId = '7';
    const url = `${BASE_URL}${import.meta.env.VITE_SHOP_USER_ORDERS}/${userId}`;
    await expect(shopService.getUserOrders(userId)).resolves.not.toThrowError();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});

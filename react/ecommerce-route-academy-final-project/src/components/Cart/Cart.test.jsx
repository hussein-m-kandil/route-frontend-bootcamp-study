import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import userEvent from '@testing-library/user-event';

const cartMock = vi.fn(() => [
  {
    product: {
      sold: 11235,
      images: [
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403397482-1.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403397482-2.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403397483-3.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403397485-4.jpeg',
      ],
      subcategory: [
        {
          _id: '6407f1bcb575d3b90bf95797',
          name: "Women's Clothing",
          slug: "women's-clothing",
          category: '6439d58a0049ad0b52b9003f',
        },
      ],
      ratingsQuantity: 18,
      _id: '6428ebc6dc1175abc65ca0b9',
      title: 'Woman Shawl 1',
      slug: 'woman-shawl',
      description:
        'Material: Polyester Blend, Colour Name: Multicolour, Department: Women',
      quantity: 225,
      price: 190,
      imageCover:
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg',
      category: {
        _id: '6439d58a0049ad0b52b9003f',
        name: "Women's Fashion",
        slug: "women's-fashion",
        image:
          'https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg',
      },
      brand: {
        _id: '64089bbe24b25627a253158b',
        name: 'DeFacto',
        slug: 'defacto',
        image:
          'https://ecommerce.routemisr.com/Route-Academy-brands/1678285758109.png',
      },
      ratingsAverage: 4.8,
      createdAt: '2023-04-02T02:43:18.400Z',
      updatedAt: '2025-02-12T10:37:09.951Z',
      id: '6428ebc6dc1175abc65ca0b9',
    },
    count: 1,
  },
  {
    product: {
      sold: 17807,
      images: [
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403266805-1.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403266806-3.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403266806-2.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403266807-4.jpeg',
      ],
      subcategory: [
        {
          _id: '6407f1bcb575d3b90bf95797',
          name: "Women's Clothing",
          slug: "women's-clothing",
          category: '6439d58a0049ad0b52b9003f',
        },
      ],
      ratingsQuantity: 18,
      _id: '6428eb43dc1175abc65ca0b3',
      title: 'Woman Shawl 2',
      slug: 'woman-shawl',
      description: 'Material: Polyester Blend, Department: Women',
      quantity: 220,
      price: 149,
      imageCover:
        'https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg',
      category: {
        _id: '6439d58a0049ad0b52b9003f',
        name: "Women's Fashion",
        slug: "women's-fashion",
        image:
          'https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg',
      },
      brand: {
        _id: '64089bbe24b25627a253158b',
        name: 'DeFacto',
        slug: 'defacto',
        image:
          'https://ecommerce.routemisr.com/Route-Academy-brands/1678285758109.png',
      },
      ratingsAverage: 4.8,
      createdAt: '2023-04-02T02:41:07.506Z',
      updatedAt: '2025-02-12T10:37:09.951Z',
      id: '6428eb43dc1175abc65ca0b3',
    },
    count: 3,
  },
]);

const updateCartMock = vi.fn();
const checkoutMock = vi.fn();

afterEach(() => vi.resetAllMocks());

function AppMock() {
  return (
    <Outlet
      context={{
        wishlist: [],
        cart: cartMock(),
        checkout: checkoutMock,
        updateCart: updateCartMock,
      }}
    />
  );
}

function RoutedCart() {
  return (
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: '/',
            element: <AppMock />,
            children: [{ path: 'cart', element: <Cart /> }],
          },
        ],
        { initialEntries: ['/cart'], initialIndex: 0 },
      )}
    />
  );
}

describe('Cart', () => {
  it('has a heading', () => {
    render(<RoutedCart />);
    expect(screen.getByRole('heading', { name: /cart/i })).toBeInTheDocument();
  });

  it('has the items count', () => {
    const cart = cartMock();
    const itemsCount = cart.reduce((sum, { count }) => sum + count, 0);
    render(<RoutedCart />);
    expect(
      screen.getByText(new RegExp(`${itemsCount}.*item`, 'i')),
    ).toBeInTheDocument();
  });

  it('has all products in the cart', () => {
    const cart = cartMock();
    render(<RoutedCart />);
    for (const { product, count } of cart) {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByAltText(product.title)).toBeInTheDocument();
      expect(screen.getAllByDisplayValue(count).length).toBeGreaterThan(0);
      expect(
        screen.getAllByText(new RegExp(product.price * count)).length,
      ).toBeGreaterThan(0);
      expect(screen.getAllByLabelText(/increment/i)).toHaveLength(cart.length);
      expect(screen.getAllByLabelText(/decrement/i)).toHaveLength(cart.length);
    }
  });

  it('has the total cost rounded to fixed 2 decimal points', () => {
    const cart = cartMock();
    const totalCost = cart
      .reduce((total, { product, count }) => {
        return total + product.price * count;
      }, 0)
      .toFixed(2);
    render(<RoutedCart />);
    expect(screen.getByText(new RegExp(`${totalCost}`))).toBeInTheDocument();
  });

  it('has checkout button', () => {
    render(<RoutedCart />);
    expect(
      screen.getByRole('button', { name: /checkout/i }),
    ).toBeInTheDocument();
  });

  it('calls checkout function on click the checkout button', async () => {
    const user = userEvent.setup();
    render(<RoutedCart />);
    await user.click(screen.getByRole('button', { name: /checkout/i }));
    expect(checkoutMock).toHaveBeenCalledTimes(1);
  });
});

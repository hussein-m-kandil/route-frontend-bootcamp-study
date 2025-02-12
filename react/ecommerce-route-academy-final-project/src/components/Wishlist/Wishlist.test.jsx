import '@testing-library/jest-dom/vitest';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Wishlist from './Wishlist';
import { render, screen } from '@testing-library/react';

const wishlistMock = vi.fn(() => [
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
    count: 0,
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

function RoutedWishlist() {
  return (
    <RouterProvider
      router={createMemoryRouter([
        {
          path: '/',
          element: <Outlet context={{ wishlist: wishlistMock() }} />,
          children: [{ index: true, element: <Wishlist /> }],
        },
      ])}
    />
  );
}

describe('Wishlist', () => {
  it('has a wishlist heading', () => {
    render(<RoutedWishlist />);
    expect(
      screen.getByRole('heading', { name: /wishlist/i }),
    ).toBeInTheDocument();
  });

  it('has the count of items', () => {
    const itemsCount = wishlistMock().length;
    render(<RoutedWishlist />);
    expect(
      screen.getByText(new RegExp(`${itemsCount}.*item`, 'i')),
    ).toBeInTheDocument();
  });

  it('has product cards that matches the cart state', () => {
    const wishlist = wishlistMock();
    render(<RoutedWishlist />);
    for (const { product, count } of wishlist) {
      expect(screen.getByText(new RegExp(product.title))).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(product.price * (count || 1))),
      ).toBeInTheDocument();
      if (count > 0) {
        expect(screen.getByDisplayValue(count)).toBeInTheDocument();
      } else {
        expect(
          screen.getByRole('button', { name: /add to cart/i }),
        ).toBeInTheDocument();
      }
    }
  });
});

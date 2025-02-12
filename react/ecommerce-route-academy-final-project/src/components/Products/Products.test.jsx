import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Products from './Products';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';

const items = [
  {
    product: {
      sold: 2432,
      images: [
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-1.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-4.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-2.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-3.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-5.jpeg',
      ],
      subcategory: [
        {
          _id: '6407f243b575d3b90bf957ac',
          name: "Men's Clothing",
          slug: "men's-clothing",
          category: '6439d5b90049ad0b52b90048',
        },
      ],
      ratingsQuantity: 20,
      _id: '6428de2adc1175abc65ca05b',
      title: 'Softride Enzo NXT CASTLEROCK-High Risk R',
      slug: 'softride-enzo-nxt-castlerock-high-risk-r',
      description: 'Sole Material: Rubber, Colour Name: RED, Department: Men',
      quantity: 173,
      price: 2999,
      imageCover:
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913757-cover.jpeg',
      category: {
        _id: '6439d5b90049ad0b52b90048',
        name: "Men's Fashion",
        slug: "men's-fashion",
        image:
          'https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg',
      },
      brand: {
        _id: '64089d5c24b25627a253159f',
        name: 'Puma',
        slug: 'puma',
        image:
          'https://ecommerce.routemisr.com/Route-Academy-brands/1678286172219.png',
      },
      ratingsAverage: 2.8,
      createdAt: '2023-04-02T01:45:14.676Z',
      updatedAt: '2025-02-12T07:29:37.554Z',
      __v: 0,
      reviews: [],
      id: '6428de2adc1175abc65ca05b',
    },
    count: 0,
  },
  {
    product: {
      sold: 2432,
      images: [
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-1.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-4.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-2.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-3.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-5.jpeg',
      ],
      subcategory: [
        {
          _id: '6407f243b575d3b90bf957ac',
          name: "Men's Clothing",
          slug: "men's-clothing",
          category: '6439d5b90049ad0b52b90048',
        },
      ],
      ratingsQuantity: 20,
      _id: '6428de2adc1175abc65ca05b',
      title: 'Softride Enzo NXT CASTLEROCK-High Risk R',
      slug: 'softride-enzo-nxt-castlerock-high-risk-r',
      description: 'Sole Material: Rubber, Colour Name: RED, Department: Men',
      quantity: 173,
      price: 2999,
      imageCover:
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913757-cover.jpeg',
      category: {
        _id: '6439d5b90049ad0b52b90048',
        name: "Men's Fashion",
        slug: "men's-fashion",
        image:
          'https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg',
      },
      brand: {
        _id: '64089d5c24b25627a253159f',
        name: 'Puma',
        slug: 'puma',
        image:
          'https://ecommerce.routemisr.com/Route-Academy-brands/1678286172219.png',
      },
      ratingsAverage: 2.8,
      createdAt: '2023-04-02T01:45:14.676Z',
      updatedAt: '2025-02-12T07:29:37.554Z',
      __v: 0,
      reviews: [],
      id: '6428de2adc1175abc65ca05x',
    },
    count: 0,
  },
  {
    product: {
      sold: 2432,
      images: [
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-1.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-4.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913850-2.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-3.jpeg',
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913851-5.jpeg',
      ],
      subcategory: [
        {
          _id: '6407f243b575d3b90bf957ac',
          name: "Men's Clothing",
          slug: "men's-clothing",
          category: '6439d5b90049ad0b52b90048',
        },
      ],
      ratingsQuantity: 20,
      _id: '6428de2adc1175abc65ca05b',
      title: 'Softride Enzo NXT CASTLEROCK-High Risk R',
      slug: 'softride-enzo-nxt-castlerock-high-risk-r',
      description: 'Sole Material: Rubber, Colour Name: RED, Department: Men',
      quantity: 173,
      price: 2999,
      imageCover:
        'https://ecommerce.routemisr.com/Route-Academy-products/1680399913757-cover.jpeg',
      category: {
        _id: '6439d5b90049ad0b52b90048',
        name: "Men's Fashion",
        slug: "men's-fashion",
        image:
          'https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg',
      },
      brand: {
        _id: '64089d5c24b25627a253159f',
        name: 'Puma',
        slug: 'puma',
        image:
          'https://ecommerce.routemisr.com/Route-Academy-brands/1678286172219.png',
      },
      ratingsAverage: 2.8,
      createdAt: '2023-04-02T01:45:14.676Z',
      updatedAt: '2025-02-12T07:29:37.554Z',
      __v: 0,
      reviews: [],
      id: '6428de2adc1175abc65ca05f',
    },
    count: 0,
  },
];

const updateCartMock = vi.fn();

function RoutedProducts() {
  return (
    <RouterProvider
      router={createMemoryRouter([
        {
          path: '/',
          element: (
            <Outlet context={{ wishlist: [], updateCart: updateCartMock }} />
          ),
          children: [
            {
              index: true,
              element: <Products items={items} />,
            },
          ],
        },
      ])}
    />
  );
}

describe('Products', () => {
  it('renders the give products', () => {
    render(<RoutedProducts />);
    const { title, price, category } = items[0].product;
    const len = items.length;
    expect(screen.getAllByText(title)).toHaveLength(len);
    expect(screen.getAllByText(new RegExp(price))).toHaveLength(len);
    expect(screen.getAllByText(new RegExp(category.name))).toHaveLength(len);
    expect(screen.getAllByAltText(title)).toHaveLength(len);
  });
});

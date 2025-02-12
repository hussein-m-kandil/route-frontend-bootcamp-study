import '@testing-library/jest-dom/vitest';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import PropTypes from 'prop-types';

const products = [
  {
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
  {
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
];

const curriedResponse = (responseBody) => {
  return () =>
    new Promise((resolve) => setTimeout(() => resolve(responseBody), 0));
};

vi.mock('../../services/shop.js', () => {
  return {
    getAllProducts: vi.fn(curriedResponse({ data: products })),
    getCategory: vi.fn(curriedResponse({ data: products })),
  };
});

const updateCartMock = vi.fn();
const cartMock = vi.fn(() => []);

function AppMock() {
  return (
    <Outlet
      context={{ wishlist: [], cart: cartMock(), updateCart: updateCartMock }}
    />
  );
}

afterEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
});

const { getAllProducts, getCategory } = await import('../../services/shop');
const { CATEGORY_PATH } = await import('../../App');
const { default: Home } = await import('./Home');

function RoutedHome({
  routerOptions = {
    initialEntries: ['/'],
    initialIndex: 0,
  },
}) {
  return (
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: '/',
            element: <AppMock />,
            children: [
              { path: '', element: <Home /> },
              {
                path: `${CATEGORY_PATH}/:category/:categoryId`,
                element: <Home />,
              },
            ],
          },
        ],
        routerOptions,
      )}
    />
  );
}

RoutedHome.propTypes = {
  routerOptions: PropTypes.shape({
    initialEntries: PropTypes.arrayOf(PropTypes.string).isRequired,
    initialIndex: PropTypes.number,
  }),
};

const categoryRouterOptions = {
  initialEntries: [
    `${CATEGORY_PATH}/${products[0].category.name}/${products[0].category._id}`,
  ],
  initialIndex: 0,
};

describe('Home page', () => {
  it('has the all-categories title', () => {
    render(<RoutedHome />);
    expect(document.title).toMatch(/home/i);
  });

  it('has the category title', () => {
    render(<RoutedHome routerOptions={categoryRouterOptions} />);
    expect(document.title).toMatch(new RegExp(products[0].category.name, 'i'));
  });

  it('has the all-categories headline', async () => {
    const name = /all categories/i;
    render(<RoutedHome />);
    expect(await screen.findByRole('heading', { name })).toBeInTheDocument();
  });

  it('has the category name as a headline', async () => {
    const name = new RegExp(products[0].category.name, 'i');
    render(<RoutedHome routerOptions={categoryRouterOptions} />);
    expect(await screen.findByRole('heading', { name })).toBeInTheDocument();
  });

  it('has a loader on start', async () => {
    render(<RoutedHome />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    expect(screen.queryByLabelText(/loading/i)).toBeNull();
  });

  it('renders all categories products', async () => {
    render(<RoutedHome />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    for (const prod of products) {
      expect(screen.getByText(prod.title)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(prod.price))).toBeInTheDocument();
      expect(screen.getByAltText(prod.title)).toBeInTheDocument();
    }
    expect(
      screen.getAllByRole('button', { name: /add to cart/i }),
    ).toHaveLength(products.length);
  });

  it('renders a single category with multiple products', async () => {
    render(<RoutedHome routerOptions={categoryRouterOptions} />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    for (const prod of products) {
      expect(screen.getByText(prod.title)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(prod.price))).toBeInTheDocument();
      expect(screen.getByAltText(prod.title)).toBeInTheDocument();
    }
    expect(
      screen.getAllByRole('button', { name: /add to cart/i }),
    ).toHaveLength(products.length);
  });

  it('renders a single category with a single product', async () => {
    const product = products[0];
    getCategory.mockImplementationOnce(curriedResponse({ data: [product] }));
    render(<RoutedHome routerOptions={categoryRouterOptions} />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price))).toBeInTheDocument();
    expect(screen.getByAltText(product.title)).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /add to cart/i }),
    ).toHaveLength(1);
  });

  it('matches the cart state while rendering all categories', async () => {
    const count = 7;
    const product = products[0];
    cartMock.mockImplementationOnce(() => [{ product, count }]);
    render(<RoutedHome />);
    expect(await screen.findByDisplayValue(`${count}`)).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /add to cart/i }),
    ).toHaveLength(products.length - 1);
  });

  it('matches the cart state while rendering a single category', async () => {
    const count = 7;
    const product = products[0];
    cartMock.mockImplementationOnce(() => [{ product, count }]);
    render(<RoutedHome routerOptions={categoryRouterOptions} />);
    expect(await screen.findByDisplayValue(`${count}`)).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /add to cart/i }),
    ).toHaveLength(products.length - 1);
  });

  it('apologizes if an error occurred while fetching all categories products', async () => {
    const error = { message: 'Fetch error!' };
    getAllProducts.mockImplementationOnce(curriedResponse({ error }));
    render(<RoutedHome />);
    expect(await screen.findByText(/sorry/i)).toBeInTheDocument();
  });

  it('apologizes if an error occurred while fetching single category products', async () => {
    const error = { message: 'Fetch error!' };
    getCategory.mockImplementationOnce(curriedResponse({ error }));
    render(<RoutedHome routerOptions={categoryRouterOptions} />);
    expect(await screen.findByText(/sorry/i)).toBeInTheDocument();
  });

  it('informs that there are no products on receiving zero all categories products', async () => {
    getAllProducts.mockImplementationOnce(curriedResponse({ data: [] }));
    render(<RoutedHome />);
    expect(await screen.findByText(/no products/i)).toBeInTheDocument();
  });

  it('informs that there are no products on receiving zero category products', async () => {
    getCategory.mockImplementationOnce(curriedResponse({ data: [] }));
    render(<RoutedHome routerOptions={categoryRouterOptions} />);
    expect(await screen.findByText(/no products/i)).toBeInTheDocument();
  });
});

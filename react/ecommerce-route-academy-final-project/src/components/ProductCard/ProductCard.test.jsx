import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useOutletContext,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';
import { useState } from 'react';

const itemMock = vi.fn(() => {
  return {
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
  };
});
const updateCartMock = vi.fn();
const updateWishlistMock = vi.fn();
const wishlistMock = vi.fn(() => []);

afterEach(() => vi.resetAllMocks());

function RoutedProductCard() {
  return (
    <RouterProvider
      router={createMemoryRouter([
        {
          path: '/',
          Component: () => {
            const [cart, setCart] = useState([itemMock()]);
            updateCartMock.mockImplementation((product, count) =>
              setCart([{ product, count }]),
            );
            return (
              <Outlet
                context={{
                  cart,
                  wishlist: wishlistMock(),
                  updateCart: updateCartMock,
                  updateWishlist: updateWishlistMock,
                }}
              />
            );
          },
          children: [
            {
              index: true,
              Component: () => {
                const { cart } = useOutletContext();
                return <ProductCard item={cart[0]} />;
              },
            },
          ],
        },
      ])}
    />
  );
}

describe('ProductCart', () => {
  it('has the given details', () => {
    render(<RoutedProductCard />);
    const { title, price, category } = itemMock().product;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(price.toFixed(2)))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(category.name))).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: title })[0]).toBeInTheDocument();
  });

  it('has the given count', () => {
    const count = 3;
    const originalItemMock = itemMock();
    itemMock.mockImplementationOnce(() => ({ ...originalItemMock, count }));
    render(<RoutedProductCard />);
    expect(screen.getByDisplayValue(count)).toBeInTheDocument();
  });

  it('has add-to-cart button', () => {
    render(<RoutedProductCard />);
    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  it('has add-to-wishlist toggler', () => {
    render(<RoutedProductCard />);
    expect(
      screen.getByRole('checkbox', { name: /add to wishlist/i }),
    ).toBeInTheDocument();
  });
});

describe('Add-to-wishlist toggler', () => {
  it('calls the wishlist updata on toggle', async () => {
    const item = itemMock();
    const user = userEvent.setup();
    render(<RoutedProductCard />);
    await user.click(
      screen.getByRole('checkbox', { name: /add to wishlist/i }),
    );
    expect(updateWishlistMock).toHaveBeenCalledTimes(1);
    expect(updateWishlistMock).toHaveBeenCalledWith(item);
  });

  it('is not checked if the item not in the wishlist', () => {
    render(<RoutedProductCard />);
    expect(
      screen.getByRole('checkbox', { name: /add to wishlist/i }),
    ).not.toBeChecked();
  });

  it('is checked if the item in the wishlist', () => {
    wishlistMock.mockImplementationOnce(() => [itemMock()]);
    render(<RoutedProductCard />);
    expect(
      screen.getByRole('checkbox', { name: /add to wishlist/i }),
    ).toBeChecked();
  });
});

describe('Add-to-Cart button', () => {
  it('gets replaced by a count counter on click', async () => {
    const user = userEvent.setup();
    render(<RoutedProductCard />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.queryByRole('button', { name: /add to cart/i })).toBeNull();
    const countInput = screen.getByRole('textbox', { name: /count/i });
    expect(countInput).toBeInTheDocument();
    expect(countInput).toHaveValue('1');
  });

  it('changes the count into 1 and calls the cart updater on click', async () => {
    const user = userEvent.setup();
    render(<RoutedProductCard />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(updateCartMock).toHaveBeenCalledTimes(1);
    expect(updateCartMock).toHaveBeenCalledWith(itemMock().product, 1);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });
});

describe('Counters', () => {
  it('does not accept number higher than the JavaScript max safe integer', async () => {
    const user = userEvent.setup();
    render(<RoutedProductCard />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    await user.clear(screen.getByRole('textbox', { name: /count/i }));
    const countInput = screen.getByRole('textbox', { name: /count/i });
    await user.type(countInput, `${Number.MAX_SAFE_INTEGER}1`, {
      initialSelectionStart: 0,
      initialSelectionEnd: countInput.value.length,
    });
    expect(screen.getByRole('textbox', { name: /count/i })).toHaveValue(
      `${Number.MAX_SAFE_INTEGER}`,
    );
  });

  it('calls the given add-to-cart handler with the given details and the count number', async () => {
    const { product } = itemMock();
    const user = userEvent.setup();
    render(<RoutedProductCard />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(updateCartMock).toHaveBeenCalledTimes(2);
    expect(updateCartMock).toHaveBeenCalledWith(product, 2);
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price * 2))).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(updateCartMock).toHaveBeenCalledTimes(3);
    expect(updateCartMock).toHaveBeenCalledWith(product, 1);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price))).toBeInTheDocument();
    const countInput = screen.getByRole('textbox', { name: /count/i });
    await user.type(countInput, '3', {
      initialSelectionStart: 0,
      initialSelectionEnd: countInput.value.length,
    });
    expect(updateCartMock).toHaveBeenCalledTimes(4);
    expect(updateCartMock).toHaveBeenCalledWith(product, 3);
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp((product.price * 3).toFixed(2))),
    ).toBeInTheDocument();
  });

  it('replaced with add-to-cart button when gets a value of 0', async () => {
    const user = userEvent.setup();
    render(<RoutedProductCard />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.queryByRole('button', { name: /add to cart/i })).toBeNull();
    const countInput = screen.getByRole('textbox', { name: /count/i });
    await user.type(countInput, '0', {
      initialSelectionStart: 0,
      initialSelectionEnd: countInput.value.length,
    });
    expect(screen.queryByRole('textbox', { name: /count/i })).toBeNull();
    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.queryByRole('button', { name: /add to cart/i })).toBeNull();
    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.queryByRole('button', { name: /decrement/i })).toBeNull();
    expect(screen.queryByRole('textbox', { name: /count/i })).toBeNull();
    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
  });
});

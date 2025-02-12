import '@testing-library/jest-dom/vitest';
import { vi, it, expect, describe, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Link,
  Navigate,
  RouterProvider,
  useNavigate,
  useOutletContext,
  createMemoryRouter,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const items = [
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
    count: 0,
  },
];

vi.mock('./components/Navbar/Navbar', () => ({
  default: () => <div>Navbar</div>,
}));

vi.mock('./components/Footer/Footer', () => ({
  default: () => <div>Footer</div>,
}));

// Just to avoid error occur because of React-Router's 'ScrollRestoration'
window.scroll = vi.fn();
window.scrollBy = vi.fn();
window.scrollTo = vi.fn();

const authMicroserviceMock = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { message: 'verified', decoded: { id: '7' } } }),
      0,
    ),
  );

vi.mock('./services/auth', () => {
  return {
    postSignin: authMicroserviceMock,
    postSignup: authMicroserviceMock,
    getSignout: authMicroserviceMock,
    deleteUser: authMicroserviceMock,
    getSigninValidation: authMicroserviceMock,
  };
});

const serverCart = { _id: '7', products: [] };
const serverWishlist = [];

vi.mock('./services/shop', () => {
  const respond = (data, timeout = 0) => {
    return new Promise((resolve) =>
      timeout
        ? setTimeout(() => resolve({ data }), timeout)
        : queueMicrotask(() => resolve({ data })),
    );
  };
  return {
    getCart: vi.fn(() => {
      return respond({
        products: serverCart.products.map(({ product: id, count }) => {
          return {
            product: items.find(({ product }) => product.id === id),
            count,
          };
        }),
      });
    }),
    getUserOrders: vi.fn(() => respond([])),
    postCartItem: vi.fn((_, productId) => {
      const cartProduct = serverCart.products.find(
        ({ product: id }) => id === productId,
      );
      if (cartProduct) cartProduct.count++;
      else serverCart.products.push({ product: productId, count: 1 });
      return respond(serverCart);
    }),
    deleteCartItem: vi.fn((_, productId) => {
      const productIndex = serverCart.products.findIndex(
        ({ product: id }) => id === productId,
      );
      if (productIndex > -1) serverCart.products.splice(productIndex, 1);
      return respond(serverCart);
    }),
    postCheckout: vi.fn(() => respond({ session: { url: location.href } }, 50)),
    putCartItemCount: vi.fn((_, productId, count) => {
      const cartProduct = serverCart.products.find(
        ({ product: id }) => id === productId,
      );
      if (cartProduct) cartProduct.count = count;
      return respond(serverCart);
    }),
    getWishlist: vi.fn(() => {
      return respond(
        serverWishlist.map((id) => {
          return items.find(({ product }) => product.id === id);
        }),
      );
    }),
    postWishlistItem: vi.fn((_, productId) => {
      const cartProduct = serverWishlist.find((id) => id === productId);
      if (!cartProduct) serverWishlist.push(productId);
      return respond(serverWishlist);
    }),
    deleteWishlistItem: vi.fn((_, productId) => {
      const productIndex = serverWishlist.findIndex((id) => id === productId);
      if (productIndex > -1) serverWishlist.splice(productIndex, 1);
      return respond(serverWishlist);
    }),
  };
});

afterEach(() => {
  serverCart.products.splice(0);
  serverWishlist.splice(0);
  vi.resetAllMocks();
});

const {
  default: App,
  SIGNOUT_PATH,
  SIGNIN_PATH,
  CART_PATH,
  WISHLIST_PATH,
} = await import('./App');

const { default: Products } = await import('./components/Products/Products');

const AUTH_DATA = {
  message: 'success',
  user: {
    name: 'Superman',
    email: 'superman@gmail.com',
    role: 'user',
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWM5NmJhZDA4ODA0MTM2YzEwODE5NiIsIm5hbWUiOiJTdXBlcm1hbm5ubm4iLCJyb2xlIjoidXNlciIsImlhdCI6MTczOTM2NDAyNiwiZXhwIjoxNzQ3MTQwMDI2fQ.i4NlGjaugkjiDyfbPuM0_fZgmqfJ7QhaCDtddFhHo-8',
};
const PRIVATE_CONTENT = 'Private content';
const SIGNIN_CONTENT = 'Sign in content';
const PUBLIC_CONTENT = 'Public content';
const PRIVATE_PATH = '/private';
const PUBLIC_PATH = '/';
const SIGNIN_BTN_CONTENT = 'Sign in';
const SIGNOUT_BTN_CONTENT = 'Sign out';
const DEL_USER_BTN_CONTENT = 'Delete user';

function NavLinksMock() {
  return (
    <>
      <Link to={CART_PATH}>Cart</Link>
      <Link to={WISHLIST_PATH}>Wishlist</Link>
    </>
  );
}

function ProductsMock() {
  const { cart } = useOutletContext();
  const updatedItems = items.map((item) => {
    const cartItem = cart.find(({ product }) => product.id === item.product.id);
    return cartItem || item;
  });
  return <Products items={updatedItems} />;
}

function PrivatePageMock() {
  const { authenticated, deleteUser } = useOutletContext();
  const navigate = useNavigate();
  return !authenticated ? (
    <Navigate to={PUBLIC_PATH} replace={true} />
  ) : (
    <>
      <h2>
        {PRIVATE_CONTENT}
        <button type="button" onClick={() => navigate(SIGNOUT_PATH)}>
          {SIGNOUT_BTN_CONTENT}
        </button>
        <button type="button" onClick={() => deleteUser()}>
          {DEL_USER_BTN_CONTENT}
        </button>
      </h2>
      <NavLinksMock />
      <ProductsMock />
    </>
  );
}

function PublicPageMock() {
  const { authenticate, authenticated } = useOutletContext();
  return authenticated ? (
    <Navigate to={PRIVATE_PATH} replace={true} />
  ) : (
    <>
      <h2>
        {PUBLIC_CONTENT}
        <button type="button" onClick={() => authenticate(AUTH_DATA)}>
          {SIGNIN_BTN_CONTENT}
        </button>
      </h2>
      <NavLinksMock />
      <ProductsMock />
    </>
  );
}

function CartMock() {
  const { cart, checkout, updating } = useOutletContext();
  return (
    <>
      {cart.length > 0 && (
        <button onClick={checkout} disabled={updating}>
          Checkout
        </button>
      )}
      <Products items={cart} />
    </>
  );
}

function WishlistMock() {
  const { wishlist } = useOutletContext();
  return <Products items={wishlist} />;
}

function RoutedApp() {
  return (
    <RouterProvider
      router={createMemoryRouter([
        {
          path: PUBLIC_PATH,
          element: <App />,
          children: [
            {
              path: SIGNOUT_PATH,
              Component: () => {
                const { authenticated } = useOutletContext();
                return authenticated ? (
                  <App />
                ) : (
                  <Navigate to={PUBLIC_PATH} replace={true} />
                );
              },
            },
            { index: true, element: <PublicPageMock /> },
            { path: CART_PATH, element: <CartMock /> },
            { path: WISHLIST_PATH, element: <WishlistMock /> },
            { path: PRIVATE_PATH, element: <PrivatePageMock /> },
            {
              path: SIGNIN_PATH,
              element: (
                <>
                  <NavLinksMock />
                  <div>{SIGNIN_CONTENT}</div>
                </>
              ),
            },
          ],
        },
      ])}
    />
  );
}

describe('App', () => {
  it('shows authenticated-user content only after calling authenticate from child', async () => {
    const user = userEvent.setup();
    render(<RoutedApp />);
    expect(await screen.findByText(PUBLIC_CONTENT)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: SIGNIN_BTN_CONTENT }));
    expect(await screen.findByText(PRIVATE_CONTENT)).toBeInTheDocument();
  });

  it('shows unauthenticated-user content after signing the user out', async () => {
    const user = userEvent.setup();
    render(<RoutedApp />);
    expect(screen.getByText(PUBLIC_CONTENT)).toBeInTheDocument();
    expect(screen.queryByText(PRIVATE_CONTENT)).toBeNull();
    await user.click(screen.getByRole('button', { name: SIGNIN_BTN_CONTENT }));
    expect(await screen.findByText(PRIVATE_CONTENT)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: SIGNOUT_BTN_CONTENT }));
    expect(screen.queryByText(PRIVATE_CONTENT)).toBeNull();
    expect(screen.getByText(PUBLIC_CONTENT)).toBeInTheDocument();
  });
});

describe('App Products', () => {
  it('gets rendered correctly', () => {
    render(<RoutedApp />);
    for (const { product } of items) {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByAltText(product.title)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(product.price))).toBeInTheDocument();
    }
    expect(
      screen.getAllByRole('button', { name: /add to cart/i }),
    ).toHaveLength(items.length);
  });
});

describe('App Cart', () => {
  it('gets the added products', async () => {
    const user = userEvent.setup();
    render(<RoutedApp />);
    await user.click(screen.getByRole('button', { name: SIGNIN_BTN_CONTENT }));
    for (const btn of await screen.findAllByRole('button', {
      name: /add to cart/i,
    })) {
      await user.click(btn);
    }
    for (const btn of screen.getAllByLabelText(/increment/i)) {
      await user.click(btn);
    }
    await user.click(screen.getByRole('link', { name: /cart/i }));
    const countInputs = screen.getAllByRole('textbox', {
      name: /count/i,
    });
    expect(countInputs).toHaveLength(items.length);
    countInputs.forEach((inp) => expect(inp).toHaveValue('2'));
    items.forEach(({ product }) =>
      expect(
        screen.getByText(new RegExp(product.price * 2)),
      ).toBeInTheDocument(),
    );
  });

  it('gets updated correctly and maintain the order of the products', async () => {
    const user = userEvent.setup();
    render(<RoutedApp />);
    await user.click(screen.getByRole('button', { name: SIGNIN_BTN_CONTENT }));
    const addBtns = await screen.findAllByRole('button', {
      name: /add to cart/i,
    });
    for (const btn of addBtns) await user.click(btn);
    const incrementBtns = await screen.findAllByLabelText(/increment/i);
    for (const btn of incrementBtns) await user.click(btn);
    await user.click(screen.getByRole('link', { name: /cart/i }));
    await user.click(screen.getAllByLabelText(/decrement/i)[0]);
    await user.click(screen.getAllByLabelText(/increment/i)[1]);
    expect(screen.getAllByRole('textbox', { name: /count/i })[0]).toHaveValue(
      '1',
    );
    expect(
      screen.getByText(new RegExp(items[0].product.price)),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('textbox', { name: /count/i })[1]).toHaveValue(
      '3',
    );
    expect(
      screen.getByText(new RegExp(items[1].product.price * 3)),
    ).toBeInTheDocument();
    await user.click(screen.getAllByLabelText(/decrement/i)[1]);
    await user.click(screen.getAllByLabelText(/decrement/i)[1]);
    const countInput = screen.getAllByRole('textbox', {
      name: /count/i,
    })[0];
    await user.type(countInput, '0', {
      initialSelectionStart: 0,
      initialSelectionEnd: countInput.value.length,
    });
    await user.click(screen.getAllByLabelText(/decrement/i)[0]);
    expect(screen.queryAllByRole('textbox', { name: /count/i })).toHaveLength(
      0,
    );
    expect(screen.queryAllByLabelText(/increment/i)).toHaveLength(0);
    expect(screen.queryAllByLabelText(/decrement/i)).toHaveLength(0);
  });

  it('disables the checkout button on click', async () => {
    const user = userEvent.setup();
    render(<RoutedApp />);
    await user.click(screen.getByRole('button', { name: SIGNIN_BTN_CONTENT }));
    const addBtns = await screen.findAllByRole('button', {
      name: /add to cart/i,
    });
    for (const btn of addBtns) await user.click(btn);
    await user.click(screen.getByRole('link', { name: /cart/i }));
    expect(screen.queryAllByLabelText(/increment/i)).toHaveLength(items.length);
    await user.click(screen.getByRole('button', { name: /checkout/i }));
    expect(screen.getByRole('button', { name: /checkout/i })).toBeDisabled();
  });
});

describe('App Wishlist', () => {
  it('gets updated correctly', async () => {
    const user = userEvent.setup();
    render(<RoutedApp />);
    await user.click(screen.getByRole('button', { name: SIGNIN_BTN_CONTENT }));
    await user.click(
      screen.getAllByRole('checkbox', { name: /add to wishlist/i })[0],
    );
    await user.click(screen.getByRole('link', { name: 'Wishlist' }));
    expect(
      screen.getByRole('checkbox', { name: /add to wishlist/i }),
    ).toBeChecked();
    expect(
      screen.getByText(new RegExp(items[0].product.title)),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole('checkbox', { name: /add to wishlist/i }),
    );
    expect(
      screen.queryByRole('checkbox', { name: /add to wishlist/i }),
    ).toBeNull();
    expect(screen.queryByText(new RegExp(items[0].product.title))).toBeNull();
  });
});

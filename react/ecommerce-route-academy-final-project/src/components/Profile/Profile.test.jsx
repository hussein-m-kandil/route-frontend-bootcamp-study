import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { SIGNOUT_PATH } from '../../App';
import Profile from './Profile';

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

const PUBLIC_CONTENT = 'Public Content';

function RoutedProfile() {
  const routerOptions = { initialEntries: ['/private'], initialIndex: 0 };
  return (
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: '/',
            element: <Outlet context={{ authData: AUTH_DATA }} />,
            children: [
              { index: true, element: <div>{PUBLIC_CONTENT}</div> },
              { path: routerOptions.initialEntries[0], element: <Profile /> },
            ],
          },
        ],
        routerOptions,
      )}
    />
  );
}

afterEach(() => vi.resetAllMocks());

describe('Profile', () => {
  it('has user data', () => {
    render(<RoutedProfile />);
    expect(
      screen.getByText(new RegExp(AUTH_DATA.user.name)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(AUTH_DATA.user.email)),
    ).toBeInTheDocument();
  });

  it('has user name in the page title', () => {
    render(<RoutedProfile />);
    expect(document.title).toMatch(new RegExp(AUTH_DATA.user.name));
  });

  it('has sign out link', () => {
    render(<RoutedProfile />);
    const signoutLink = screen.getByRole('link', { name: /sign out/i });
    expect(signoutLink).toBeInTheDocument();
    expect(signoutLink.href).toMatch(new RegExp(`${SIGNOUT_PATH}$`));
  });
});

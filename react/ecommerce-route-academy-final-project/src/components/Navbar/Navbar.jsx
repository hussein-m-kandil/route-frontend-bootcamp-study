import { Link, NavLink } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  HOME_PATH,
  CART_PATH,
  SIGNIN_PATH,
  WISHLIST_PATH,
  PROFILE_PATH,
  CATEGORIES_PATH,
  USER_ORDERS_PATH,
} from '../../App';
import {
  BsCircleFill,
  BsHeartFill,
  BsCart4 as ShoppingCart,
} from 'react-icons/bs';
import { FaShippingFast } from 'react-icons/fa';

function Navbar({
  authData = null,
  cartLength = 0,
  ordersCount = 0,
  wishlistLength = 0,
}) {
  const navRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    const preventNavbarOverlapping = () => {
      const nav = navRef.current;
      const div = divRef.current;
      if (nav && div) {
        div.style.paddingTop = getComputedStyle(nav).height;
      }
    };
    preventNavbarOverlapping();
    window.addEventListener('resize', preventNavbarOverlapping);
    return () => window.removeEventListener('resize', preventNavbarOverlapping);
  }, []);

  const generateNavLinkClassName = () => {
    const common = `text-2xl text-app-main relative flex flex-col justify-center active:scale-95`;
    return ({ isActive }) => `${isActive ? common : common + ' opacity-60'}`;
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-30 inset-x-0 top-0 bg-app-light p-4 shadow-sm"
      >
        <div className="container mx-auto items-center flex flex-wrap gap-2">
          <h1 className="font-bold max-[350px]:mx-auto text-xl tracking-tighter">
            <Link to={HOME_PATH}>
              <img src="/favicon.svg" alt="Cart icon" className="inline" />
              {import.meta.env.VITE_APP_NAME || 'App Name'}
            </Link>
          </h1>
          <ul className="ms-auto max-[350px]:mx-auto items-center gap-1 sm:gap-2 text-center text-xs flex">
            {authData ? (
              <>
                <li>
                  <NavLink
                    to={PROFILE_PATH}
                    aria-label="Profile"
                    title={authData.user.name}
                    className={generateNavLinkClassName()}
                  >
                    <BsCircleFill />
                    <span className="text-white text-lg absolute top-1/2 left-1/2 -translate-1/2">
                      {authData.user.name[0].toUpperCase()}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={USER_ORDERS_PATH}
                    aria-label="Orders"
                    className={generateNavLinkClassName()}
                  >
                    <FaShippingFast />
                    {ordersCount > 0 && <CountBadge count={ordersCount} />}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={CATEGORIES_PATH}
                    aria-label="Categories"
                    className={generateNavLinkClassName()}
                  >
                    <BiCategory />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={WISHLIST_PATH}
                    aria-label="Wishlist"
                    className={generateNavLinkClassName()}
                  >
                    <BsHeartFill />
                    {wishlistLength > 0 && (
                      <CountBadge count={wishlistLength} contained={true} />
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={CART_PATH}
                    aria-label="Cart"
                    className={generateNavLinkClassName()}
                  >
                    <ShoppingCart />
                    {cartLength > 0 && <CountBadge count={cartLength} />}
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to={SIGNIN_PATH}
                  title="Sign in"
                  aria-label="Sign in"
                  className={generateNavLinkClassName()}
                >
                  <BsCircleFill />
                  <span className="text-white text-lg absolute top-1/2 left-1/2 -translate-1/2">
                    ?
                  </span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="nav-div" ref={divRef}></div>
    </>
  );
}

Navbar.propTypes = {
  authData: PropTypes.object,
  wishlistLength: PropTypes.number,
  ordersCount: PropTypes.number,
  cartLength: PropTypes.number,
};

export default Navbar;

function CountBadge({ count, contained = false }) {
  const limitedCount = count > 99 ? '+99' : count.toFixed(0);

  return contained ? (
    <span className="text-white text-[0.5rem] font-semibold absolute top-1/2 left-1/2 -translate-1/2">
      {limitedCount}
    </span>
  ) : (
    <span className="text-white font-semibold text-[0.5rem] w-[1.1rem] py-[0.2rem] rounded-full bg-red-700 absolute -top-1/3 -right-1/6">
      {limitedCount}
    </span>
  );
}

CountBadge.propTypes = {
  count: PropTypes.number.isRequired,
  contained: PropTypes.bool,
};

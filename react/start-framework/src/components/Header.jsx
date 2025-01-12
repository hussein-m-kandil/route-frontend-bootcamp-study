import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [expanded, setExpanded] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      const collapseOnClickOutside = (e) => {
        if (expanded && nav && e.target !== nav && !nav.contains(e.target)) {
          setExpanded(false);
        }
      };
      document.addEventListener('click', collapseOnClickOutside);
      return () => {
        document.removeEventListener('click', collapseOnClickOutside);
      };
    }
  }, [expanded]);

  const closeNavMenuOnLinkClick = (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      setExpanded(false);
    }
  };

  const linkClasses = 'fw-bold text-uppercase text-white';

  const genNavLinkClassName = ({ isActive }) => {
    return `${linkClasses} m-2 ms-0 p-2 ${
      isActive ? 'btn btn-success' : 'nav-link'
    }`;
  };

  return (
    <header>
      <nav
        ref={navRef}
        className="navbar navbar-dark navbar-expand-lg fixed-top bg-primary py-4 px-1"
      >
        <div className="container">
          <h1 className="m-0">
            <NavLink
              className={`navbar-brand fs-2 ${linkClasses}`}
              to=""
              onClick={closeNavMenuOnLinkClick}
            >
              Start Framework
            </NavLink>
          </h1>
          <button
            className={`navbar-toggler${expanded ? '' : ' collapsed'}`}
            type="button"
            aria-controls="navItems"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse${expanded ? ' show' : ''}`}
            id="navItems"
          >
            <ul
              className="navbar-nav align-items-start ms-auto mb-2 mt-3 my-lg-0"
              onClick={closeNavMenuOnLinkClick}
            >
              <li className="nav-item">
                <NavLink className={genNavLinkClassName} to="about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={genNavLinkClassName} to="portfolio">
                  Portfolio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={genNavLinkClassName} to="contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

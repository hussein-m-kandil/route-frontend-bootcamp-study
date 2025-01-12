import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useMatch } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    const navbar = document.querySelector('.navbar');
    if (main && navbar) {
      main.style.paddingTop = `${navbar.clientHeight}px`;
    }
  }, []);

  const patternDefaults = { caseSensitive: false, end: true };
  const homePathMatch = useMatch({ path: '', ...patternDefaults });
  const aboutPathMatch = useMatch({ path: 'about', ...patternDefaults });

  let textColorClass = 'text-primary';
  let mainBgClass = 'bg-white';

  if (homePathMatch || aboutPathMatch) {
    textColorClass = 'text-white';
    mainBgClass = 'bg-success';
  }

  return (
    <>
      <Header />
      <main
        className={`min-vh-100 d-flex flex-column justify-content-center ${mainBgClass}`}
        style={{ paddingTop: '6.5rem' }}
        ref={mainRef}
      >
        <div className={`container py-4 text-center ${textColorClass}`}>
          <Outlet context={{ textColorClass }} />
        </div>
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default App;

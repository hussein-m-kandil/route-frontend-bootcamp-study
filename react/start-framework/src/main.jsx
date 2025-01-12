import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '../../../common-dependencies/css/font-awesome-all.min.css';
import '../../../common-dependencies/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Portfolio from './components/Portfolio.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        // Catch errors may occur in any of the child routes
        errorElement: <ErrorPage />,
        children: [
          { path: 'about', element: <About /> },
          { path: 'contact', element: <Contact /> },
          { path: 'portfolio', element: <Portfolio /> },
        ],
      },
      // Catch any not found route
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

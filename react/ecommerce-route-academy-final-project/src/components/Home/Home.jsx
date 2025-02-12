import { useEffect, useState } from 'react';
import { getAllProducts, getCategory } from '../../services/shop';
import { cacheData, getCachedData } from '../../utils/caching';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import PageHeadline from '../PageHeadline/PageHeadline';
import ProductCard from '../ProductCard/ProductCard';
import capitalize from '../../utils/capitalize';
import Products from '../Products/Products';
import PageTitle from '../../PageTitle';
import Loader from '../../Loader';

const mapProductsToCartItems = (products, cart) => {
  return products.map((product) => {
    const i = cart.findIndex((item) => item.product.id === product.id);
    const count = i > -1 ? cart[i].count : 0;
    return { product, count };
  });
};

function Home() {
  const [items, setItems] = useState(null);
  const { cart } = useOutletContext();
  const { category, categoryId, productId } = useParams();

  const capitalizedCategory = capitalize(category || '');

  const cachingKey = `${category ? category.replace(/[^\w]/g, '_') : 'all_categories'}_products`;

  useEffect(() => {
    const cachingLifeTime = 60 * 60 * 1000;
    const cachedProducts = getCachedData(cachingKey, cachingLifeTime);
    if (cachedProducts) {
      setItems(mapProductsToCartItems(cachedProducts, cart));
    } else {
      let unmounted = false;
      (categoryId ? getCategory(categoryId) : getAllProducts())
        .then(({ data, error }) => {
          if (!unmounted) {
            if (data) {
              cacheData(cachingKey, data);
              setItems(mapProductsToCartItems(data, cart));
            } else throw error;
          }
        })
        .catch((error) => {
          console.log(error);
          setItems([]);
        });
      return () => (unmounted = true);
    }
  }, [cart, categoryId, cachingKey]);

  if (productId) {
    if (!items) return <Loader />;
    const item = items?.find(({ product }) => product.id === productId);
    return item ? (
      <>
        <PageTitle pageTitle={item.product.title} />
        <PageHeadline>
          {item.product.title}
          <br />
          <span className="text-app-main text-sm text-center font-light">
            {item.product.category.name}
          </span>
        </PageHeadline>
        <ProductCard item={item} inDetails={true} />
      </>
    ) : (
      <Navigate to="/" replace={true} />
    );
  }

  return (
    <>
      <PageTitle pageTitle={capitalizedCategory || 'Home'} />
      <PageHeadline>{capitalizedCategory || 'All Categories'}</PageHeadline>
      {!items ? (
        <Loader />
      ) : items.length < 1 ? (
        <p className="text-center">
          Sorry, there are no products! Please visit us later.
        </p>
      ) : (
        <Products items={items} />
      )}
    </>
  );
}

export default Home;

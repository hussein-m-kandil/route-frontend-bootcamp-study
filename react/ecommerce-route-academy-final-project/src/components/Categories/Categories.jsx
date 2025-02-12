import { Link } from 'react-router-dom';
import { CATEGORY_PATH } from '../../App';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/shop';
import { cacheData, getCachedData } from '../../utils/caching';
import PageHeadline from '../PageHeadline/PageHeadline';
import Loader from '../../Loader';

function Categories() {
  const [categories, setCategories] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const cachingKey = 'categories';
    const cachingLifeTime = 24 * 60 * 60 * 1000;
    const cachedCategories = getCachedData(cachingKey, cachingLifeTime);
    if (cachedCategories) {
      setErrorMessage(null);
      setCategories(cachedCategories);
    } else {
      let unmounted = false;
      getAllCategories()
        .then(({ data }) => {
          if (!unmounted) {
            setErrorMessage(null);
            setCategories(data || []);
            cacheData(cachingKey, data);
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage('Failed to get any products!');
        });
      return () => (unmounted = true);
    }
  }, []);

  return (
    <>
      <PageHeadline>Categories</PageHeadline>
      {errorMessage ? (
        <p className="text-center">{errorMessage}</p>
      ) : categories ? (
        categories.length ? (
          <ul className="max-w-2xl mx-auto p-4 flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
            {categories.map(({ name: category, _id }) => (
              <li key={category} className="text-center font-bold">
                <Link
                  to={`${CATEGORY_PATH}/${category}/${_id}`}
                  className="inline-block w-full p-4 rounded-xl bg-app-main text-white active:scale-95"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">There are no categories!</p>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Categories;

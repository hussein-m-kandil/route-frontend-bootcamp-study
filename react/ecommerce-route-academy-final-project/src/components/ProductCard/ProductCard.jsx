import {
  BsStar,
  BsStarHalf,
  BsStarFill,
  BsHeartFill,
  BsHeart,
} from 'react-icons/bs';
import { Link, useMatch, useOutletContext } from 'react-router-dom';
import { PRODUCT_DETAILS_PATH, USER_ORDERS_PATH } from '../../App';
import { BiMinus, BiPlus } from 'react-icons/bi';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

function ProductCard({ item, inDetails = false }) {
  const { updating, updateCart, wishlist, updateWishlist } = useOutletContext();
  const userOrdersPathMatch = useMatch(USER_ORDERS_PATH);

  const { product, count } = item;

  const disabled = updating;

  const rate = product.ratingsAverage;

  const commonBtnProps = { type: 'button', disabled };

  const inWishlist = Boolean(
    wishlist.find((wishItem) => wishItem.product.id === product.id),
  );

  const updateCount = (updatedCount) => {
    if (updatedCount >= 0 && updatedCount <= Number.MAX_SAFE_INTEGER) {
      updateCart(product, updatedCount);
    }
  };

  const incrementCount = () => updateCount(count + 1);
  const decrementCount = () => updateCount(count - 1);

  const handleCountChange = (e) => {
    if (/\d+/.test(e.target.value)) {
      updateCount(parseInt(e.target.value));
    }
  };

  return (
    <div
      className={
        inDetails
          ? `max-w-3xl mx-auto px-4${disabled ? ' opacity-50' : ''}`
          : `w-full sm:w-1/2 md:w-1/4 xl:w-1/6 p-2${disabled ? ' opacity-50' : ''}`
      }
      title={product.title}
    >
      <div className="bg-app-light rounded-2xl shadow-md overflow-hidden">
        {inDetails ? (
          <Swiper
            loop={true}
            slidesPerView={1}
            navigation={{ enabled: !disabled }}
            modules={[Navigation, Pagination]}
            pagination={{ dynamicBullets: true, clickable: true }}
          >
            {product.images.map((src) => (
              <SwiperSlide key={src}>
                <img
                  src={src}
                  alt={product.title}
                  className="max-h-[50vh] mx-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : disabled ? (
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-64 sm:h-48 md:h-32 min-w-full object-cover object-center"
          />
        ) : (
          <Link to={`${PRODUCT_DETAILS_PATH}/${product.id}`}>
            <img
              src={product.imageCover}
              alt={product.title}
              className="h-64 sm:h-48 md:h-32 min-w-full object-cover object-center"
            />
          </Link>
        )}
        <div className="p-2 pb-4 text-xs">
          {inDetails ? (
            <p className="opacity-75 font-light my-2">{product.description}</p>
          ) : (
            <div className="mb-2">
              <h3 className="font-bold line-clamp-1 text-sm">
                {disabled ? (
                  product.title
                ) : (
                  <Link to={`${PRODUCT_DETAILS_PATH}/${product.id}`}>
                    {product.title}
                  </Link>
                )}
              </h3>
              <p className="text-app-main font-light text-[0.7rem] text-center">
                {product.category.name}
              </p>
            </div>
          )}
          <div className="flex flex-wrap">
            <span className="flex gap-1">
              <span className="text-app-rating">
                {(rate >= 4 && <BsStarFill />) ||
                  (rate >= 2 && <BsStarHalf />) || <BsStar />}
              </span>
              <span className="font-light">{rate}</span>
            </span>
            <span className="ms-auto font-semibold">
              {(product.price * (count || 1)).toFixed(2)} EGP
            </span>
          </div>
          {!userOrdersPathMatch && (
            <div className="max-w-3xs mx-auto mt-2 font-semibold flex gap-2 justify-between *:grow">
              <label className="w-[2rem] max-w-[2rem] h-[2rem] text-[1.8rem] overflow-hidden relative">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={inWishlist}
                  className="appearance-none"
                  aria-label="Add to wishlist"
                  id={`add-to-wishlist-${product.id}`}
                  onChange={() => updateWishlist(item)}
                />
                <span className="absolute top-1/2 left-1/2 -translate-1/2 opacity-70 text-red-700">
                  {inWishlist ? <BsHeartFill /> : <BsHeart />}
                </span>
              </label>
              {count < 1 ? (
                <Button {...commonBtnProps} onClick={() => updateCount(1)}>
                  Add to Cart
                </Button>
              ) : (
                <>
                  <Button
                    {...commonBtnProps}
                    aria-label="decrement"
                    onClick={decrementCount}
                  >
                    <BiMinus className="stroke-2 inline" />
                  </Button>
                  <input
                    type="text"
                    value={count}
                    disabled={disabled}
                    aria-label="count"
                    id={`count-${product.id}`}
                    onChange={handleCountChange}
                    className="w-8 text-center focus:outline-1 outline-gray-400 border-1 border-gray-300 rounded-lg"
                  />
                  <Button
                    {...commonBtnProps}
                    aria-label="increment"
                    onClick={incrementCount}
                  >
                    <BiPlus className="stroke-2 inline" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const ProductType = PropTypes.shape({
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  ratingsAverage: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageCover: PropTypes.string.isRequired,
}).isRequired;

export const ItemType = PropTypes.shape({
  product: ProductType,
  count: PropTypes.number,
});

ProductCard.propTypes = { item: ItemType, inDetails: PropTypes.bool };

export default ProductCard;

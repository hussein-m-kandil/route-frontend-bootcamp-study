import { USER_ORDERS_PATH } from '../../App';
import { capitalize } from '../../utils/capitalize';
import { useMatch, useOutletContext } from 'react-router-dom';
import PageHeadline from '../PageHeadline/PageHeadline';
import ComboInput from '../ComboInput/ComboInput';
import Products from '../Products/Products';
import Button from '../Button/Button';

function Cart() {
  const { cart, orders, checkout, updating } = useOutletContext();
  const userOrdersPathMatch = useMatch(USER_ORDERS_PATH);

  if (userOrdersPathMatch) {
    return orders.length ? (
      orders
        .map((o, i) => (
          <div key={o._id}>
            <PageHeadline>Order #{i + 1}</PageHeadline>
            <div className="text-center my-2">
              <p className="text-sm">
                The total cost is{' '}
                <span className="font-semibold">{o.totalOrderPrice} EGP, </span>
                {o.isPaid ? `Paid via ${o.paymentMethodType}` : 'Not Paid'}
                {`, and ${o.isDelivered ? 'Delivered' : 'Not Delivered'}`}
              </p>
              <p className="text-gray-700 text-xs font-light">
                (including {o.taxPrice} tax and {o.shippingPrice} shipping)
              </p>
            </div>
            <Products items={o.cartItems} />
            {i > 0 && (
              <div className="h-0.25 w-1/2 mx-auto my-8 border-b-1 border-gray-300"></div>
            )}
          </div>
        ))
        .reverse()
    ) : (
      <p className="text-center">You do not have any orders!</p>
    );
  }

  const totalCost = cart
    .reduce((total, { product, count }) => {
      return total + product.price * count;
    }, 0)
    .toFixed(2);

  const itemsCount = cart.reduce((sum, { count }) => sum + count, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    checkout(Object.fromEntries(new FormData(e.target)));
  };

  return (
    <>
      <PageHeadline>
        {updating ? (
          <span className="opacity-50">
            Your Cart Has{` ${itemsCount} Item${itemsCount === 1 ? '' : 's'}`}
          </span>
        ) : (
          `Your Cart Has ${itemsCount} Item${itemsCount === 1 ? '' : 's'}`
        )}
      </PageHeadline>
      {cart.length > 0 && (
        <>
          <form
            onSubmit={handleCheckout}
            className="mb-8 px-4 max-w-lg mx-auto space-y-1 text-sm"
          >
            {['phone', 'city', 'details'].map((id) => (
              <ComboInput
                id={id}
                key={id}
                name={id}
                autoComplete="on"
                disabled={updating}
                className="text-xs"
                label={capitalize(id)}
              />
            ))}
            <div>
              <Button
                type="submit"
                disabled={updating}
                className="font-semibold text-sm block mt-2 mx-auto"
              >
                Checkout and Pay
                <span className="font-bold"> {totalCost} EGP</span>
              </Button>
            </div>
          </form>
          <Products items={cart} />
        </>
      )}
    </>
  );
}

export default Cart;

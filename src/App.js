import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';
let isInitial = true;
function App() {
	const cartShow = useSelector((state) => state.ui.cartIsVisible);
	const notification = useSelector((state) => state.ui.notification);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (isInitial) {
				isInitial = false;
				return;
			}

			dispatch(sendCartData(cart));
		},
		[ cart, dispatch ]
	);

	return (
		<Fragment>
			{notification && (
				<Notification status={notification.status} title={notification.title} message={notification.message} />
			)}
			<Layout>
				{cartShow && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;

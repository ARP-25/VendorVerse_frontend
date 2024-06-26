import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";
import Entrance from "./views/base/Entrance";
import StoreHeader from "./views/base/StoreHeader";
import StoreFooter from "./views/base/StoreFooter";
import MainWrapper from "./layout/MainWrapper";
import Product from "./views/store/Product";
import ProductDetail from "./views/store/ProductDetail";
import Cart from "./views/store/Cart";
import Checkout from "./views/store/Checkout";
import PaymentSuccess from "./views/store/PaymentSuccess";
import Search from "./views/store/Search";
import { CartContext } from "./views/plugin/Context";
import CartID from "./views/plugin/CartID";
import UserData from "./views/plugin/UserData";
import apiInstance from "./utils/axios";
import Account from "./views/customer/Account";
import PrivateRoute from "./layout/PrivateRoute";
import Orders from "./views/customer/Orders";
import Sidebar from "./views/customer/Sidebar";
import OrderDetail from "./views/customer/OrderDetail";
import Wishlist from "./views/customer/Wishlist";
import CustomerNotification from "./views/customer/CustomerNotification";
import Settings from "./views/customer/Settings";
import Invoice from "./views/customer/Invoice";
import Dashboard from "./views/vendor/Dashboard";
import Products from "./views/vendor/Products";
import VendorOrders from "./views/vendor/VendorOrders";
import VendorOrdersDetail from "./views/vendor/VendorOrdersDetail";
import Earning from "./views/vendor/Earning";
import Reviews from "./views/vendor/Reviews";
import ReviewDetail from "./views/vendor/ReviewDetail";
import Coupon from "./views/vendor/Coupon";
import EditCoupon from "./views/vendor/EditCoupon";
import VendorNotifications from "./views/vendor/VendorNotifications";
import VendorSettings from "./views/vendor/VendorSettings";
import Shop from "./views/vendor/Shop";
import AddProduct from "./views/vendor/AddProduct";
import UpdateProduct from "./views/vendor/UpdateProduct";

function AppContent() {
    const [count, setCount] = useState(0);
    const [cartCount, setCartCount] = useState();
    const [userData, setUserData] = useState(null);
    const location = useLocation(); // useLocation within the router context

    const cart_id = CartID();

    useEffect(() => {
        const data = UserData();
        setUserData(data);
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        if (userData) {
            const url = `/cart-list/${cart_id}/${userData?.user_id}`;
            apiInstance.get(url).then((res) => {
                setCartCount(res.data.length);
            });
        } else {
            const url = `/cart-list/${cart_id}`;
            apiInstance.get(url).then((res) => {
                setCartCount(res.data.length);
            });
        }
    }, [userData, cart_id]); // Runs when userData or cart_id changes

    return (
        <CartContext.Provider value={[cartCount, setCartCount]}>
            <StoreHeader />
            <Routes>
                {/* Main Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/create-new-password" element={<CreatePassword />} />
                {/* Store Routes */}
                <Route path="/" element={<Entrance />} />
                <Route path="/shop" element={<Product />} />
                <Route path="/detail/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout/:order_id" element={<Checkout />} />
                <Route path="/payment-success/:order_oid" element={<PaymentSuccess />} />
                <Route path="/search" element={<Search />} />
                {/* Customer Routes */}
                <Route
                    path="/customer/account/"
                    element={
                        <PrivateRoute>
                            <Account />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customer/orders/"
                    element={
                        <PrivateRoute>
                            <Orders />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customer/orders/:order_oid/"
                    element={
                        <PrivateRoute>
                            <OrderDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customer/wishlist/"
                    element={
                        <PrivateRoute>
                            <Wishlist />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customer/notifications/"
                    element={
                        <PrivateRoute>
                            <CustomerNotification />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customer/settings/"
                    element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customer/invoice/:order_oid/"
                    element={
                        <PrivateRoute>
                            <Invoice />
                        </PrivateRoute>
                    }
                />
                {/* Vendor Routes */}
                <Route
                    path="/vendor/dashboard/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/products/"
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/orders/"
                    element={
                        <PrivateRoute>
                            <VendorOrders />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/orders/:order_oid/"
                    element={
                        <PrivateRoute>
                            <VendorOrdersDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/earning/"
                    element={
                        <PrivateRoute>
                            <Earning />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/reviews/"
                    element={
                        <PrivateRoute>
                            <Reviews />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/reviews/detail/:review_id/"
                    element={
                        <PrivateRoute>
                            <ReviewDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/coupon/"
                    element={
                        <PrivateRoute>
                            <Coupon />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/coupon/:coupon_id/"
                    element={
                        <PrivateRoute>
                            <EditCoupon />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/notifications/"
                    element={
                        <PrivateRoute>
                            <VendorNotifications />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/settings/"
                    element={
                        <PrivateRoute>
                            <VendorSettings />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/settings/:slug/"
                    element={
                        <PrivateRoute>
                            <Shop />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/product/new/"
                    element={
                        <PrivateRoute>
                            <AddProduct />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendor/product/update/:pid/"
                    element={
                        <PrivateRoute>
                            <UpdateProduct />
                        </PrivateRoute>
                    }
                />
            </Routes>
            {/* Conditionally render StoreFooter */}
            {location.pathname !== "/" && <StoreFooter />}
        </CartContext.Provider>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;

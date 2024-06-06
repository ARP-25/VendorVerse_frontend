import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auths";
import { useState, useContext } from "react";
import { CartContext } from "../plugin/Context";
import UserData from "../plugin/UserData";

function StoreHeader() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    const user = useAuthStore((state) => state.user());
    const userDataDecoded = UserData();

    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const navigate = useNavigate();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${search}`);
    };

    const cartCount = useContext(CartContext);
    console.log("user", user);
    console.log("userDataDecoded", userDataDecoded);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* Logo */}
                    <Link className="navbar-brand" to="/">
                        VendorVerse
                    </Link>

                    {/* Hamburger Button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* All Nav Elements */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Pages / Account / Vendor */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Pages */}
                            {/* <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Pages
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Changelog
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Terms & Condition
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Cookie Policy
                                        </a>
                                    </li>
                                </ul>
                            </li> */}

                            {/* Account */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user me-2"></i>
                                    Account
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link to="/customer/account/" className="dropdown-item">
                                            <i className="fas fa-user"></i> Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/customer/orders/">
                                            <i className="fas fa-shopping-cart"></i> Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/customer/wishlist/">
                                            <i className="fas fa-heart"></i> Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/customer/notifications/"
                                        >
                                            <i className="fas fa-bell fa-shake"></i> Notifications
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/customer/settings/">
                                            <i className="fas fa-gear fa-spin"></i> Settings
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Vendor */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-store me-2"></i>
                                    Vendor
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/dashboard/">
                                            <i className="fas fa-tachometer-alt"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/products/">
                                            <i className="fas fa-box"></i> Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/product/new/">
                                            <i className="fas fa-plus-circle"></i> Add Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/orders/">
                                            <i className="fas fa-shopping-cart"></i> Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/earning/">
                                            <i className="fas fa-dollar-sign"></i> Earning
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/reviews/">
                                            <i className="fas fa-star"></i> Reviews
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/coupon/">
                                            <i className="fas fa-tag"></i> Coupon
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/notifications/">
                                            <i className="fas fa-bell fa-shake"></i> Notifications
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vendor/settings/">
                                            <i className="fas fa-gear fa-spin"></i> Settings
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        {/* Search Input and Button */}
                        <form className="d-flex pe-5  w-50" onSubmit={handleSearchSubmit}>
                            <input
                                onChange={handleSearchChange}
                                name="search"
                                className="form-control me-2 min-w-100"
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success me-2" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>

                        {/* Login / Register / Logout / Dashboard / Cart */}
                        {isLoggedIn ? (
                            <>
                                <Link className="btn btn-primary me-2 mt-2 mt-lg-0" to="/logout">
                                    <i className="fas fa-sign-out-alt me-2"></i>
                                    Logout
                                </Link>
                                <Link className="btn btn-primary me-2 mt-2 mt-lg-0" to="/dashboard">
                                    <i className="fas fa-tachometer-alt me-2"></i>
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-primary me-2 mt-2 mt-lg-0" to="/login">
                                    <i className="fas fa-sign-in-alt me-2"></i> Login
                                </Link>
                                <Link className="btn btn-primary me-2 mt-2 mt-lg-0" to="/register">
                                    <i className="fas fa-user-plus me-2"></i> Register
                                </Link>
                            </>
                        )}
                        <Link className="btn btn-danger mt-2 mt-lg-0" to="/cart/">
                            <i className="fas fa-shopping-cart"></i>{" "}
                            <span id="cart-total-items">{cartCount}</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default StoreHeader;

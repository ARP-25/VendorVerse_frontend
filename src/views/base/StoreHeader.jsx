import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auths";
import { CartContext } from "../plugin/Context";
import UserData from "../plugin/UserData";

function StoreHeader() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    const user = useAuthStore((state) => state.user());
    const userDataDecoded = UserData();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const texts = ["Search for a Product", "Search for a Category", "Search for a Description"];
    const [placeholder, setPlaceholder] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    // Script for typing effect
    useEffect(() => {
        if (charIndex < texts[textIndex].length) {
            const typeInterval = setInterval(() => {
                setPlaceholder((prev) => prev + texts[textIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 150);
            return () => clearInterval(typeInterval);
        } else {
            const completeInterval = setTimeout(() => {
                setShowCursor(false);
                setTimeout(() => {
                    setShowCursor(true);
                    setPlaceholder("");
                    setTextIndex((prev) => (prev + 1) % texts.length);
                    setCharIndex(0);
                }, 500);
            }, 2000);
            return () => clearTimeout(completeInterval);
        }
    }, [charIndex, textIndex, texts]);

    // Helper functions for search
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${search}`);
    };

    // CartContext
    const cartCount = useContext(CartContext);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
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
                        <div className="col-lg-4">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/* Logo */}
                                <li>
                                    <Link className="navbar-brand" to="/">
                                        <i className="fas fa-home"></i>
                                    </Link>
                                </li>
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
                                            <Link
                                                className="dropdown-item"
                                                to="/customer/wishlist/"
                                            >
                                                <i className="fas fa-heart"></i> Wishlist
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/customer/notifications/"
                                            >
                                                <i className="fas fa-bell fa-shake"></i>{" "}
                                                Notifications
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/customer/settings/"
                                            >
                                                <i className="fas fa-gear fa-spin"></i> Settings
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                {/* Vendor Dashboard*/}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-tachometer-alt me-2"></i>
                                        Dashboard
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
                                            <Link
                                                className="dropdown-item"
                                                to="/vendor/product/new/"
                                            >
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
                                            <Link
                                                className="dropdown-item"
                                                to="/vendor/notifications/"
                                            >
                                                <i className="fas fa-bell fa-shake"></i>{" "}
                                                Notifications
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
                        </div>

                        {/* Search Input and Button */}
                        <div className="col-lg-4">
                            <form
                                className="d-flex px-lg-4 w-100"
                                style={{ height: 39 }}
                                onSubmit={handleSearchSubmit}
                            >
                                <input
                                    onChange={handleSearchChange}
                                    name="search"
                                    className="form-control me-2 min-w-100 rounded-pill"
                                    type="text"
                                    placeholder={`${placeholder}${showCursor ? "_" : ""}`}
                                    aria-label="Search"
                                />
                                <button className="btn btn-light me-2" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>
                        </div>

                        {/* Login / Register / Logout / Dashboard / Cart */}
                        <div className="col-lg-4 d-flex justify-content-lg-end">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        className="btn btn-warning me-2 mt-2 mt-lg-0"
                                        to="/logout"
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link className="btn btn-light me-2 mt-2 mt-lg-0" to="/login">
                                        <i className="fas fa-sign-in-alt me-2"></i> Login
                                    </Link>
                                    <Link
                                        className="btn btn-success me-2 mt-2 mt-lg-0"
                                        to="/register"
                                    >
                                        <i className="fas fa-user-plus me-2"></i> Register
                                    </Link>
                                </>
                            )}
                            <Link className="btn btn-info mt-2 mt-lg-0" to="/cart/">
                                <i className="fas fa-shopping-cart"></i>{" "}
                                <span id="cart-total-items">{cartCount}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default StoreHeader;

import React, { useState, useEffect, useContext } from "react";
import apiInstance from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import CartID from "../plugin/CartID";
import Swal from "sweetalert2";
import { CartContext } from "../plugin/Context";
import HeroSection from "./Hero";

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Not sure if we need these START
    const [colorValue, setColorValue] = useState("No Color");
    const [sizeValue, setSizeValue] = useState("No Size");
    const [quantityValue, setQuantityValue] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState({});
    // Not sure if we need these END

    const [selectedQuantity, setSelectedQuantity] = useState({});
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});

    const [cartCount, setCartCount] = useContext(CartContext);

    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    useEffect(() => {
        apiInstance.get("/products").then((response) => {
            setProducts(response.data);
            setIsLoadingProducts(false); // Ladezustand hier setzen
        });
    }, []);

    useEffect(() => {
        apiInstance.get("/category").then((response) => {
            setCategories(response.data);
            setIsLoadingCategories(false); // Ladezustand hier setzen
        });
    }, []);

    const handleColorButtonClick = (event, product_id, color_name) => {
        setSelectedColors((prevSelectedColors) => ({
            ...prevSelectedColors,
            [product_id]: color_name,
        }));
    };

    const handleSizeButtonClick = (event, product_id, size_name) => {
        setSelectedSizes((prevSelectedSize) => ({
            ...prevSelectedSize,
            [product_id]: size_name,
        }));
    };

    const handleQuantityChange = (event, product_id) => {
        const newQuantity = event.target.value;
        setSelectedQuantity((prevSelectedQuantity) => ({
            ...prevSelectedQuantity,
            [product_id]: newQuantity,
        }));
    };

    const currentAddress = GetCurrentAddress();
    const userData = UserData();
    const cart_id = CartID();
    const navigate = useNavigate();

    const handleAddToCart = async (product_id, price, shipping_amount) => {
        const formData = new FormData();
        formData.append("product_id", product_id);
        formData.append("shipping_amount", shipping_amount);
        formData.append("price", price);
        formData.append("user_id", userData?.user_id);
        formData.append("country", currentAddress.country);
        formData.append("cart_id", cart_id);
        formData.append("qty", selectedQuantity[product_id] || 1);
        formData.append("size", selectedSizes[product_id] || "No Size");
        formData.append("color", selectedColors[product_id] || "No Color");

        // Send a POST request to add product to cart
        const response = await apiInstance.post(`cart-view/`, formData);

        // Fetch updated cart items
        const url = userData
            ? `/cart-list/${cart_id}/${userData?.user_id}`
            : `/cart-list/${cart_id}`;
        apiInstance.get(url).then((res) => {
            setCartCount(res.data.length);
        });

        Toast.fire({
            icon: "success",
            title: response.data.message,
        });
    };

    const addToWishlist = async (productId, userId) => {
        try {
            if (!userId) {
                Toast.fire({
                    icon: "info",
                    title: "You need to login first",
                });
                return;
            } else {
                const formdata = new FormData();
                formdata.append("product_id", productId);
                formdata.append("user_id", userId);
                const response = await apiInstance.post(`customer/wishlist/${userId}/`, formdata);
                Toast.fire({
                    icon: "success",
                    title: response.data.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filterCategory = (category) => {
        const tmpCategory = category;
        console.log("Category Clicked");
        console.log(tmpCategory);

        navigate(`/search?query=${tmpCategory}`);
    };

    return (
        <>
            <div>
                {/*Main layout*/}
                <main className="">
                    {/* <section>
                        <div className="">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1681487933632-c9eda34fcaf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt=""
                                className="w-100"
                                style={{ height: "50vh", objectFit: "cover" }}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="slogan-container"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: "white",
                                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                                    textAlign: "center",
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Shop Everything, Sell Anything - Discover Your Marketplace at
                                VendorVerse!
                            </motion.div>
                        </div>
                    </section> */}
                    <HeroSection />
                    <div className="container mt-4">
                        <section className="text-center">
                            {/* Categories START*/}
                            {isLoadingCategories && (
                                <h5 className="mt-5 text-center text-info">
                                    Loading Categories...{" "}
                                    <i className="fas fa-spinner fa-spin loading-icon"></i>
                                </h5>
                            )}
                            {!isLoadingCategories && (
                                <div className="row mb-4">
                                    {categories?.map((c, index) => (
                                        <div
                                            key={c.id}
                                            className="category col-6 col-md-4 col-lg-2 pt-2"
                                            onClick={() => filterCategory(c.title)}
                                            style={{ position: "relative", overflow: "hidden" }} // Ensure the parent div has relative positioning and hidden overflow
                                        >
                                            <img
                                                src={c.image}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                                alt=""
                                            />
                                            <h6 style={{ zIndex: 1 }}>{c.title}</h6>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Products START */}
                            {isLoadingProducts && (
                                <h5 className="mt-5 text-center text-info">
                                    Loading Products...{" "}
                                    <i className="fas fa-spinner fa-spin loading-icon"></i>
                                </h5>
                            )}
                            {!isLoadingProducts && (
                                <div className="row">
                                    {products?.map((p, index) => (
                                        <div key={p.id} className="col-xl-4  col-md-6  col-12 mb-4">
                                            <div className="card" style={{ borderRadius: "2rem" }}>
                                                <div
                                                    className="bg-image hover-zoom ripple"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    <Link to={`/detail/${p.slug}`}>
                                                        <img
                                                            src={p.image}
                                                            className="w-100 p-2"
                                                            style={{
                                                                width: "100%",
                                                                height: "30vh",
                                                                objectFit: "cover",
                                                                borderRadius: "2rem",
                                                            }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <Link
                                                        to={`/detail/${p.slug}`}
                                                        className="text-reset"
                                                    >
                                                        <h5 className="card-title mb-3">
                                                            {p.title}
                                                        </h5>
                                                    </Link>

                                                    <Link to={`/detail/${p.slug}`}>
                                                        <p>{p.category?.title}</p>
                                                    </Link>
                                                    <div className="d-flex justify-content-center">
                                                        <h6 className="mb-3">${p.price}</h6>
                                                        <h6 className="mb-3 text-muted ms-2">
                                                            <strike>${p.old_price}</strike>
                                                        </h6>
                                                    </div>

                                                    {/* Variation and Heart START */}
                                                    <div className="btn-group">
                                                        <button
                                                            className="btn btn-primary dropdown-toggle"
                                                            type="button"
                                                            id="dropdownMenuClickable"
                                                            data-bs-toggle="dropdown"
                                                            data-bs-auto-close="false"
                                                            aria-expanded="false"
                                                        >
                                                            Variation
                                                        </button>
                                                        <ul
                                                            className="dropdown-menu"
                                                            aria-labelledby="dropdownMenuClickable"
                                                        >
                                                            {/*  Product Quantity START */}
                                                            <div className="d-flex flex-column">
                                                                <li className="p-1">
                                                                    <b className="pe-1">
                                                                        Quantity:
                                                                    </b>
                                                                    {}
                                                                </li>
                                                                <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                    <li key={index}>
                                                                        <input
                                                                            className="form-control"
                                                                            type="number"
                                                                            min="1"
                                                                            value={
                                                                                selectedQuantity[
                                                                                    p.id
                                                                                ] || 1
                                                                            } // This ensures the input displays the current quantity from the state
                                                                            onChange={(e) =>
                                                                                handleQuantityChange(
                                                                                    e,
                                                                                    p.id
                                                                                )
                                                                            }
                                                                        />
                                                                    </li>
                                                                </div>
                                                            </div>
                                                            {/*  Product Quantity END */}

                                                            {/* Product Sizes START */}
                                                            {p.size?.length > 0 && (
                                                                <div className="d-flex flex-column">
                                                                    <li className="p-1">
                                                                        <b className="pe-1">
                                                                            Size:
                                                                        </b>
                                                                        {selectedSizes[p.id] ||
                                                                            "No Size"}
                                                                    </li>
                                                                    <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                        {p.size?.map(
                                                                            (size, index) => (
                                                                                <li key={index}>
                                                                                    <button
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleSizeButtonClick(
                                                                                                e,
                                                                                                p.id,
                                                                                                size.name
                                                                                            )
                                                                                        }
                                                                                        className="btn btn-secondary btn-sm me-2 mb-1"
                                                                                    >
                                                                                        {size.name}
                                                                                    </button>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {/* Product Sizes END */}

                                                            {/* Product Colors START */}
                                                            {p.color?.length > 0 && (
                                                                <div className="mt-3">
                                                                    <li className="p-1">
                                                                        <b className="pe-1">
                                                                            Color:
                                                                        </b>
                                                                        {selectedColors[p.id] ||
                                                                            "No Color"}
                                                                    </li>
                                                                    <ul className="list-unstyled d-flex flex-wrap">
                                                                        {p.color?.map(
                                                                            (color, index) => (
                                                                                <li
                                                                                    key={index}
                                                                                    className="p-1"
                                                                                >
                                                                                    <button
                                                                                        className="btn btn-sm me-2 mb-1 p-3"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                color.color_code,
                                                                                        }}
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleColorButtonClick(
                                                                                                e,
                                                                                                p.id,
                                                                                                color.name
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            {/* Product Colors END */}

                                                            {/* Add to Cart / Wishlist Btn Start */}
                                                            <div className="d-flex mt-3 p-1">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-primary me-1 mb-1"
                                                                    onClick={() =>
                                                                        handleAddToCart(
                                                                            p.id,
                                                                            p.price,
                                                                            p.shipping_amount
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-shopping-cart" />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger px-3 me-1 mb-1 ms-2"
                                                                    onClick={() =>
                                                                        addToWishlist(
                                                                            p.id,
                                                                            userData?.user_id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-heart" />
                                                                </button>
                                                            </div>
                                                        </ul>
                                                        <span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger px-3 me-1 ms-2"
                                                                onClick={() =>
                                                                    addToWishlist(
                                                                        p.id,
                                                                        userData?.user_id
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-heart" />
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </main>

                {/*Main layout*/}
                {!isLoadingProducts && (
                    <main>
                        <section className="text-center container">
                            <div className="row mt-5 mb-4">
                                <div className="col-lg-6 col-md-8 mx-auto">
                                    <h1 className="fw-light">Trending Products</h1>
                                    <p className="lead text-muted">
                                        Check out most trending products in our store
                                    </p>
                                </div>
                            </div>
                            <div className="row d-flex  justify-content-center mb-5">
                                {products
                                    ?.filter((_, index) => index % 5 === 0)
                                    .map((p, index) => (
                                        <div key={p.id} className="col-xl-4  col-md-6  col-12 mb-4">
                                            <div className="card" style={{ borderRadius: "2rem" }}>
                                                <div
                                                    className="bg-image hover-zoom ripple"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    <Link to={`/detail/${p.slug}`}>
                                                        <img
                                                            src={p.image}
                                                            className="w-100 p-2"
                                                            style={{
                                                                width: "100%",
                                                                height: "30vh",
                                                                objectFit: "cover",
                                                                overflow: "hidden",
                                                                borderRadius: "2rem",
                                                            }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <Link
                                                        to={`/detail/${p.slug}`}
                                                        className="text-reset"
                                                    >
                                                        <h5 className="card-title mb-3">
                                                            {p.title}
                                                        </h5>
                                                    </Link>

                                                    <Link to={`/detail/${p.slug}`}>
                                                        <p>{p.category?.title}</p>
                                                    </Link>
                                                    <div className="d-flex justify-content-center">
                                                        <h6 className="mb-3">${p.price}</h6>
                                                        <h6 className="mb-3 text-muted ms-2">
                                                            <strike>${p.old_price}</strike>
                                                        </h6>
                                                    </div>

                                                    {/* Variation and Heart START */}
                                                    <div className="btn-group">
                                                        <button
                                                            className="btn btn-primary dropdown-toggle"
                                                            type="button"
                                                            id="dropdownMenuClickable"
                                                            data-bs-toggle="dropdown"
                                                            data-bs-auto-close="false"
                                                            aria-expanded="false"
                                                        >
                                                            Variation
                                                        </button>
                                                        <ul
                                                            className="dropdown-menu"
                                                            aria-labelledby="dropdownMenuClickable"
                                                        >
                                                            {/*  Product Quantity START */}
                                                            <div className="d-flex flex-column">
                                                                <li className="p-1">
                                                                    <b className="pe-1">
                                                                        Quantity:
                                                                    </b>
                                                                    {}
                                                                </li>
                                                                <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                    <li key={index}>
                                                                        <input
                                                                            className="form-control"
                                                                            type="number"
                                                                            min="1"
                                                                            value={
                                                                                selectedQuantity[
                                                                                    p.id
                                                                                ] || 1
                                                                            } // This ensures the input displays the current quantity from the state
                                                                            onChange={(e) =>
                                                                                handleQuantityChange(
                                                                                    e,
                                                                                    p.id
                                                                                )
                                                                            }
                                                                        />
                                                                    </li>
                                                                </div>
                                                            </div>
                                                            {/*  Product Quantity END */}

                                                            {/* Product Sizes START */}
                                                            {p.size?.length > 0 && (
                                                                <div className="d-flex flex-column">
                                                                    <li className="p-1">
                                                                        <b className="pe-1">
                                                                            Size:
                                                                        </b>
                                                                        {selectedSizes[p.id] ||
                                                                            "No Size"}
                                                                    </li>
                                                                    <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                        {p.size?.map(
                                                                            (size, index) => (
                                                                                <li key={index}>
                                                                                    <button
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleSizeButtonClick(
                                                                                                e,
                                                                                                p.id,
                                                                                                size.name
                                                                                            )
                                                                                        }
                                                                                        className="btn btn-secondary btn-sm me-2 mb-1"
                                                                                    >
                                                                                        {size.name}
                                                                                    </button>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {/* Product Sizes END */}

                                                            {/* Product Colors START */}
                                                            {p.color?.length > 0 && (
                                                                <div className="mt-3">
                                                                    <li className="p-1">
                                                                        <b className="pe-1">
                                                                            Color:
                                                                        </b>
                                                                        {selectedColors[p.id] ||
                                                                            "No Color"}
                                                                    </li>
                                                                    <ul className="list-unstyled d-flex flex-wrap">
                                                                        {p.color?.map(
                                                                            (color, index) => (
                                                                                <li
                                                                                    key={index}
                                                                                    className="p-1"
                                                                                >
                                                                                    <button
                                                                                        className="btn btn-sm me-2 mb-1 p-3"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                color.color_code,
                                                                                        }}
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleColorButtonClick(
                                                                                                e,
                                                                                                p.id,
                                                                                                color.name
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            {/* Product Colors END */}

                                                            {/* Add to Cart / Wishlist Btn Start */}
                                                            <div className="d-flex mt-3 p-1">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-primary me-1 mb-1"
                                                                    onClick={() =>
                                                                        handleAddToCart(
                                                                            p.id,
                                                                            p.price,
                                                                            p.shipping_amount
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-shopping-cart" />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger px-3 me-1 mb-1 ms-2"
                                                                    onClick={() =>
                                                                        addToWishlist(
                                                                            p.id,
                                                                            userData?.user_id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-heart" />
                                                                </button>
                                                            </div>
                                                            {/* Add to Cart / Wishlist Btn END */}
                                                        </ul>
                                                        <span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger px-3 me-1 ms-2"
                                                                onClick={() =>
                                                                    addToWishlist(
                                                                        p.id,
                                                                        userData?.user_id
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-heart" />
                                                            </button>
                                                        </span>
                                                    </div>
                                                    {/* Variation and Heart END */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </section>
                    </main>
                )}
            </div>
        </>
    );
}

export default Product;

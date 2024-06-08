import React from "react";
import { Link } from "react-router-dom";

function StoreFooter() {
    return (
        <div>
            <footer className="bg-light text-center text-lg-start">
                <div className="container-fluid p-4">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start align-items-center">
                            <strong>Get connected with us on social networks</strong>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                            <Link
                                className="btn btn-primary btn-sm btn-floating me-2"
                                style={{ backgroundColor: "#3b5998", width: "40px" }}
                                to="#!"
                                role="button"
                            >
                                <i className="fab fa-facebook-f" />
                            </Link>
                            <Link
                                className="btn text-white btn-sm btn-floating me-2"
                                style={{ backgroundColor: "#55acee", width: "40px" }}
                                to="#!"
                                role="button"
                            >
                                <i className="fab fa-twitter" />
                            </Link>
                            <Link
                                className="btn text-white btn-sm btn-floating me-2"
                                style={{ backgroundColor: "#c61118", width: "40px" }}
                                to="#!"
                                role="button"
                            >
                                <i className="fab fa-pinterest" />
                            </Link>
                            <Link
                                className="btn text-white btn-sm btn-floating me-2"
                                style={{ backgroundColor: "#ed302f", width: "40px" }}
                                to="#!"
                                role="button"
                            >
                                <i className="fab fa-youtube" />
                            </Link>
                            <Link
                                className="btn text-white btn-sm btn-floating me-2"
                                style={{ backgroundColor: "#ac2bac", width: "40px" }}
                                to="#!"
                                role="button"
                            >
                                <i className="fab fa-instagram" />
                            </Link>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="row">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <p>
                                <strong>About us</strong>
                            </p>
                            <p>
                                Welcome to VendorVerse, your go-to destination for a vibrant and
                                diverse shopping experience. Our platform connects a wide range of
                                vendors, offering everything from the latest fashion trends and
                                cutting-edge electronics to handmade crafts and everyday essentials.
                                At VendorVerse, everyone can buy or sell products, making it the
                                ultimate marketplace for all your needs.
                            </p>
                        </div>
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <p>
                                <strong>Useful links</strong>
                            </p>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link to="#!" className="text-dark">
                                        Privacy policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#!" className="text-dark">
                                        Media
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#!" className="text-dark">
                                        Job offers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#!" className="text-dark">
                                        Cooperation
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <p>
                                <strong>Products</strong>
                            </p>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="/search?query=Books" className="text-dark">
                                        Books
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search?query=Clothing" className="text-dark">
                                        Clothing
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search?query=Electronics" className="text-dark">
                                        Electronics
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search?query=Home Appliances" className="text-dark">
                                        Home Appliances
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search?query=Sports Equipment" className="text-dark">
                                        Sports Equipment
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search?query=Toys" className="text-dark">
                                        Toys
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 mb-4 mb-lg-0">
                            <p>
                                <strong>Support</strong>
                            </p>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="#!" className="text-dark">
                                        Complaints
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#!" className="text-dark">
                                        Help center
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#!" className="text-dark">
                                        Community
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#!" className="text-dark">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2024 Copyright:
                    <Link className="ms-1 text-dark" to="https://mdbootstrap.com/">
                        angeloroccopucci.com
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default StoreFooter;

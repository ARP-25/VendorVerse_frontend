import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Entrance = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 992);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section>
            <div className="row">
                <div
                    className="hero"
                    style={{
                        position: "relative",
                        backgroundImage: 'url("/entrance-min.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "92.65vh", // Adjust the height as needed
                        color: "white", // Assuming you want white text on the hero image
                    }}
                >
                    {isSmallScreen && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 1,
                            }}
                        ></div>
                    )}
                    <div
                        className="offset-lg-6 col-12 col-lg-6 h-100 d-flex flex-column justify-content-center align-center"
                        style={{ position: "relative", padding: "0 8vw", zIndex: 2 }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                background:
                                    "linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
                                zIndex: 1,
                            }}
                        />
                        <motion.h1
                            className="text-center"
                            style={{ zIndex: 2, color: "#fff" }}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Connecting Buyers and Sellers Worldwide
                        </motion.h1>
                        <motion.p
                            className="mt-4 text-center"
                            style={{ zIndex: 2, color: "#fff" }}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Join a global marketplace of buyers and sellers. Discover unique
                            products, sell your own, and enjoy secure payments with Stripe and
                            PayPal.
                        </motion.p>
                        <Link to="/shop" style={{ zIndex: 2 }}>
                            <motion.button
                                className="btn btn-light mt-5"
                                style={{
                                    zIndex: 2,
                                    color: "#000000",
                                    fontWeight: "bold",
                                    width: "100%",
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                Shop
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Entrance;

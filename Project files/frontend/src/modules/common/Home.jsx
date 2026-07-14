import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import p1 from "../../images/p2.jpg";
import p2 from "../../images/p1.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpeg";

import AllPropertiesCards from "../user/AllPropertiesCards";

const Home = () => {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <>

            {/* ================= NAVBAR ================= */}

            <Navbar expand="lg" className="navbar shadow-lg" sticky="top">

                <Container fluid>

                    <Navbar.Brand>

                        <h2
                            style={{
                                color: "white",
                                fontWeight: "700",
                                marginBottom: 0
                            }}
                        >
                            🏠 HomeSphere
                        </h2>

                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />

                    <Navbar.Collapse id="navbarScroll">

                        <Nav className="me-auto"></Nav>

                        <Nav
                            className="align-items-center"
                            style={{
                                gap: "28px"
                            }}
                        >

                            <button
                                onClick={() =>
                                    setTheme(theme === "light" ? "dark" : "light")
                                }
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "24px",
                                    cursor: "pointer"
                                }}
                            >
                                {theme === "light" ? "🌙" : "☀️"}
                            </button>

                            <Link className="nav-link-custom" to="/">
                                Home
                            </Link>

                            <Link className="nav-link-custom" to="/login">
                                Login
                            </Link>

                            <Link className="nav-link-custom" to="/register">
                                Register
                            </Link>

                            <Link className="nav-link-custom" to="/adminlogin">
                                Admin Login
                            </Link>

                        </Nav>

                    </Navbar.Collapse>

                </Container>

            </Navbar>

            {/* ================= HERO SECTION ================= */}

            <div className="home-body">

    <div className="carousel-container">

        <Carousel
            fade
            interval={3000}
            pause={false}
            indicators
            controls
        >

            <Carousel.Item>
                <img className="hero-image" src={p1} alt="" />
            </Carousel.Item>

            <Carousel.Item>
                <img className="hero-image" src={p2} alt="" />
            </Carousel.Item>

            <Carousel.Item>
                <img className="hero-image" src={p3} alt="" />
            </Carousel.Item>

            <Carousel.Item>
                <img className="hero-image" src={p4} alt="" />
            </Carousel.Item>

        </Carousel>

    </div>

</div>

            {/* ================= TITLE ================= */}

            <section className="text-center my-5">

                <h1
                    className="fade-up"
                    style={{
                        fontWeight: "700",
                        color: "#1e3a8a"
                    }}
                >
                    Find Your Dream Home
                </h1>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#666"
                    }}
                >
                    Explore thousands of verified rental homes with just a few clicks.
                </p>

                <Link to="/register">

                    <Button
                        variant="primary"
                        className="mt-2 me-3"
                    >
                        Register as Owner
                    </Button>

                </Link>

                <Link to="/adminlogin">

                    <Button
                        variant="outline-primary"
                        className="mt-2"
                    >
                        Admin Panel Login
                    </Button>

                </Link>

            </section>

            {/* ================= FILTER + PROPERTY SECTION ================= */}

            <Container>

                {/* Your filter section is already inside this component */}
                <AllPropertiesCards />

            </Container>

            {/* ================= FOOTER ================= */}

            <footer className="footer mt-5">

                <Container>

                    <div className="row text-start">

                        <div className="col-md-4 mb-4">

                            <h4>Contact</h4>

                            <p>
                                📧 houserental@gmail.com
                            </p>

                        </div>

                        <div className="col-md-4 mb-4">

                            <h4>Quick Links</h4>

                            <p><Link to="/">Home</Link></p>

                            <p><Link to="/login">Login</Link></p>

                            <p><Link to="/register">Register</Link></p>

                            <p><Link to="/adminlogin">Admin Login</Link></p>

                        </div>

                        <div className="col-md-4 mb-4">

                            <h4>About Us</h4>

                            <p>

                                HomeSphere is a trusted rental platform
                                that connects property owners with
                                buyers and tenants.

                                Our mission is to help users
                                easily find their dream home with
                                verified property listings.

                            </p>

                        </div>

                    </div>

                    <hr />

                    <div className="text-center">

                        © 2026 HomeSphere. All Rights Reserved.

                    </div>

                </Container>

            </footer>

        </>
    );

};

export default Home;
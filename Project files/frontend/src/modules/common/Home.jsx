import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import p1 from "../../images/p1.jpg";
import p2 from "../../images/p2.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";

import AllPropertiesCards from "../user/AllPropertiesCards";

const Home = () => {

   const [index, setIndex] = useState(0);

   const [theme, setTheme] = useState(
      localStorage.getItem("theme") || "light"
   );

   useEffect(() => {
      document.body.className = theme;
      localStorage.setItem("theme", theme);
   }, [theme]);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>

               <Navbar.Brand>
                  <h2>HomeSphere</h2>
               </Navbar.Brand>

               <Navbar.Toggle aria-controls="navbarScroll" />

               <Navbar.Collapse id="navbarScroll">

                  <Nav
                     className="me-auto"
                     navbarScroll
                  ></Nav>

                  <Nav className="align-items-center">

                     <button
                        onClick={() =>
                           setTheme(theme === "light" ? "dark" : "light")
                        }
                        style={{
                           border: "none",
                           background: "transparent",
                           fontSize: "24px",
                           marginRight: "20px",
                           cursor: "pointer"
                        }}
                     >
                        {theme === "light" ? "🌙" : "☀️"}
                     </button>

                     <Link to="/">Home</Link>

                     <Link to="/login">Login</Link>

                     <Link to="/register">Register</Link>

                     <Link to="/adminlogin">Admin Login</Link>

                  </Nav>

               </Navbar.Collapse>

            </Container>
         </Navbar>

         <div className="home-body">

            <Carousel activeIndex={index} onSelect={handleSelect}>

               <Carousel.Item>
                  <img src={p1} alt="1" />
               </Carousel.Item>

               <Carousel.Item>
                  <img src={p2} alt="2" />
               </Carousel.Item>

               <Carousel.Item>
                  <img src={p3} alt="3" />
               </Carousel.Item>

               <Carousel.Item>
                  <img src={p4} alt="4" />
               </Carousel.Item>

            </Carousel>

         </div>

         <div className="property-content">

            <div className="text-center">

               <h1 className="m-1 p-5">
                  All Properties that may you look for
               </h1>

               <p style={{ fontSize: 15, fontWeight: 800 }}>

                  Want to post your Property?

                  <Link to="/register">

                     <Button variant="outline-info">
                        Register as Owner
                     </Button>

                  </Link>

               </p>

               <div style={{ marginTop: "20px" }}>

                  <Link
                     to="/adminlogin"
                     style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        textDecoration: "underline"
                     }}
                  >
                     Admin Panel Login
                  </Link>

               </div>

            </div>

            <Container>

               <AllPropertiesCards />

            </Container>

         </div>

      </>
   );
};

export default Home;
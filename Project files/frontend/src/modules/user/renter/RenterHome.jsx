import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../../../App";

import AllPropertiesCards from "../AllPropertiesCards";
import AllProperty from "./AllProperties";

const RenterHome = () => {

  const { userData, userLoggedIn } = useContext(UserContext);

  const [tab, setTab] = useState("properties");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    console.log("USER CONTEXT:", userData, userLoggedIn);
  }, [userData, userLoggedIn]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!userData) {
    return (
      <div style={{ padding: "2rem" }}>
        <h4>Loading renter dashboard...</h4>
      </div>
    );
  }

  return (
    <div>

      {/* Navbar */}

      <Navbar
        expand="lg"
        className={theme === "dark" ? "navbar-dark bg-dark" : "bg-body-tertiary"}
      >
        <Container fluid>

          <Navbar.Brand>
            <h2 style={{ color: theme === "dark" ? "white" : "black" }}>
              HomeSphere
            </h2>
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

            <Nav className="me-auto"></Nav>

            <Nav className="align-items-center">

              <button
                onClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "24px",
                  cursor: "pointer",
                  marginRight: "20px"
                }}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>

              <h5
                className="mx-3"
                style={{
                  color: theme === "dark" ? "white" : "black",
                  marginBottom: 0
                }}
              >
                Hi {userData.name}
              </h5>

              <Link
                to="/"
                onClick={handleLogOut}
                style={{
                  color: theme === "dark" ? "white" : "black"
                }}
              >
                Log Out
              </Link>

            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* Dashboard */}

      <Container fluid>

        <Row>

          {/* Sidebar */}

          <Col
            md={2}
            style={{
              minHeight: "100vh",
              paddingTop: "1rem",
              background:
                theme === "dark"
                  ? "#1e1e1e"
                  : "#f8f9fa"
            }}
          >

            <Button
              variant={theme === "dark" ? "secondary" : "light"}
              className="w-100 mb-2"
              onClick={() => setTab("properties")}
            >
              All Properties
            </Button>

            <Button
              variant={theme === "dark" ? "secondary" : "light"}
              className="w-100 mb-2"
              onClick={() => setTab("bookings")}
            >
              Booking History
            </Button>

            <Button
              variant={theme === "dark" ? "secondary" : "light"}
              className="w-100 mb-2"
              onClick={() => setTab("transactions")}
            >
              Transactions
            </Button>

          </Col>

          {/* Main Content */}

          <Col
            md={10}
            style={{
              padding: "2rem",
              background:
                theme === "dark"
                  ? "#121212"
                  : "white",
              color:
                theme === "dark"
                  ? "white"
                  : "black",
              minHeight: "100vh"
            }}
          >

            {tab === "properties" && (
              <AllPropertiesCards loggedIn={userLoggedIn} />
            )}

            {tab === "bookings" && (
              <AllProperty renterId={userData._id} />
            )}

            {tab === "transactions" && (
              <h3>Transaction History Coming Soon...</h3>
            )}

          </Col>

        </Row>

      </Container>

    </div>
  );
};

export default RenterHome;
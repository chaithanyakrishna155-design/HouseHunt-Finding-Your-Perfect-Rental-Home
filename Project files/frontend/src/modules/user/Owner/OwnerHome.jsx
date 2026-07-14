import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../../../App";

import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";
import TransactionHistory from "../../common/TransactionHistory";

const OwnerHome = () => {

  const user = useContext(UserContext);

  const [tab, setTab] = useState("add");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div
      style={{
        background: theme === "dark" ? "#111827" : "#f4f7fb",
        minHeight: "100vh"
      }}
    >

      {/* NAVBAR */}

      <Navbar
        expand="lg"
        style={{
          background:
            "linear-gradient(90deg,#2563eb,#4f46e5)",
          boxShadow: "0 6px 18px rgba(0,0,0,.15)"
        }}
      >
        <Container fluid>

          <Navbar.Brand>
            <h2
              style={{
                color: "white",
                marginBottom: 0,
                fontWeight: "700"
              }}
            >
              🏠 HomeSphere
            </h2>
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

            <Nav className="me-auto"></Nav>

            <Nav
              className="align-items-center"
              style={{ gap: "18px" }}
            >

              <button
                onClick={() =>
                  setTheme(
                    theme === "light"
                      ? "dark"
                      : "light"
                  )
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

              <h5
                style={{
                  color: "white",
                  marginBottom: 0,
                  fontWeight: "600"
                }}
              >
                Hi {user.userData.name}
              </h5>

              <Link
                to="/"
                onClick={handleLogOut}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600"
                }}
              >
                Logout
              </Link>

            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* BODY */}

      <Container fluid>

        <Row>

          {/* SIDEBAR */}

          <Col
            md={2}
            style={{
              minHeight: "100vh",
              padding: "25px 15px",
              background:
                theme === "dark"
                  ? "#1f2937"
                  : "linear-gradient(180deg,#2563eb,#4f46e5)"
            }}
          >

            <Button
              className="w-100 mb-3"
              onClick={() => setTab("add")}
              style={{
                borderRadius: "12px",
                border: "none",
                background: "white",
                color: "#2563eb",
                fontWeight: "600",
                padding: "12px"
              }}
            >
              ➕ Add Property
            </Button>

            <Button
              className="w-100 mb-3"
              onClick={() => setTab("properties")}
              style={{
                borderRadius: "12px",
                border: "none",
                background: "white",
                color: "#2563eb",
                fontWeight: "600",
                padding: "12px"
              }}
            >
              🏠 All Properties
            </Button>

            <Button
              className="w-100 mb-3"
              onClick={() => setTab("bookings")}
              style={{
                borderRadius: "12px",
                border: "none",
                background: "white",
                color: "#2563eb",
                fontWeight: "600",
                padding: "12px"
              }}
            >
              📅 Bookings
            </Button>

            <Button
              className="w-100 mb-3"
              onClick={() => setTab("transactions")}
              style={{
                borderRadius: "12px",
                border: "none",
                background: "white",
                color: "#2563eb",
                fontWeight: "600",
                padding: "12px"
              }}
            >
              💳 Transactions
            </Button>

            <Button
              className="w-100 mt-5"
              onClick={handleLogOut}
              style={{
                borderRadius: "12px",
                border: "none",
                background: "#ef4444",
                color: "white",
                fontWeight: "600",
                padding: "12px"
              }}
            >
              Logout
            </Button>

          </Col>

          {/* MAIN CONTENT */}

          <Col
            md={10}
            style={{
              padding: "35px",
              background:
                theme === "dark"
                  ? "#111827"
                  : "#f4f7fb",
              color:
                theme === "dark"
                  ? "white"
                  : "black",
              minHeight: "100vh"
            }}
          >

            <div
              style={{
                background:
                  theme === "dark"
                    ? "#1f2937"
                    : "white",
                borderRadius: "18px",
                padding: "25px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.10)"
              }}
            >

              {tab === "add" && <AddProperty />}

              {tab === "properties" && <AllProperties />}

              {tab === "bookings" && <AllBookings />}

              {tab === "transactions" && (
                <TransactionHistory
                  userId={user.userData._id}
                />
              )}

            </div>

          </Col>

        </Row>

      </Container>

    </div>
  );
};

export default OwnerHome;
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import AllUsers from "./AllUsers";
import AllProperty from "./AllProperty";
import AllBookings from "./AllBookings";
import { FaBars } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AdminHome = () => {
  const user = useContext(UserContext);

  const [activeComponent, setActiveComponent] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) return null;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          theme === "dark"
            ? "#111827"
            : "linear-gradient(135deg,#eef2ff,#dbeafe,#f8fbff)"
      }}
    >
      {/* Sidebar */}

      <div
        style={{
          width: sidebarOpen ? "250px" : "70px",
          background:
            theme === "dark"
              ? "linear-gradient(180deg,#1e3a8a,#312e81)"
              : "linear-gradient(180deg,#2563eb,#4f46e5)",
          transition: ".3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
          color: "white",
          boxShadow: "5px 0 20px rgba(0,0,0,.15)"
        }}
      >
        <div>

          <div
            onClick={toggleSidebar}
            style={{
              padding: "20px",
              cursor: "pointer",
              textAlign: sidebarOpen ? "right" : "center"
            }}
          >
            <FaBars size={24} />
          </div>

          {sidebarOpen && (
            <div style={{ padding: "20px" }}>

              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "35px",
                  fontWeight: "700"
                }}
              >
                HomeSphere
              </h3>

              <ul style={{ listStyle: "none", padding: 0 }}>

                <li
                  onClick={() => setActiveComponent("users")}
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    cursor: "pointer",
                    background:
                      activeComponent === "users"
                        ? "#ffffff"
                        : "rgba(255,255,255,.15)",
                    color:
                      activeComponent === "users"
                        ? "#2563eb"
                        : "#fff",
                    fontWeight: "600"
                  }}
                >
                  👥 All Users
                </li>

                <li
                  onClick={() => setActiveComponent("properties")}
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    cursor: "pointer",
                    background:
                      activeComponent === "properties"
                        ? "#ffffff"
                        : "rgba(255,255,255,.15)",
                    color:
                      activeComponent === "properties"
                        ? "#2563eb"
                        : "#fff",
                    fontWeight: "600"
                  }}
                >
                  🏠 All Properties
                </li>

                <li
                  onClick={() => setActiveComponent("bookings")}
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    background:
                      activeComponent === "bookings"
                        ? "#ffffff"
                        : "rgba(255,255,255,.15)",
                    color:
                      activeComponent === "bookings"
                        ? "#2563eb"
                        : "#fff",
                    fontWeight: "600"
                  }}
                >
                  📅 All Bookings
                </li>

              </ul>

            </div>
          )}

        </div>

        {sidebarOpen && (

          <div style={{ padding: "20px" }}>

            <button
              onClick={handleLogOut}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "12px",
                background: "#ef4444",
                color: "white",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Logout
            </button>

          </div>

        )}

      </div>

      {/* Main Content */}

      <div style={{ flex: 1 }}>

        {/* Header */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 35px",
            background:
              theme === "dark"
                ? "#1f2937"
                : "#ffffff",
            boxShadow: "0 3px 15px rgba(0,0,0,.08)"
          }}
        >

          <h2
            style={{
              color: "#2563eb",
              fontWeight: "700"
            }}
          >
            Admin Dashboard
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}
          >

            <button
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
              style={{
                border: "none",
                background: "transparent",
                fontSize: "26px",
                cursor: "pointer"
              }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "600",
                color: theme === "dark" ? "#fff" : "#333"
              }}
            >
              👤 Hi Admin {user.userData.name}
            </span>

          </div>

        </div>

        {/* Dynamic Content */}

        <div
          style={{
            padding: "35px",
            minHeight: "90vh",
            background:
              theme === "dark"
                ? "#111827"
                : "transparent"
          }}
        >

          {activeComponent === "users" && <AllUsers />}

          {activeComponent === "properties" && <AllProperty />}

          {activeComponent === "bookings" && <AllBookings />}

        </div>

      </div>

    </div>
  );
};

export default AdminHome;
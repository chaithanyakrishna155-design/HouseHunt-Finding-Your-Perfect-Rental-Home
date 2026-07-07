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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        background: theme === "dark" ? "#121212" : "#ffffff",
        color: theme === "dark" ? "white" : "black",
        minHeight: "100vh"
      }}
    >
      {/* Sidebar */}

      <div
        style={{
          width: sidebarOpen ? "220px" : "65px",
          background: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
          transition: "0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh"
        }}
      >
        <div>
          <div
            style={{
              padding: "15px",
              cursor: "pointer",
              color: theme === "dark" ? "white" : "black"
            }}
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </div>

          {sidebarOpen && (
            <div style={{ padding: "15px" }}>
              <h4>Dashboard</h4>

              <ul style={{ listStyle: "none", padding: 0 }}>

                <li
                  style={{ margin: "15px 0", cursor: "pointer" }}
                  onClick={() => setActiveComponent("users")}
                >
                  All Users
                </li>

                <li
                  style={{ margin: "15px 0", cursor: "pointer" }}
                  onClick={() => setActiveComponent("properties")}
                >
                  All Properties
                </li>

                <li
                  style={{ margin: "15px 0", cursor: "pointer" }}
                  onClick={() => setActiveComponent("bookings")}
                >
                  All Bookings
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
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                background: "#dc3545",
                color: "white",
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
            padding: "18px 25px",
            background: theme === "dark" ? "#1e1e1e" : "#ffffff",
            borderBottom:
              theme === "dark"
                ? "1px solid #333"
                : "1px solid #ddd"
          }}
        >
          <h2>HomeSphere</h2>

          <div
            style={{
              display: "flex",
              alignItems: "center"
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
                cursor: "pointer",
                marginRight: "20px"
              }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "bold"
              }}
            >
              Hi Admin {user.userData.name}

              <i className="far fa-user"></i>
            </span>
          </div>
        </div>

        {/* Components */}

        <div
          style={{
            padding: "20px",
            background: theme === "dark" ? "#121212" : "white",
            minHeight: "90vh"
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
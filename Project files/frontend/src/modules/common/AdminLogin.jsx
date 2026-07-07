import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.css";
import { UserContext } from "../../App";
import axios from "axios";
import { message } from "antd";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setUserData, setUserLoggedIn } = useContext(UserContext);

  // Theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/admin/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      if (response.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user || { role: "admin" })
        );

        setUserData(data.user || { role: "admin" });
        setUserLoggedIn(true);

        message.success("Login Successful");

        navigate("/adminhome");
      } else {
        setError(data.message || "Login Failed");
        message.error(data.message || "Login Failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network or Server Error");
      message.error("Admin not found");
    }
  };

  return (
    <div
      className={`admin-login-container ${theme}`}
      style={{
        background: theme === "dark" ? "#121212" : "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Theme Button */}
      <button
        onClick={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          border: "none",
          background: "transparent",
          fontSize: "28px",
          cursor: "pointer",
        }}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div
        className="admin-login-box"
        style={{
          background: theme === "dark" ? "#1e1e1e" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          padding: "35px",
          borderRadius: "10px",
          width: "380px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>
        <p style={{ textAlign: "center" }}>
          Sign in with your admin credentials
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          />

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
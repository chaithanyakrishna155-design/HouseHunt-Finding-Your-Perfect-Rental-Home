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
        background:
          theme === "dark"
            ? "#111827"
            : "linear-gradient(135deg,#eef2ff,#dbeafe,#f0f9ff)",
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
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
          padding: "35px",
          borderRadius: "18px",
          width: "380px",
          boxShadow:
            theme === "dark"
              ? "0 15px 35px rgba(0,0,0,.45)"
              : "0 15px 35px rgba(37,99,235,.18)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: theme === "dark" ? "#ffffff" : "#2563eb",
            fontWeight: "700",
          }}
        >
          Admin Login
        </h2>

        <p
          style={{
            textAlign: "center",
            color: theme === "dark" ? "#cbd5e1" : "#6b7280",
            marginBottom: "25px",
          }}
        >
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
              padding: "12px",
              marginTop: "10px",
              marginBottom: "18px",
              borderRadius: "10px",
              border:
                theme === "dark"
                  ? "1px solid #4b5563"
                  : "1px solid #cbd5e1",
              background: theme === "dark" ? "#374151" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#000000",
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
              padding: "12px",
              marginBottom: "18px",
              borderRadius: "10px",
              border:
                theme === "dark"
                  ? "1px solid #4b5563"
                  : "1px solid #cbd5e1",
              background: theme === "dark" ? "#374151" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
          />

          {error && (
            <p
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background:
                "linear-gradient(90deg,#2563eb,#4f46e5)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
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
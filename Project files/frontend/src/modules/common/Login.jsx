import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();

  // Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Login State
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/login",
        data
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        message.success("Login Successful");

        switch (res.data.user.type) {
          case "Admin":
            navigate("/adminhome");
            break;

          case "Owner":
            navigate("/ownerhome");
            break;

          case "Renter":
            navigate("/renterhome");
            break;

          default:
            navigate("/");
        }

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <>
      {/* Navbar */}

      {/* ================= NAVBAR ================= */}

<Navbar
  expand="lg"
  className="navbar shadow-lg"
  sticky="top"
>
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

      </Nav>

    </Navbar.Collapse>

  </Container>
</Navbar>

      {/* Login Form */}

      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: theme === "dark" ? "white" : "black",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>

            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
            />

            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                style={{ width: "200px" }}
              >
                Sign In
              </Button>
            </Box>

            <Grid container sx={{ mt: 2 }}>

              <Grid item xs={12}>
                Forgot Password?

                <Link
                  to="/forgotpassword"
                  style={{ color: "red", marginLeft: "5px" }}
                >
                  Click here
                </Link>

              </Grid>

              <Grid item xs={12} sx={{ mt: 1 }}>
                Don't have an account?

                <Link
                  to="/register"
                  style={{ color: "blue", marginLeft: "5px" }}
                >
                  Sign Up
                </Link>

              </Grid>

            </Grid>

          </Box>

        </Box>
      </Container>
    </>
  );
};

export default Login;
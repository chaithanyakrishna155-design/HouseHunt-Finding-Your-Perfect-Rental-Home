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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { message } from "antd";

const Register = () => {

  const navigate = useNavigate();

  // Theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Form Data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.type
    ) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:8001/api/user/register",
        data
      );

      setLoading(false);

      if (res.data.success) {

        message.success(res.data.message);

        if (data.type === "Owner") {
          alert("Waiting for admin approval.");
        }

        navigate("/login");

      } else {

        message.error(res.data.message);

      }

    } catch (err) {

      console.log(err);

      message.error("Something went wrong");

      setLoading(false);

    }

  };

  return (
    <>

      {/* Navbar */}

      <Navbar expand="lg" className="bg-body-tertiary">

        <Container fluid>

          <Navbar.Brand>
            <h2>HomeSphere</h2>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">

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

              <Link to="/">Home</Link>

              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>

            </Nav>

          </Navbar.Collapse>

        </Container>

      </Navbar>

      {/* Register Form */}

      <Container component="main">

        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: theme === "dark" ? "white" : "black"
          }}
        >

          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >

            <TextField
              margin="normal"
              fullWidth
              label="Renter Full Name / Owner Name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />

            <InputLabel sx={{ mt: 2 }}>
              User Type
            </InputLabel>

            <Select
              fullWidth
              name="type"
              value={data.type}
              onChange={handleChange}
            >
              <MenuItem value="">Select User</MenuItem>

              <MenuItem value="Renter">
                Renter
              </MenuItem>

              <MenuItem value="Owner">
                Owner
              </MenuItem>

            </Select>

            <Box mt={3}>

              <Button
                type="submit"
                variant="contained"
                style={{ width: "200px" }}
                disabled={loading}
              >

                {loading
                  ? <CircularProgress size={24} color="inherit" />
                  : "Sign Up"}

              </Button>

            </Box>

            <Grid container sx={{ mt: 2 }}>

              <Grid item>

                Already have an account?

                <Link
                  to="/login"
                  style={{
                    color: "blue",
                    marginLeft: "5px"
                  }}
                >
                  Sign In
                </Link>

              </Grid>

            </Grid>

          </Box>

        </Box>

      </Container>

    </>
  );
};

export default Register;
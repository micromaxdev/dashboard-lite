import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Header from "./Header";
import { FaSignInAlt } from "react-icons/fa";
import Cookies from "js-cookie";

function clearCookies() {
  Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
  alert("All cookies cleared!");
}

const useStyles = makeStyles((theme) => ({
  // No additional styles needed for this layout
}));

function Login(props) {
  //----------------------------CONSTS----------------------------

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();

  const classes = useStyles();

  const content = {
    brand: { image: "images/logo.png", width: 200 },
    "02_header": "Login to view the Dashboard",
    "02_primary-action": "Sign in",
    "02_forgot-action": "Forgot Password?",
    "02_register-text": "Don't have an account?",
    "02_register-action": "Register",
    ...props.content,
  };

  let brand;

  if (content.brand.image) {
    brand = (
      <img src={content.brand.image} alt="" width={content.brand.width} />
    );
  } else {
    brand = content.brand.text || "";
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  //----------------------------USE EFFECT----------------------------

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  //----------------------------MAIN----------------------------

  return (
    <div className="relative h-screen">
      <div className="container">
        <Header />

        <section>
          <Container maxWidth="xs">
            <Box pt={3} pb={10}>
              <Box mb={3} textAlign="center">
                <section className="heading">
                  <h1>
                    <center>
                      <FaSignInAlt />
                      Login
                    </center>
                  </h1>
                </section>
                <Typography variant="h5" component="h2">
                  {content["02_header"]}
                </Typography>
              </Box>

              <Box>
                <form onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        className="loginemail"
                        required
                        fullWidth
                        name="email"
                        id="email"
                        value={email}
                        onChange={onChange}
                        label="Email address"
                        autoComplete="email"
                        style={{ backgroundColor: "white" }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        className="loginpassword"
                        required
                        fullWidth
                        name="password"
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={onChange}
                        autoComplete="current-password"
                        style={{ backgroundColor: "white" }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box textAlign="right">
                        <Link to="/forgot-password" variant="body2">
                          {content["02_forgot-action"]}
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box my={2}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="loginButton"
                    >
                      {content["02_primary-action"]}
                    </Button>
                  </Box>

                  <Box textAlign="center">
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ display: "inline" }}
                    >
                      {content["02_register-text"]}{" "}
                    </Typography>
                    <Link to="/register" variant="body2">
                      {content["02_register-action"]}
                    </Link>
                  </Box>
                </form>
              </Box>
            </Box>
          </Container>
        </section>

        <div className="absolute bottom-10 container">
          <button onClick={clearCookies}>Clear All Cookies</button>
        </div>
      </div>
    </div>
  );
}

export default Login;

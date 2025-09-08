import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword, reset } from "../../features/auth/authSlice";
import Spinner from "../Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Header from "./Header";
import { FaLock } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  actions: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
}));

function ResetPassword(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  const classes = useStyles();

  const content = {
    "02_header": "Set New Password",
    "02_description": "Enter your new password below.",
    "02_primary-action": "Reset Password",
    ...props.content,
  };

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const { isLoading, isError, isSuccess, message, resetPasswordMessage } =
    useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // if (password.length < 6) {
    //   toast.error("Password must be at least 6 characters long");
    //   return;
    // }

    dispatch(resetPassword({ resetToken, password }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && resetPasswordMessage) {
      toast.success(resetPasswordMessage);
      navigate("/login");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, resetPasswordMessage, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <Header />

      <section>
        <Container maxWidth="xs">
          <Box pt={3} pb={10}>
            <Box mb={3} textAlign="center">
              <section className="heading">
                <h1>
                  <center>
                    <FaLock />
                    Reset Password
                  </center>
                </h1>
              </section>
              <Typography variant="h5" component="h2">
                {content["02_header"]}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: "16px" }}
              >
                {content["02_description"]}
              </Typography>
            </Box>

            <Box>
              <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      id="password"
                      label="New Password"
                      type="password"
                      value={password}
                      onChange={onChange}
                      autoComplete="new-password"
                      style={{ backgroundColor: "white" }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      id="confirmPassword"
                      label="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      onChange={onChange}
                      autoComplete="new-password"
                      style={{ backgroundColor: "white" }}
                    />
                  </Grid>
                </Grid>

                <Box my={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                  >
                    {content["02_primary-action"]}
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      </section>
    </div>
  );
}

export default ResetPassword;

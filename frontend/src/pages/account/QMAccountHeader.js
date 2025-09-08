import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 512,
  },
}));

export default function QMAccountHeader(props) {
  const classes = useStyles();

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={3}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Box display="flex" height="100%">
                <Box my="auto">
                  <Typography variant="h3" component="h3" gutterBottom={true}>
                    <Typography color="primary" variant="h3" component="span">
                      {" "}
                    </Typography>
                    <Typography variant="h3" component="span">
                      Configure Dashboard
                    </Typography>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    paragraph={true}
                  ></Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    paragraph={true}
                  >
                    Update your account details.
                  </Typography>

                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="secondary2"
                      component={Link}
                      to="/dashboard/settings/details"
                      sx={{
                        m: 0,
                        boxShadow: 3,
                        minWidth: "250px", //maxWidth: '100px',
                        "&:hover": { bgcolor: "#ff8f00" },
                      }}
                    >
                      Account Details
                    </Button>
                  </Box>

                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="secondary2"
                      component={Link}
                      to="/dashboard/settings/manage"
                      sx={{
                        m: 0,
                        boxShadow: 3,
                        minWidth: "250px", //maxWidth: '100px',
                        "&:hover": { bgcolor: "#ff8f00" },
                      }}
                    >
                      Manage accounts
                    </Button>
                  </Box>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="secondary2"
                      component={Link}
                      to="/dashboard/settings/print"
                      sx={{
                        m: 0,
                        boxShadow: 3,
                        minWidth: "250px", //maxWidth: '100px',
                        "&:hover": { bgcolor: "#ff8f00" },
                      }}
                    >
                      Print Organisation Chart
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  image="https://images.pexels.com/photos/6893329/pexels-photo-6893329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className={classes.card}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}

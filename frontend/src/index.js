import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import theme from "./theme/theme";
import theme2 from "./theme/theme2";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider as ThemeProv } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/apolloClient";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <ThemeProv theme={theme2}>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </ThemeProv>
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

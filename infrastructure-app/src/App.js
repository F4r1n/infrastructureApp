import React from "react";
import logo from "./logo.svg";
import Home from "./Home";
import "./App.css";

import { createMuiTheme, MuiThemeProvider, Grid } from "@material-ui/core";
import { blue, teal, red } from "@material-ui/core/colors";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: blue[300],
      main: blue[400],
      dark: blue[800],
    },
    secondary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
});

class App extends React.Component {
  render() {
    let backgCol = "#282c34";
    let theme = darkTheme;

    return (
      <div
        style={{
          backgroundColor: backgCol,
          color: backgCol,
          minHeight: "100vh",
          fontSize: "calc(10px + 2vmin)",
        }}
      >
        <header>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center">
            <img src={logo} className="App-logo" alt="logo" />
            <MuiThemeProvider theme={theme}>
              <Home />
            </MuiThemeProvider>
          </Grid>
        </header>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import dashboard from "./pages/dashboard";
import signin from "./pages/signin";
import signup from "./pages/signup";
import Navbar from "./components/layouts/Navbar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#2196F3',
            main: '#2196F3',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
});

class App extends Component {
    render() {
        return (
           <MuiThemeProvider theme={theme}>
               <div className="App">
                   <Router>
                       <Navbar/>
                       <div className="container">
                           <Switch>
                               <Route exact path='/dashboard' component={dashboard}/>
                               <Route exact path='/signin' component={signin}/>
                               <Route exact path='/signup' component={signup}/>
                           </Switch>
                       </div>
                   </Router>
               </div>
           </MuiThemeProvider>
        );
    }
}

export default App;


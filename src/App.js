import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import dashboard from "./pages/dashboard";
import signin from "./pages/signin";
import signup from "./pages/signup";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import User from "./components/User";
import Navbar from "./components/layouts/Navbar";
import themeFile from "./util/theme";
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute'
import {Provider} from 'react-redux'
import store from "./redux/store";
import {SET_AUTHENTICATED} from "./redux/types";
import {logoutUser, getUserData, getAdminData} from "./redux/actions/userActions";
import axios from 'axios';
import admin from "./pages/admin";

const theme = createMuiTheme(themeFile);
const token = localStorage.token;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/signin';
    } else if (decodedToken.email === 'admin@admin.com'){
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getAdminData());
    } else {
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar/>
                        <div className="container">
                            <Switch>
                                <Route exact path='/' component={dashboard}/>
                                <AuthRoute exact path='/signin' component={signin}/>
                                <AuthRoute exact path='/login/admin' component={admin}/>
                                <Route exact path='/signup' component={signup}/>
                                <Route exact path='/users' component={User}/>
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;


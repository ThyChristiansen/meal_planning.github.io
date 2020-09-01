import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';

import './App.css';
import LoginPage from '../LoginPage/LoginPage';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/home"
              component={LandingPage}
            />
            <Route
              exact
              path="/login"
              component={LoginPage}
            />
           
            <ProtectedRoute
              exact
              path="/home"
              component={LandingPage}
            />
           
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />

            <Route render={() => <h1>404</h1>} />
           
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);

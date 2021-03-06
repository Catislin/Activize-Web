import React from 'react';
import history from './history';
import '../App.css';
//import { Redirect } from 'react-router';
import {
  Router, Route, Switch
} from 'react-router-dom';
import Home from '../components/Home/Home';
import Nav from '../components/Nav/Nav';
import About from '../components/About/About';
import Events from '../components/Events/Events';
import EventPage from '../components/Events/EventPage';
import EventForm from '../components/Events/EventForm';
import LogIn from '../components/Nav/LogIn'
import SignUp from '../components/Nav/SignUp'

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route exact path="/events" component={Events}/>
        <Route path="/events/:id" component={EventPage}/>
        <Route path="/login" component={LogIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/new-event" component={EventForm}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

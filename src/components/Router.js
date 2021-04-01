import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom'; 
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';


const AppRouter = ({isLoggedIn}) => {

    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? 
                <div className="router-container">
                <Route exact path="/">
                    <Home/> 
                </Route> 
                <Route exact path="/profile">
                    <Profile /> 
                </Route> 
                <Redirect from="*" to="/"></Redirect>
                </div> 
                :
                <>
                <Route exact path="/"><Auth /></Route>
                <Redirect from="*" to="/"></Redirect>
                </>
            }
            </Switch>
        </Router>
    )
}

export default AppRouter;
import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import UserPage from "./UserPage";

function Routes () {

    return(
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/user'} component={UserPage}/>
            <Route path={'/admin'} component={Admin}/>
        </Switch>
    );
}

export default Routes;
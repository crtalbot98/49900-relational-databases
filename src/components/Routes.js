import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import UserPage from "./UserPage";
import Item from "./Item";

function Routes () {

    return (
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/user'} component={UserPage}/>
            <Route path={'/admin'} component={Admin}/>
            <Route path={'/item/:id'} component={Item}/>
        </Switch>
    );
}

export default Routes;
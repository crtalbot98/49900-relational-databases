import React from "react";
import {
    Switch,
    Route,
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import UserPage from "./UserPage";
import Item from "./Item";
import SignUp from "./signUp";
import SignIn from "./signIn";
import {useSelector} from "react-redux";

function Routes () {

    const userSignedIn = useSelector(state => state.userSignedIn);
    const [signedInCheck, changeSignIn] = React.useState(false);

    React.useEffect(() => {

        changeSignIn(userSignedIn);
        console.log(userSignedIn);
    }, [userSignedIn]);

    return (
        <Switch>
            <Route exact path={'/'}>
                {signedInCheck ? <Home/> : <Redirect to={'/signIn'}/>}
            </Route>
            <Route path={'/user'}>
                {signedInCheck ? <UserPage/> : <Redirect to={'/signIn'}/>}
            </Route>
            <Route path={'/admin'} component={Admin}/>
            <Route path={'/item/:id'} component={Item}/>
            <Route path={'/signup'} component={SignUp}>
                {!signedInCheck ? <SignUp/> : <Redirect to={'/'}/>}
            </Route>
            <Route path={'/signin'}>
                {!signedInCheck ? <SignIn/> : <Redirect to={'/'}/>}
            </Route>
        </Switch>
    );
}

export default Routes;
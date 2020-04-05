import React from "react";
import fire from "./Fire";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Nav() {

    const userName = useSelector(state => state.currentUser.name);
    const signedIn = useSelector(state => state.userSignedIn);

    const signOut = () => {
        fire.auth().signOut().then(() => {

        }).catch((err) => {
            console.log(err);
        })
    };

    return(

        <div className={'navBar'}>
            <h2>Relational Databases</h2>
            <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/user'}>User</Link>
                <Link to={'/admin'}>Admin</Link>
                {signedIn ?
                    <Link to={'/signin'} onClick={signOut}>Sign Out</Link>
                :
                    <div>
                        <Link to={'/signin'}>Sign In</Link>
                        <Link to={'/signup'}>Sign Up</Link>
                    </div>
                }
            </div>
            <p>Welcome, {userName}</p>
        </div>
    );
}

export default Nav;                                                          
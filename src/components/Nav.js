import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Nav() {

    const userName = useSelector(state => state.currentUser.name);

    return(

        <div className={'navBar'}>
            <h2>Relational Databases</h2>
            <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/user'}>User</Link>
                <Link to={'/admin'}>Admin</Link>
            </div>
            <p>Welcome, {userName}</p>
        </div>
    );
}

export default Nav;                                                          
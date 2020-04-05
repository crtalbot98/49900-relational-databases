import React from "react";
import fire from "./Fire";
import {useDispatch} from "react-redux";
import {addUser, userChange} from "../redux/actions";
import {Link} from "react-router-dom";

function SignIn() {

    const [signInVals, updateVals] = React.useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();

    const handleChange = prop => e => { //Curried function, returns function with parameter e
        updateVals({ ...signInVals, [prop]: e.target.value })
    };

    const onSubmit = () => {
        fire.auth().signInWithEmailAndPassword(signInVals.email, signInVals.password).then(() => {
            let user = fire.auth().currentUser;

            dispatch(addUser(user));

            updateVals({
                email: "",
                password: ""
            });
            dispatch(userChange());
        }).catch((err) =>{
            const errCode = err.code;
            const errMessage = err.message;

            console.log(`${errCode}: ${errMessage}`);
        });
    };

    return(
        <div className={"loginForm"}>
            <div>
                <h1>Sign in to your account</h1>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder={"Email"} name={"email"} id={"email"} value={signInVals.email} onChange={
                    handleChange("email")
                }/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder={"Password"} name={"password"} id={"password"} value={signInVals.password} onChange={
                    handleChange("password")
                }/>
            </div>
            <button onClick={onSubmit}><Link to={'/'}>Submit</Link></button>
            <Link to={'/signup'}>Not a user?</Link>
        </div>
    );
}

export default SignIn;
import React from "react";
import fire from "./Fire";
import {useDispatch} from "react-redux";
import {addUser, userChange} from "../redux/actions";
import {Link} from "react-router-dom";

function SignUp() {

    const [signUpVals, updateVals] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const dispatch = useDispatch();
    const db = fire.firestore();

    const handleChange = prop => e => { //Curried function, returns function with parameter e
        updateVals({ ...signUpVals, [prop]: e.target.value })
    };

    const onSubmit = () => {
        fire.auth().createUserWithEmailAndPassword(signUpVals.email, signUpVals.password).then(() => {
            let user = fire.auth().currentUser;

            dispatch(addUser(user));

            user.updateProfile({
                displayName: signUpVals.name
            }).then(() => {
                updateVals({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                dispatch(userChange());

                db.collection("user").doc(user.uid).set({items: []}).then(() => {
                    console.log('added');
                });
            });
        }).catch((err) =>{
            const errCode = err.code;
            const errMessage = err.message;

            console.log(`${errCode}: ${errMessage}`);
        });
    };

    return(
      <div className={"loginForm"}>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder={"Name"} name={"name"} id={"name"} value={signUpVals.name} onChange={
              handleChange("name")
          }/>
          <label htmlFor="email">Name</label>
          <input type="email" placeholder={"Email"} name={"email"} id={"email"} value={signUpVals.email} onChange={
              handleChange("email")
          }/>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder={"Password"} name={"password"} id={"password"} value={signUpVals.password} onChange={
              handleChange("password")
          }/>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" placeholder={"Confirm Password"} name={"confirmPassword"} id={"confirmPassword"} value={signUpVals.confirmPassword} onChange={
              handleChange("confirmPassword")
          }/>
          <button onClick={() => {
              if(signUpVals.password === signUpVals.confirmPassword){
                  onSubmit();
              }
              else{
                alert("Needs to match");
              }
          }}><Link to={'/'}>Submit</Link></button>
          <Link to={'/signIn'}>Already a user?</Link>
      </div>
    );
}

export default SignUp;
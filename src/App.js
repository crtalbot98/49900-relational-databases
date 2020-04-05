import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {addItems, addUser, getUserItems, userSignIn} from "./redux/actions";
import fire from "./components/Fire";
import Routes from "./components/Routes";
import Nav from "./components/Nav";


function App() {

    const dispatch = useDispatch();
    const db = fire.firestore();
    const signedIn = useSelector(state => state.userSignedIn);
    const [signedInCheck, changeSignIn] = React.useState(false);

    React.useEffect(() => {

        changeSignIn(signedIn);
    }, [signedIn]);

    React.useEffect(() => {

        fire.auth().onAuthStateChanged((user) => {
            if(user){
                dispatch(userSignIn(true));
                dispatch(addUser(user));
            }
            else{
                dispatch(userSignIn(false));
                dispatch(addUser({id: "", name: ""}));
            }
        });
    }, [db, dispatch]);

  return (
    <div className="App">
      <Router>
          {signedInCheck ? <Nav/> : ""}
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {addItems, addUser, getUserItems} from "./redux/actions";
import fire from "./components/Fire";
import Routes from "./components/Routes";
import Nav from "./components/Nav";


function App() {

    const change = useSelector(state => state.change);
    const userChange = useSelector(state => state.userChange);
    const dispatch = useDispatch();
    const db = fire.firestore();

    React.useEffect(()=> {
        let newItems = [];

        db.collection("items_master").get().then((snapshot) => {
            snapshot.forEach(doc => {
                const obj = doc.data();

                let item = {
                    description: obj.description,
                    id: doc.id,
                    image: obj.image,
                    name: obj.name
                };

                newItems.push(item);
            });

            dispatch(addItems(newItems));
        });

    }, [db, dispatch, change]);

    React.useEffect(() => {
        db.collection("user").get().then((snapshot) => {
            snapshot.forEach(doc => {
                const obj = doc.data();

                const userItem = obj.user_collection;

                dispatch(getUserItems(userItem));
            });
        });
    }, [db, dispatch, userChange]);

    db.collection("user").get().then((snapshot) => {
        snapshot.forEach(doc => {
            const obj = doc.data();

            const user = {
                id: doc.id,
                name: obj.name
            };

            dispatch(addUser(user));
        });
    });

  return (
    <div className="App">
      <Router>
          <Nav/>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;

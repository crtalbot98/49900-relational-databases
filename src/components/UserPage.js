import React from "react";
import {useSelector, useDispatch} from "react-redux";
import fire from "./Fire";
import firebase from "firebase";
import {getUserItems, userChange} from "../redux/actions";
import brokenImg from '../images/broken-img.png';
import {Link} from "react-router-dom";

function UserPage() {

    const [userItems, getItems] = React.useState([]);
    const [getUserId, changeUserId] = React.useState("");
    const userId = useSelector(state => state.currentUser.id);
    const userName = useSelector(state => state.currentUser.name);
    const userItemChange = useSelector(state => state.userChange);
    const dispatch = useDispatch();
    const db = fire.firestore();

    const signOut = () => {
        fire.auth().signOut().then(() => {

        }).catch((err) => {
            console.log(err);
        })
    };

    React.useEffect(() => {

        changeUserId(userId);

        if(getUserId.length > 0){
            db.collection("user").doc(getUserId).get().then((snapshot) => {
                const obj = snapshot.data();

                const userItem = obj.items;

                getItems(userItem);
            });
        }
    }, [db, getUserId, userId, userItemChange]);

    const removeFromUserItems = (item) => {
        db.collection('user').doc(userId).update({
            items: firebase.firestore.FieldValue.arrayRemove(item)
        }).catch((err) => {
           alert(err);
        });
    };

    const userItemList = userItems.map((it, idx) =>
        <div key={idx} className={'item'}>
            <img src={it.image} onError={(e) => {
                e.target.onerror = null;
                e.target.src = brokenImg}
            } alt='' height={'100px'} width={'100px'}/>
            <div>
                <h2>{it.name}</h2>
                <p>{it.description}</p>
                <button className={'itemBtn'} onMouseUp={() => {removeFromUserItems({
                    id: it.id,
                    name: it.name,
                    description: it.description,
                    image: it.image
                });
                dispatch(userChange());
                }}>Remove item</button>
               <Link to={{pathname: `/item/${it.id}`}}><button>View Item</button></Link>
            </div>
        </div>
    );

    return(
        <div>
            <div className={'userCreds'}>
                <h2>Welcome, {userName}</h2>
                <Link to={'signin'}><button onClick={signOut}>Sign out</button></Link>
            </div>
        <div className={'item-container'}>
            {userItems.length < 1 ? 'Make sure to add an item to your list!' : userItemList}
        </div>
        </div>
    )
}

export default UserPage;
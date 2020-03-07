import React from "react";
import {useSelector} from "react-redux";
import fire from "./Fire";
import firebase from "firebase";

function UserPage() {

    const [userItems, getItems] = React.useState([]);
    const userId = useSelector(state => state.currentUser.id);
    const db = fire.firestore();

    React.useEffect(() => {

        db.collection("user").get().then((snapshot) => {
            snapshot.forEach(doc => {
                const obj = doc.data();

                const items = obj.user_collection;

                getItems(items);
            });
        });
    }, [db]);

    const removeFromUserItems = (item) => {
        db.collection('user').doc(userId).update({
            user_collection: firebase.firestore.FieldValue.arrayRemove(item)
        }).then((snapshot) => {
            console.log('removed' + item);
        }).catch((err) => {
           console.log(err);
        });
    };

    const userItemList = userItems.map((it, idx) =>
        <div key={idx} className={'item'}>
            <img src={it.image} alt='' height={'100px'} width={'100px'}/>
            <h2>{it.name}</h2>
            <p>{it.description}</p>
            <button onClick={() => {removeFromUserItems({
                id: it.id,
                name: it.name,
                description: it.description,
                image: it.image
            })}}>Add to your items</button>
        </div>
    );

    return(
        <div>
            {userItems.length < 1 ? 'Make sure to add an item to your list!' : userItemList}
        </div>
    )
}

export default UserPage;
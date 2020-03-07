import React from "react";
import {useSelector} from "react-redux";
import fire from "./Fire";
import firebase from "firebase";

function Home() {

    const items = useSelector(state => state.items);
    const userId = useSelector(state => state.currentUser.id);
    const [updatedItems, itemCheck] = React.useState(items);
    const db = fire.firestore();

    React.useEffect(() => {

        itemCheck(items);
        console.log(items);
    }, [items]);

    const addToUserItems = (item) => {
        db.collection('user').doc(userId).update({
            user_collection: firebase.firestore.FieldValue.arrayUnion(item)
        }).then((snapshot) => {
            console.log('added' + item);
        }).catch((err) => {
            console.log(err);
        });
    };

    const itemList = updatedItems.map((i, idx) =>
        <div key={idx} className={'item'}>
            <img src={i.image} alt='' height={'100px'} width={'100px'}/>
            <h2>{i.name}</h2>
            <p>{i.description}</p>
            <button onClick={() => {addToUserItems({
                id: i.id,
                name: i.name,
                description: i.description,
                image: i.image
            })}}>Add to your items</button>
        </div>
    );

    return(
        <div className={'item-container'}>
            {itemList}
        </div>
    )
}

export default Home;
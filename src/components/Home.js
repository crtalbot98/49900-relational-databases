import React from "react";
import {useSelector, useDispatch} from "react-redux";
import fire from "./Fire";
import firebase from "firebase";
import {userChange} from "../redux/actions";
import brokenImg from '../images/broken-img.png';

function Home() {

    const items = useSelector(state => state.items);
    const userItems = useSelector(state => state.currentUser.userItems);
    const userId = useSelector(state => state.currentUser.id);
    const [updatedItems, itemCheck] = React.useState([]);
    const [newUserItems, userItemCheck] = React.useState([]);
    const [itemAdded, checkItem] = React.useState(false);
    const dispatch = useDispatch();
    const db = fire.firestore();

    React.useEffect(() => {

        itemCheck(items);
    }, [items]);

    React.useEffect(() => {

        userItemCheck(userItems);
    }, [userItems]);


    const addToUserItems = (item) => {
        db.collection('user').doc(userId).update({
            user_collection: firebase.firestore.FieldValue.arrayUnion(item)
        }).catch((err) => {
            console.log(err);
        });
    };

    console.log(updatedItems);
    console.log(userItems);

    const itemList = updatedItems.map((i, idx) =>
            <div key={idx} className={'item'}>
                <img src={i.image} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = brokenImg}
                } alt='' height={'100px'} width={'100px'}/>
                <div>
                    <h2>{i.name}</h2>
                    <p>{i.description}</p>
                    {newUserItems.some(item => item.id === i.id) || itemAdded ?
                        <p>Item in your collection</p>
                        :
                        <button onClick={() => {addToUserItems({
                        id: i.id,
                        name: i.name,
                        description: i.description,
                        image: i.image
                    });
                        dispatch(userChange());
                        checkItem(true);
                    }}>Add to your items</button>}
                </div>
            </div>
    );

    return(
        <div className={'item-container'}>
            {itemList}
        </div>
    )
}

export default Home;
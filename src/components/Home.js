import React from "react";
import {useSelector, useDispatch} from "react-redux";
import fire from "./Fire";
import firebase from "firebase";
import {addItems, userChange} from "../redux/actions";
import brokenImg from '../images/broken-img.png';
import {Link} from "react-router-dom";

function Home() {

    const userId = useSelector(state => state.currentUser.id);
    const userItemChange = useSelector(state => state.userChange);
    const [getUserId, changeUserId] = React.useState("");
    const [updatedItems, itemCheck] = React.useState([]);
    const [newUserItems, userItemCheck] = React.useState([]);
    const dispatch = useDispatch();
    const db = fire.firestore();

    React.useEffect(() => {

        changeUserId(userId);

        if(getUserId.length > 0) {
            db.collection("user").doc(getUserId).get().then((snapshot) => {
                const obj = snapshot.data();

                const userItem = obj.items;

                userItemCheck(userItem);
            });
        }
    }, [db, getUserId, userId, userItemChange]);

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

            itemCheck(newItems);
        });
    }, [db, dispatch, userItemChange]);

    const addToUserItems = (item) => {
        db.collection('user').doc(userId).update({
            items: firebase.firestore.FieldValue.arrayUnion(item)
        }).then(() => {
            dispatch(userChange());
        }).catch((err) => {
            console.log(err);
        });
    };

    const itemList = updatedItems.map((i, idx) =>
            <div key={idx} className={'item'}>
                <img src={i.image} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = brokenImg}
                } alt='' height={'100px'} width={'100px'}/>
                <div>
                    <h2>{i.name}</h2>
                    <p>{i.description}</p>
                    {newUserItems.some(item => item.id === i.id) ?
                        <p className={'itemBtn'}>Item in your collection</p>
                        :
                        <button className={'itemBtn'} onMouseUp={() => {addToUserItems({
                        id: i.id,
                        name: i.name,
                        description: i.description,
                        image: i.image
                    });
                    }}>Add to your items</button>}
                    <Link to={{pathname: `/item/${i.id}`}}><button>View Item</button></Link>
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
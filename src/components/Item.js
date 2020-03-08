import React from "react";
import brokenImg from "../images/broken-img.png";
import fire from "./Fire";
import {useParams} from "react-router";

function Item(props) {

    const itemId = useParams();
    const [item, setItem] = React.useState({});
    const db = fire.firestore();

    db.collection("items_master").doc(itemId.id).get().then((snapshot) => {
            const obj = snapshot.data();

            let item = {
                description: obj.description,
                image: obj.image,
                name: obj.name
            };

            setItem(item);
    });

    return(
        <div className={'itemPage'}>
            <img src={item.image} onError={(e) => {
                e.target.onerror = null;
                e.target.src = brokenImg}
            } alt='' height={'100px'} width={'100px'}/>
            <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
            </div>
        </div>
    );
}

export default Item;
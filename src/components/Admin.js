import React from "react";
import {useDispatch} from "react-redux";
import {dbChange} from "../redux/actions";
import fire from "./Fire";

function Admin() {

    const [itemText, setText] = React.useState({
        name: '',
        description: '',
        image: ''
    });
    const dispatch = useDispatch();
    const db = fire.firestore();

    const handleChange = text => e => {
        setText({
            ...itemText,
            [text]: e.target.value
        });
    };

    const submit = () => {
        db.collection('items_master').add(itemText).then(() => {
            setText({
                name: '',
                description: '',
                image: ''
            });
        });
    };

    return(
        <div className={'admin'}>
            <h2>Hello admin</h2>
            <p>Add a user to the database</p>
            <label htmlFor="name">Name</label>
            <input type="text" name={'name'} value={itemText.name} onChange={handleChange('name')}/>
            <label htmlFor="desc">Description</label>
            <input type="text" name={'desc'} value={itemText.description} onChange={handleChange('description')}/>
            <label htmlFor="image">Image</label>
            <input type="text" name={'image'} value={itemText.image} onChange={handleChange('image')}/>
            <button onMouseUp={() => {
                submit();
                dispatch(dbChange())
            }}>Submit</button>
        </div>
    )
}

export default Admin;
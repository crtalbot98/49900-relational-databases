const initState = {

    currentUser: {
        id: "",
        name: ""
    },
    change: false,
    userChange: false,
    userSignedIn: false
};

const rootReducer = (state = initState, action) => {

    if(action.type === 'ADD_ITEMS'){

        return{
            ...state,
            items: action.items
        }
    }

    if(action.type === 'ADD_USER'){

        return{
            ...state,
            currentUser: {
                ...state.currentUser,
                id: action.id,
                name: action.name,
            }
        }
    }

    if(action.type === 'DB_CHANGE'){

        return{
            ...state,
            change: !state.change
        }
    }

    if(action.type === 'USER_CHANGE'){

        return{
            ...state,
            userChange: !state.userChange
        }
    }

    if(action.type === 'GET_USER_ITEMS'){

        return{
            ...state,
            currentUser: {
                ...state.currentUser,
                items: action.items
            }
        }
    }

    if(action.type === "CHANGE_USER_SIGNIN"){

        return{
            ...state,
            userSignedIn: action.signIn
        }
    }

    return state;
};

export default rootReducer;
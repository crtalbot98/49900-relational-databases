const initState = {

    currentUser: {
        id: '',
        name: 'No user'
    },
    change: false,
    items: []
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
                id: action.id,
                name: action.name
            }
        }
    }

    if(action.type === 'DB_CHANGE'){

        return{
            ...state,
            change: !state.change
        }
    }

    return state;
};

export default rootReducer;
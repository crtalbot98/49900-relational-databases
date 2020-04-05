export const addItems = (value) => {
    return{
        type: "ADD_ITEMS",
        items: value
    }
};

export const addUser = (value) => {
    return{
        type: "ADD_USER",
        id: value.uid,
        name: value.displayName,
    }
};

export const getUserItems = (value) => {
    return{
        type: 'GET_USER_ITEMS',
        items: value
    }
};

export const dbChange = () => {
    return{
        type: "DB_CHANGE"
    }
};

export const userChange = () => {
    return{
        type: "USER_CHANGE"
    }
};

export const userSignIn = (check) => {
    return{
        type: "CHANGE_USER_SIGNIN",
        signIn: check
    }
};
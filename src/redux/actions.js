export const addItems = (value) => {
    return{
        type: "ADD_ITEMS",
        items: value
    }
};

export const addUser = (value) => {
    return{
        type: "ADD_USER",
        id: value.id,
        name: value.name,
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
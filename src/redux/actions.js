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

export const dbChange = () => {
    return{
        type: "DB_CHANGE"
    }
};
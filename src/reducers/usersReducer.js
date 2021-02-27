const initialUser = {
    users: [],
    dropDownList: []
}

const usersReducer = (state = initialUser, action) => {
    switch (action.type) {
        case 'SET_USERS': {
            return {
                ...state,
                users: [...action.payload],
                dropDownList: [...action.payload]
            }
        }
        case 'SEARCH_USER': {
            return {
                ...state,
                users: [...action.payload]
            }
        }
        case 'CITY_FILTER': {
            return {
                ...state,
                users: [...action.payload]
            }
        }
        case 'SORT_ASC': {
            return {
                ...state,
                users: [...action.payload]
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default usersReducer
import axios from 'axios'

const setUsers = (users) => {
    return {
        type: 'SET_USERS',
        payload: users
    }
}

const userSearch = (user) => {
    return {
        type: 'SEARCH_USER',
        payload: user
    }
}

export const startGetUsers = () => {
    return (dispatch) => {
        axios.get('http://localhost:3033/users')
            .then((response) => {
                const users = response.data
                dispatch(setUsers(users))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const searchFilterUser = (search) => {
    return (dispatch) => {
        axios.get(`http://localhost:3033/users/filter?search=${search}`)
            .then((response) => {
                const users = response.data
                dispatch(userSearch(users))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}



export const startSortUsers = (sortBy, order) => {
    return (dispatch) => {
        axios.get(`http://localhost:3033/users/sort?sortBy=${sortBy}&order=${order}`)
            .then((response) => {
                const users = response.data
                dispatch(userSearch(users))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

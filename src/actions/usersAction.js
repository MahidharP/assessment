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

const cityFilter = (user) => {
    return {
        type: 'CITY_FILTER',
        payload: user
    }
}

const sortingAsc = (users) => {
    return {
        type: 'SORT_ASC',
        payload: users
    }
}

export const startGetUsers = () => {
    return (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const users = response.data
                dispatch(setUsers(users))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const searchGetUsers = (searchUser) => {
    return (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const users = response.data

                const result = users.filter((user) => {
                    return user.name.toLowerCase().includes(searchUser.toLowerCase())
                })
                dispatch(userSearch(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const filterCity = (city) => {
    return (dispatch) => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                const users = response.data
                if (city === 'display_all') {
                    dispatch(cityFilter(users))
                } else {
                    const result = users.filter((user) => {
                        return user.address.city === city
                    })
                    dispatch(cityFilter(result))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const sortAsc = () => {

    return (dispatch) => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                const users = response.data
                const result = users.sort((a, b) => {
                    let fa = a.name.toLowerCase()
                    let fb = b.name.toLowerCase()
                    if (fa < fb) {
                        return -1
                    } else if (fa > fb) {
                        return 1
                    } return 0;
                })
                dispatch(sortingAsc(result))
                console.log('aSorted Gener', users)
            })
            .catch((err) => {

            })
    }
}
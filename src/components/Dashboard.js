import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetUsers, searchFilterUser, startSortUsers } from '../actions/usersAction'
import { Table } from '../../node_modules/react-bootstrap';

const Dashboard = () => {
    const [searchUser, setSearchUser] = useState('')
    const [searchCity, setSearchCity] = useState('')
    const [sortOrder, setSortOrder] = useState({
        name: true,
        email: true,
        city: true,
        username: true
    })

    const users = useSelector((state) => {
        return state.users
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetUsers())
    }, [dispatch])

    const handleUserChange = (e) => {
        const result = e.target.value
        setSearchUser(result)
        dispatch(searchFilterUser(result))
    }

    const handleSearchCity = (e) => {
        const result = e.target.value
        setSearchCity(result)
        dispatch(searchFilterUser(result))
    }

    const handleSort = (sortBy) => {
        const newState = { ...sortOrder, [sortBy]: !sortOrder[sortBy] }
        setSortOrder(newState)
        dispatch(startSortUsers(sortBy, !sortOrder[sortBy] ? 'asc' : 'desc'))
    }


    return (
        <div>
            <h3> Users Count : - {users.users.length}</h3>
            <input type="text" value={searchUser} className="searchByName" onChange={handleUserChange} placeholder="Search..." />
            <select value={searchCity} onChange={handleSearchCity} className="dropDownList">
                <option value=""> Select City  </option>
                {
                    users.dropDownList.map((user) => {
                        return <option value={user.address.city} key={user.id}> {user.address.city} </option>
                    })
                }
            </select>
            <Table responsive hover striped>
                <thead>
                    <tr>
                        <th> Id <i className="sort icon" onClick={(e) => {
                            handleSort('id')
                        }}></i></th>
                        <th> Name <i className="sort icon" onClick={(e) => {
                            handleSort('name')
                        }}></i></th>
                        <th> Username <i className="sort icon" onClick={(e) => {
                            handleSort('username')
                        }}></i></th>
                        <th> Email <i className="sort icon" onClick={(e) => {
                            handleSort('email')
                        }}></i></th>
                        <th> City <i className="sort icon" onClick={(e) => {
                            handleSort('address.city')
                        }}></i></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.users.map((user) => {
                            return <TableRows key={user.id} user={user} />
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

const TableRows = (props) => {
    const { user } = props
    return (
        <tr key={user.id}>
            <td> {user.id} </td>
            <td> {user.name} </td>
            <td> {user.username} </td>
            <td> {user.email} </td>
            <td> {user.address.city} </td>
        </tr>
    )
}

export default Dashboard

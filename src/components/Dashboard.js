import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetUsers, searchGetUsers, filterCity, sortAsc } from '../actions/usersAction'
import { Table } from '../../node_modules/react-bootstrap';

const Dashboard = () => {
    const [searchUser, setSearchUser] = useState('')
    const [searchCity, setSearchCity] = useState('')
    const [toggle, setToggle] = useState(false)

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
        dispatch(searchGetUsers(result))
    }

    const handleSearchCity = (e) => {
        const result = e.target.value
        setSearchCity(result)
        dispatch(filterCity(result))
    }

    const handleAscSort = () => {
        dispatch(sortAsc())
    }

    return (
        <div>
            <h3> Users Count : - {users.users.length}</h3>
            <input type="text" value={searchUser} className="searchByName" onChange={handleUserChange} placeholder="Search by Name" />
            <select value={searchCity} onChange={handleSearchCity} className="dropDownList">
                <option value="display_all"> Select City  </option>
                {
                    users.dropDownList.map((user) => {
                        return <option value={user.address.city} key={user.id}> {user.address.city} </option>
                    })
                }
            </select>
            <Table responsive hover data-toggle="table">
                <thead>
                    <tr>
                        <th> Name <i class="sort icon" onClick={handleAscSort}></i></th>
                        <th> UserName </th>
                        <th> Email </th>
                        <th> City </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td> {user.name} </td>
                                    <td> {user.username} </td>
                                    <td> {user.email} </td>
                                    <td> {user.address.city} </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Dashboard

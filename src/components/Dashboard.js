import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetUsers, searchFilterUser, startSortUsers } from '../actions/usersAction'
import { Table } from '../../node_modules/react-bootstrap';
import { Popup, Form } from 'semantic-ui-react'
import FilterControl from './FilterControl'

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

    useEffect(() => {
        document.title = `Users - ${users.users.length}`
    }, [users])

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
        <div className="divDashboard">
            <h2 className="h2Dashboard"> Users Count : {users.users.length}</h2>
            <Form> <input placeholder="Search..." value={searchUser} className="searchByName" onChange={handleUserChange} /> </Form>
            <Table responsive hover striped>
                <thead>
                    <tr>
                        <th> Id <i className="sort icon" onClick={(e) => {
                            handleSort('id')
                        }}></i> </th>
                        <th> Name <i className="sort icon" onClick={(e) => {
                            handleSort('name')
                        }}></i> <Popup
                                content={
                                    <FilterControl field="name" holderText="Search By Name" />
                                }
                                on='click'
                                pinned
                                trigger={<i className="filter icon"></i>}
                            />
                        </th>
                        <th> Username <i className="sort icon" onClick={(e) => {
                            handleSort('username')
                        }}></i> <Popup
                                content={
                                    <FilterControl field="username" holderText="Search By Username" />
                                }
                                on='click'
                                pinned
                                trigger={<i className="filter icon"></i>}
                            />
                        </th>
                        <th> Email <i className="sort icon" onClick={(e) => {
                            handleSort('email')
                        }}></i> <Popup
                                content={
                                    <FilterControl field="email" holderText="Search By Email" />
                                }
                                on='click'
                                pinned
                                trigger={<i className="filter icon"></i>}
                            /> </th>
                        <th> City <i className="sort icon" onClick={(e) => {
                            handleSort('address.city')
                        }}></i> <Popup
                                content={
                                    <select value={searchCity} onChange={handleSearchCity}>
                                        <option value=""> Select City  </option>
                                        {
                                            users.dropDownList.map((user) => {
                                                return <option value={user.address.city} key={user.id}> {user.address.city} </option>
                                            })
                                        }
                                    </select>
                                }
                                on='click'
                                pinned
                                trigger={<i className="filter icon"></i>}
                            />
                        </th>
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

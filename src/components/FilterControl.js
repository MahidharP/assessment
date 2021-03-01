import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { searchContainsUser, searchExactUser } from '../actions/usersAction'

const FilterControl = (props) => {
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('')
    const [field, setField] = useState(props.field)

    const { holderText } = props
    const dispatch = useDispatch()

    const handleSearchType = (e) => {
        setSearchType(e.target.value)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (searchType === 'contains') {
            dispatch(searchContainsUser(search, field))
        }
    }, [search])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            searchType,
            search,
            field
        }
        if (searchType === 'equals') {
            dispatch(searchExactUser(search, field))
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <select value={searchType} onChange={handleSearchType}>
                    <option value=""> Select </option>
                    <option value="contains">contains</option>
                    <option value="equals">equals</option>
                </select>
                <input placeholder={holderText} value={search} onChange={handleSearchChange} />
                <input type="submit" />
            </Form>
        </div>
    )
}

export default FilterControl
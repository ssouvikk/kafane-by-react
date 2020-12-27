import axios from 'axios'
import React, { Component } from 'react'
import UserRow from '../../Component/UserRow/UserRow'
import styles from './Users.module.css'

export default class Users extends Component {
    state = {
        allUsers: [],
        currentUsers: [],
        searchVal: ''
    }

    componentDidMount = () => {
        localStorage.setItem('currentPage', 'users')
        this.props.pageUpdate()
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
            .then((resp) => {
                this.setState({ allUsers: [...resp.data], currentUsers: [...resp.data] })
            })
            .catch((err) => {
                console.log('users data not found');
            })
    }

    searchUser = (e) => {
        e.preventDefault()
        const inputVal = this.state.searchVal
        if (!inputVal.trim()) {
            this.setState({ currentUsers: this.state.allUsers })
            return
        }
        if (inputVal.length > 1) {
            this.setState({ searchVal: '' })
            const url = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=' + inputVal
            axios.get(url)
                .then((resp) => {
                    this.setState({ currentUsers: [...resp.data] })
                })
                .catch((err) => {
                    alert('user not found');
                })
        } else {
            alert('please enter atlease 2 charecter')
        }
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    render() {
        return (
            <div className={styles.container}>
                <h2>Users</h2>
                <form onSubmit={this.searchUser} >
                    <input name="searchVal" onChange={this.handleChange} type="text" autoComplete="off" value={this.state.searchVal} placeholder="Search by Name"></input>
                    <button>Reset</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Avatar </th>
                            <th>Full Name</th>
                            <th>DoB</th>
                            <th>Gender</th>
                            <th>Current Location</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.currentUsers.map((item, pos) => <UserRow key={pos} data={item} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

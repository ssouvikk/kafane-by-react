import axios from 'axios'
import React, { Component } from 'react'
import styles from './Login.module.css'

export default class Login extends Component {

    state = {
        userName: '',
        password: ''
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.userName === this.state.password) {
            axios.post('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login', {
                userName: this.state.userName,
                password: this.state.password,
            })
                .then((resp) => {
                    localStorage.setItem('login', true)
                    alert('login success')
                    this.props.loginCheck()
                })
                .catch((err) => {
                    console.log('Something goes wrong plz try again');
                })
        } else {
            alert('please enter valid credential')
        }

    }

    componentDidMount = () => {
        localStorage.setItem('currentPage', '')
        this.props.pageUpdate()
    }

    render() {
        return (
            <div className={styles.container}>
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.userName} className={styles.inp} type="text" name="userName" placeholder="Enter Username"></input>
                    <input onChange={this.handleChange} value={this.state.password} className={styles.inp} type="password" name="password" placeholder="Enter Password"></input>
                    <button className={styles.submitBtn}>Login</button>
                </form>
            </div>
        )
    }
}

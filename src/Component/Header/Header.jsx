import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_ENDPOINT } from '../../Utilities/RouteEndPoint'
import styles from './Header.module.css'

export default class Header extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="logo" />
                    <h1>Kafane</h1>
                </div>
                <div className={styles.navLinks}>
                    <Link className={`${styles.navLink} ${this.props.currentPage === 'orders' ? styles.activeNav : ''}`} to={ROUTE_ENDPOINT.ORDER_PAGE} >orders</Link>
                    <Link className={`${styles.navLink} ${this.props.currentPage === 'products' ? styles.activeNav : ''}`} to={ROUTE_ENDPOINT.PRODUCT_PAGE} >products</Link>
                    <Link className={`${styles.navLink} ${this.props.currentPage === 'users' ? styles.activeNav : ''}`} to={ROUTE_ENDPOINT.USERS_PAGE} >users</Link>
                </div>
                <div onClick={this.props.logout} className={styles.logOut}>Logout</div>
            </div>
        )
    }
}

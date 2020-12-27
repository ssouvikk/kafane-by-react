import React, { Component } from 'react'
import styles from './UserRow.module.css'

export default class UserRow extends Component {
    render() {
        const { id, profilePic, fullName, dob, gender, currentCity, currentCountry } = this.props.data
        return (
            <tr>
                <td className={styles.light}>{id}</td>
                <td><img src={profilePic} alt='profile pic' ></img></td>
                <td className={styles.light}>{fullName}</td>
                <td>{dob}</td>
                <td className={styles.light}>{gender}</td>
                <td className={styles.light}>{currentCity} , {currentCountry}</td>
            </tr>
        )
    }
}

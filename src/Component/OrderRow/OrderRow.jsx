import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_ENDPOINT } from '../../Utilities/RouteEndPoint'
import styles from './OrderRow.module.css'

export default class OrderRow extends Component {
    render() {
        const { id, customerName, orderDate, amount, orderStatus, orderTime } = this.props.data
        return (
            <tr>
                <td className={styles.light}>
                    <Link className={styles.link} to={`${ROUTE_ENDPOINT.ORDER_DETAILS_PAGE}/${id}`} >
                        {id}
                    </Link>
                </td>
                <td> {customerName} </td>
                <td>{orderDate}<p className={`${styles.light} ${styles.lightP}`}>{orderTime}</p></td>
                <td className={styles.light}>${amount}</td>
                <td>{orderStatus}</td>
            </tr>
        )
    }
}

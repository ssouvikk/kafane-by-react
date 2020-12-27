import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_ENDPOINT } from '../../Utilities/RouteEndPoint'
import styles from './ProductRow.module.css'

export default class ProductRow extends Component {
    render() {
        const { id, medicineName, medicineBrand, expiryDate, unitPrice, stock } = this.props.data
        return (
            <tr>
                <td className={`${styles.light} ${styles.w5}`}>
                    <Link className={styles.link} to={`${ROUTE_ENDPOINT.PRODUCT_DETAILS_PAGE}/${id}`} >
                        {id}
                    </Link>
                </td>
                <td> {medicineName} </td>
                <td className={`${styles.light}`} >{medicineBrand}</td>
                <td className={`${styles.w10rem}`} >{expiryDate}</td>
                <td className={`${styles.light}`} >${unitPrice}</td>
                <td>{stock}</td>
            </tr>
        )
    }
}

import axios from 'axios';
import React, { Component } from 'react'
import styles from './ProductDetails.module.css'

export default class ProductDetails extends Component {

    state = {
        details: {}
    }

    componentDidMount = () => {
        localStorage.setItem('currentPage', 'products')
        this.props.pageUpdate()
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products/' + this.props.match.params.id)
            .then((resp) => {
                this.setState({ details: { ...resp.data } })
            })
            .catch((err) => {
                console.log('order details not found');
            })
    }

    render() {
        const { medicineName, medicineBrand, expiryDate, prescriptionRequired, stock, unitPrice } = this.state.details
        return (
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1> {medicineName} </h1>
                    <h4> {medicineBrand} </h4>
                </div>
                <div className={styles.box}>
                    <h3>Stock: {stock} </h3>
                    <h2>Price: ${unitPrice} </h2>
                </div>
                <h3 className={`${styles.prescription} ${prescriptionRequired ? styles.prescriptionYes : styles.prescriptionNo}`}> {prescriptionRequired ? 'Prescription Required' : 'No Prescription Required'} </h3>
                <h3 className={styles.expiry} >Expiry Date : {expiryDate} </h3>
            </div>
        )
    }
}

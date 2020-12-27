import axios from 'axios'
import React, { Component } from 'react'
import styles from './OrderDetails.module.css'

export default class OrderDetails extends Component {

    state = {
        details: {}
    }

    componentDidMount = () => {
        localStorage.setItem('currentPage', 'orders')
        this.props.pageUpdate()
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders/' + this.props.match.params.id)
            .then((resp) => {
                this.setState({ details: { ...resp.data } })
            })
            .catch((err) => {
                console.log('order details not found');
            })
    }

    getColor = (orderStatus) => {
        switch (orderStatus) {
            case "Delivered":
                return '#09fd09'
            case "New":
                return '#9999ff'
            case "InTransit":
                return '#28c1cc'
            case "Packed":
                return '#bbbb2e'
            default:
                break;
        }
    }

    render() {
        const { id, amount, customerName, orderDate, orderStatus, orderTime } = this.state.details
        const color = this.getColor(orderStatus)
        return (
            <div className={styles.container}>
                <h1> Order id : #{id} </h1>
                <div style={{ borderColor: color }} className={styles.orderBox}>
                    <div style={{ borderColor: color, backgroundColor: color }} className={styles.topBox}>
                        <div className={styles.half}>
                            <h2>{customerName}</h2>
                        </div>
                        <div className={styles.half}>
                            <h2>Amount: ${amount}</h2>
                            <h4>{orderDate} {orderTime} </h4>
                        </div>
                    </div>
                    <div style={{ color: color }} className={styles.statusBox}>
                        {orderStatus}
                    </div>
                </div>
            </div>
        )
    }
}

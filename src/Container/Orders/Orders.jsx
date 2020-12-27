import axios from 'axios'
import React, { Component } from 'react'
import OrderRow from '../../Component/OrderRow/OrderRow'
import styles from './Orders.module.css'

export default class Orders extends Component {

    state = {
        newOrder: true,
        packed: true,
        inTransit: true,
        delivered: true,
        allOrders: [],
        currentContent: []
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: !this.state[e.target.name] })
        setTimeout(() => {
            this.showOrders()
        }, 100);
    }

    componentDidMount = () => {
        localStorage.setItem('currentPage', 'orders')
        this.props.pageUpdate()
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
            .then((resp) => {
                this.setState({ allOrders: [...resp.data] })
                setTimeout(() => {
                    this.showOrders()
                }, 100);
            })
            .catch((err) => {
                console.log('orders data not found');
            })
    }

    showOrders = () => {
        const { allOrders, newOrder, packed, delivered, inTransit } = this.state
        if (allOrders.length > 0) {
            const filteredContent = allOrders.filter((value, key) => {
                if (newOrder && value.orderStatus === 'New') return true
                if (packed && value.orderStatus === 'Packed') return true
                if (delivered && value.orderStatus === 'Delivered') return true
                if (inTransit && value.orderStatus === 'InTransit') return true
                return false
            })
            this.setState({ currentContent: filteredContent })
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <h2>Orders</h2>
                <div className={styles.mainContent}>
                    <div className={styles.filterSection}>
                        <h3>Filters</h3>
                        <p>Count: <span> {this.state.currentContent.length} </span> </p>

                        <label><input name="newOrder" checked={this.state.newOrder} onChange={this.handleChange} className={styles.checkBox} type="checkbox"></input> New</label>

                        <label><input name="packed" checked={this.state.packed} onChange={this.handleChange} className={styles.checkBox} type="checkbox"></input> Packed</label>

                        <label><input name="inTransit" checked={this.state.inTransit} onChange={this.handleChange} className={styles.checkBox} type="checkbox"></input> In Transit</label>

                        <label><input name="delivered" checked={this.state.delivered} onChange={this.handleChange} className={styles.checkBox} type="checkbox"></input> Delivered</label>

                    </div>
                    <div className={styles.orderSection}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.currentContent.map((item, pos) => <OrderRow key={pos} data={item} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

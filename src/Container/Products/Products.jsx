import axios from 'axios'
import React, { Component } from 'react'
import ProductRow from '../../Component/ProductRow/ProductRow'
import styles from './Products.module.css'

export default class Products extends Component {

    state = {
        expired: true,
        lowStock: true,
        allProducts: [],
        currentContent: []
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: !this.state[e.target.name] })
        setTimeout(() => {
            this.showOrders()
        }, 100);
    }

    showOrders = () => {
        const { allProducts, expired, lowStock } = this.state
        if (allProducts.length > 0) {
            const filteredContent = allProducts.filter((value) => {
                if (expired) return (new Date()) > (new Date(value.expiryDate))
                return true
            }).filter((value) => {
                if (lowStock) return value.stock < 100
                return true
            })
            this.setState({ currentContent: filteredContent })
        }
    }

    componentDidMount = () => {
        localStorage.setItem('currentPage', 'products')
        this.props.pageUpdate()
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
            .then((resp) => {
                this.setState({ allProducts: [...resp.data] })
                setTimeout(() => {
                    this.showOrders()
                }, 100);
            })
            .catch((err) => {
                console.log('product data not found');
            })
    }


    render() {
        return (
            <div className={styles.container}>
                <h2>Products</h2>
                <div className={styles.mainContent}>
                    <div className={styles.filterSection}>
                        <h3>Filters</h3>
                        <p>Count: <span> {this.state.currentContent.length} </span> </p>
                        <label><input onChange={this.handleChange} checked={this.state.expired} name="expired" className={styles.checkBox} type="checkbox" ></input> Expired </label>
                        <label><input onChange={this.handleChange} checked={this.state.lowStock} name="lowStock" className={styles.checkBox} type="checkbox" ></input> Low Stock</label>
                    </div>
                    <div className={styles.orderSection}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name </th>
                                    <th>Product Brand</th>
                                    <th>Expiry Date</th>
                                    <th>Unit Price</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.currentContent.map((item, pos) => <ProductRow key={pos} data={item} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

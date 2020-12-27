import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Component/Header/Header';
import Login from './Container/Login/Login';
import OrderDetails from './Container/OrderDetails/OrderDetails';
import Orders from './Container/Orders/Orders';
import ProductDetails from './Container/ProductDetails/ProductDetails';
import Products from './Container/Products/Products';
import Users from './Container/Users/Users';
import { ROUTE_ENDPOINT } from './Utilities/RouteEndPoint';

export default class App extends Component {

  state = {
    loggedIn: localStorage.getItem('login') === "true",
    currentPage: localStorage.getItem('currentPage') ? localStorage.getItem('currentPage') : '',
  }

  loginCheck = () => {
    this.setState({ loggedIn: localStorage.getItem('login') === "true" })
  }

  logout = () => {
    localStorage.setItem('login', false)
    this.loginCheck()
  }

  pageUpdate = () => {
    this.setState({ currentPage: localStorage.getItem('currentPage') ? localStorage.getItem('currentPage') : '' })
  }

  render() {
    return (
      <BrowserRouter >
        <Header logout={this.logout} currentPage={this.state.currentPage} />
        <div className='content'>
          <Switch >

            <Route exact path={ROUTE_ENDPOINT.HOME_PAGE}
              render={() => this.state.loggedIn ?
                <Redirect to={ROUTE_ENDPOINT.ORDER_PAGE} /> :
                <Redirect to={ROUTE_ENDPOINT.LOGIN_PAGE} />}
            />

            <Route exact path={ROUTE_ENDPOINT.LOGIN_PAGE}
              render={() => this.state.loggedIn ?
                <Redirect to={ROUTE_ENDPOINT.HOME_PAGE} /> :
                <Login loginCheck={this.loginCheck} pageUpdate={this.pageUpdate} />}
            />

            <Route exact path={ROUTE_ENDPOINT.ORDER_PAGE}
              render={() => this.state.loggedIn ?
                <Orders pageUpdate={this.pageUpdate} /> :
                <Redirect to={ROUTE_ENDPOINT.HOME_PAGE} />}
            />

            <Route exact path={ROUTE_ENDPOINT.PRODUCT_PAGE}
              render={() => this.state.loggedIn ?
                <Products pageUpdate={this.pageUpdate} /> :
                <Redirect to={ROUTE_ENDPOINT.HOME_PAGE} />}
            />

            <Route exact path={ROUTE_ENDPOINT.USERS_PAGE}
              render={() => this.state.loggedIn ?
                <Users pageUpdate={this.pageUpdate} /> :
                <Redirect to={ROUTE_ENDPOINT.HOME_PAGE} />}
            />

            <Route exact path={`${ROUTE_ENDPOINT.ORDER_DETAILS_PAGE}/:id`}
              render={(browserProps) => this.state.loggedIn ?
                <OrderDetails pageUpdate={this.pageUpdate} {...browserProps} /> :
                <Redirect to={ROUTE_ENDPOINT.HOME_PAGE} />}
            />

            <Route exact path={`${ROUTE_ENDPOINT.PRODUCT_DETAILS_PAGE}/:id`}
              render={(browserProps) => this.state.loggedIn ?
                <ProductDetails pageUpdate={this.pageUpdate} {...browserProps} /> :
                <Redirect to={ROUTE_ENDPOINT.HOME_PAGE} />}
            />

          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

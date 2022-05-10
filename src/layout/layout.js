import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Category, Header, Product, Cart } from "../components";
import { queryCategoriesCurrencies} from "./queries.js";
import _ from "lodash";
import { calculateTotalPrices, calculateTotalPricesWithTax } from "../components/utils";
import styles from "./layout.module.css";

export class Layout extends React.Component{
    constructor(props){
        super(props);
        this.s = styles;
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            categories: [],
            currencies: [],
            currentProductId: "",
            currentCategoryName: "all",
            currentCurrency: "$",
            taxPercent: 21,
            cart:{
                products:[],
                fullQuantity: 0,
                totalPrices: 0,
                tax: 0,
                totalPricesAfterTax: 0,
               
            },
            backgroundDimmed: false,
        }
    }

    updateLocalStorage = () =>{
        return window.localStorage.setItem('state', JSON.stringify(this.state));
    }

    //Api part
    getCategoriesCurrencies = () =>{
        this.props.client.query(queryCategoriesCurrencies)
        .then((responce) => { 
            this.setState((state) =>({
                categories: responce.data.categories,
                currencies: responce.data.currencies,
                currentCurrency: "$",
            }))
        });
        this.updateLocalStorage();
    }

    getCurrentProductId = (id) =>{
        this.setState((state) =>({
            currentProductId: id
        }))

        this.updateLocalStorage();
    }

    switchCurrency = (e) =>{
        this.setState((state) =>({
            currentCurrency: e.target.value
        }))
        this.updateLocalStorage();
    }

    switchCategory = (e) =>{
        this.setState(() =>({
            currentCategoryName: e.target.value
        }))
        this.updateLocalStorage();
    }

    addToCart = (product, attributes) =>{
        const cart = this.state.cart;
        const cartProducts = cart.products;

        // Counting totalPrices( in all currencies);
        const prevTotalPrices =  (this.state.cart.totalPrices === 0) ? product.prices.reduce((acc,{currency}) =>{
            return {...acc, [currency.symbol]: 0}
        },{}) : this.state.cart.totalPrices;

        let mutatedPrices =  product.prices.reduce((acc,{amount,currency}) => {
            return {...acc, [currency.symbol]: amount}
        },{});

        const nextTotalPrices = calculateTotalPrices("plus", prevTotalPrices, mutatedPrices);
        const {taxes, totalPricesAfterTax} = calculateTotalPricesWithTax(nextTotalPrices, this.state.taxPercent);
    
        //Checking: Is there exactly the same product in the cart?
        const allRelatedProducts = cartProducts.filter((cartProduct) => product.id === cartProduct.id);
        const equalProduct = allRelatedProducts.find((product) => {
            return _.isEqual(attributes, product.choosenAttributes);
        });
        const indexEqualProduct = allRelatedProducts.findIndex((product) => {
            return _.isEqual(attributes, product.choosenAttributes);
        })

        if(equalProduct === undefined){
            const id = _.uniqueId();//For unique inputs
            this.setState(() =>({
                cart: {
                    products: [...cartProducts, 
                        {
                            ...product,
                            mutatedPrices: mutatedPrices,
                            quantity: 1,
                            choosenAttributes: attributes,
                            cartId: id,
                        }],
                    fullQuantity: ++cart.fullQuantity,
                    totalPrices: nextTotalPrices,
                    totalPricesAfterTax: totalPricesAfterTax,
                    taxes: taxes,
                }
            }))
        }else{
            ++cartProducts[indexEqualProduct].quantity;
            this.setState(() =>({
                cart: {
                    products: [...cartProducts],
                    fullQuantity: ++cart.fullQuantity,
                    totalPrices: nextTotalPrices,
                    totalPricesAfterTax: totalPricesAfterTax,
                    taxes: taxes,
                }
            }))
        }
        this.updateLocalStorage();
    }

    changeQuantityProduct = (id, isIncrease) =>{
        const cart = this.state.cart;
        const cartProducts = this.state.cart.products;
        const product = cartProducts.find((product) => product.cartId === id);
        const productIndex = cartProducts.findIndex((product) => product.cartId === id);
        const prevTotalPrices = this.state.cart.totalPrices;
        const mutatedPrices = product.mutatedPrices;

        let nextTotalPrices;
        if(isIncrease){
            nextTotalPrices = calculateTotalPrices("plus", prevTotalPrices, mutatedPrices);
            const {taxes, totalPricesAfterTax} = calculateTotalPricesWithTax(nextTotalPrices, this.state.taxPercent);

            ++cartProducts[productIndex].quantity;
            this.setState(() =>({
                cart: {
                    products: [...cartProducts],
                    fullQuantity: ++cart.fullQuantity,
                    totalPrices: nextTotalPrices,
                    totalPricesAfterTax: totalPricesAfterTax,
                    taxes: taxes,
                }
        
            }))
        }else if(!isIncrease){
            nextTotalPrices = calculateTotalPrices("minus", prevTotalPrices, mutatedPrices);
            const {taxes, totalPricesAfterTax} = calculateTotalPricesWithTax(nextTotalPrices, this.state.taxPercent);

            const quantity = product.quantity;
            if(quantity === 1){
                cartProducts.splice(productIndex, 1);
                this.setState(() =>({
                    cart: {
                        products: [...cartProducts],
                        fullQuantity: cart.fullQuantity - 1,
                        totalPrices: nextTotalPrices,
                        totalPricesAfterTax: totalPricesAfterTax,
                        taxes: taxes,
                    } 
                }))
            }else{
                nextTotalPrices = calculateTotalPrices("minus",prevTotalPrices, mutatedPrices);
                const {taxes, totalPricesAfterTax} = calculateTotalPricesWithTax(nextTotalPrices, this.state.taxPercent);

                cartProducts[productIndex].quantity = quantity - 1;
                this.setState(() =>({
                    cart: {
                        products: [...cartProducts],
                        fullQuantity: cart.fullQuantity - 1,
                        totalPrices: nextTotalPrices,
                        totalPricesAfterTax: totalPricesAfterTax,
                        taxes: taxes,
                    }})
                )
            }
        }
        this.updateLocalStorage();
    }
    //Dimmed background, when you open a miniCart
    changeBackground = (isOpenSmallCart = false)=>{
        if(isOpenSmallCart){
            this.setState(() =>({
                backgroundDimmed: true
            }))
        }else if(!isOpenSmallCart){
            this.setState(() =>({
                backgroundDimmed: false
            }))
        }  
    }

    componentDidMount(){
        this.getCategoriesCurrencies();
    }

    componentDidUpdate(){
        this.updateLocalStorage();
    }

    render(){
        return <div className={this.s.layout}>
            <Header 
                categories={this.state.categories}
                currencies={this.state.currencies}
                currentCurrency={this.state.currentCurrency}
                currentCategoryName={this.state.currentCategoryName}
                switchCurrency={this.switchCurrency}
                switchCategory={this.switchCategory}
                cart={this.state.cart}
                changeQuantityProduct={this.changeQuantityProduct}
                changeBackground={this.changeBackground}
                getCategoriesCurrencies={this.getCategoriesCurrencies}
            ></Header>
            <Routes>
                <Route 
                    exact path='/*'
                    element={
                        <Category
                            currentCategoryName={this.state.currentCategoryName}
                            products={this.state.products}
                            currentCurrency={this.state.currentCurrency}
                            getCurrentProductId={this.getCurrentProductId}
                            addToCart={this.addToCart}
                            backgroundDimmed={this.state.backgroundDimmed}
                            getCategory={this.getCategory}
                            client={this.props.client}
                        />
                    }/>
                <Route 
                    path='/cart/*' 
                    element={
                        <Cart
                            cart={this.state.cart}
                            currentCurrency={this.state.currentCurrency}
                            changeQuantityProduct={this.changeQuantityProduct}
                            backgroundDimmed={this.state.backgroundDimmed}
                            taxPercent={this.state.taxPercent}
                        />
                    }
                />
                <Route 
                    path='/product/*' 
                    element={
                    <Product 
                        currentProductId={this.state.currentProductId}
                        client={this.props.client}
                        product={this.state.currentProduct}
                        currentCurrency={this.state.currentCurrency}
                        addToCart={this.addToCart}
                        cart={this.state.cart}
                        backgroundDimmed={this.state.backgroundDimmed}
                    />}
                />
            </Routes>
        </div>
    }
}

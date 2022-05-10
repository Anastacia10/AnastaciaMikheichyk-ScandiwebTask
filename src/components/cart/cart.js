import React from "react";
import styles from "./cart.module.css";
import { CartItem } from "./cartItem";
import classNames from "classnames";

export class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
        this.s = styles;
    }

    render(){
        return <div className={classNames(this.s.cart,{
                    [this.s.dimmed]: this.props.backgroundDimmed,
                })}>
                    <h2>Cart</h2>
                    {this.props.cart.products.map((product, index) =>
                        <CartItem
                            key={index}
                            product={product}
                            currentCurrency={this.props.currentCurrency}
                            choosenAttributes = {this.props.choosenAttributes}
                            cartId={product.cartId}
                            changeQuantityProduct={this.props.changeQuantityProduct}
                        />
                    )}
                    <div className={this.s.orderField}>
                        <div className={this.s.orderFieldInfo}>
                            <div className={this.s.orderFieldTitles}>
                                <p>{`Tax ${this.props.taxPercent}%: `}</p>
                                <p>Quantity:</p>
                                <p className={this.s.total}>Total:</p>
                            </div>
                            <div className={this.s.orderFieldAmount}>
                                <p>{`
                                    ${this.props.currentCurrency}
                                    ${(this.props.cart.fullQuantity !== 0) ? 
                                        this.props.cart.taxes[`${this.props.currentCurrency}`] : 0
                                    }
                                `}</p>
                                <p>{this.props.cart.fullQuantity}</p>
                                <p className={this.s.total}>{`
                                    ${this.props.currentCurrency}
                                    ${(this.props.cart.fullQuantity !== 0) ? 
                                        this.props.cart.totalPricesAfterTax[`${this.props.currentCurrency}`] : 0
                                    }
                                `}</p>
                            </div>
                        </div>
                        <button>ORDER</button>
                    </div>           
               </div>
    }
}
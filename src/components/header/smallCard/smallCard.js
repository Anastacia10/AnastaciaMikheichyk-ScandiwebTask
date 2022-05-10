import React from "react";
import styles from "./smallCard.module.css";
import { SmallCardAttribute } from "./smallCardAttribute/smallCardAttribute";

export class SmallCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productId: '',
            attributeSetName: '',
            value:  '',
        };
        this.s = styles;
    }

    render(){
        return  <div className={this.s.smallCard}>
                    <div className={this.s.smallCard_leftBlock}>
                        <p className={this.s.smallCard_name}>{this.props.product.name}</p>
                        <p className={this.s.smallCard_name}>{this.props.product.brand}</p>
                        <p className={this.s.smallCard_price}>{`
                            ${this.props.currentCurrency}
                            ${this.props.product.prices.find((price) => price.currency.symbol === this.props.currentCurrency).amount}`}
                        </p>
                        {this.props.product.attributes.map((attributeSet, index1) =>
                            <div className={this.s.smallCard_attributeSet} key={index1}>
                                <p>{attributeSet.name}:</p>
                                <div className={this.s.smallCard_attributeSetItems}>
                                    {attributeSet.items.map((item, index2) =>
                                        <SmallCardAttribute
                                            nameComponent="smallCart" 
                                            checkedValue={this.props.product.choosenAttributes[attributeSet.name]}
                                            cartId={this.props.cartId}
                                            name={attributeSet.name}
                                            attribute={item} 
                                            index={index2+90}
                                            key={index2 + 60}>
                                        </SmallCardAttribute>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={this.s.smallCard_rightBlock}>
                        <div className={this.s.smallCard_quantity}>
                            <button onClick={()=> this.props.changeQuantityProduct(this.props.cartId, true)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8V16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 12H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                    <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22"/>
                                </svg>
                            </button>   
                            <p>{this.props.product.quantity}</p>    
                            <button onClick={()=> this.props.changeQuantityProduct(this.props.cartId, false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 12H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                    <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22"/>
                                </svg>
                            </button>
                        </div>
                        <div 
                            className={this.s.smallCard_photo}
                            style={{ background: `center / contain no-repeat url(${this.props.product.gallery[0]}`}}>
                        </div>
                    </div>
                </div>
    }   
}
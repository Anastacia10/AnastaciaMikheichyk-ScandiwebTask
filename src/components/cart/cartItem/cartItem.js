import React from "react";
import styles from "./cartItem.module.css";
import { CartItemAttribute } from "./cartItemAttribute";

export class CartItem extends React.Component{
    constructor(props){
        super(props);
        this.s = styles;
        this.state ={
            galleryPhotosQuantity: 0,
            indexCurrentPhoto: 0

        }
    }

    showPrevPhoto = () =>{
        if(this.props.product.gallery.length === 1){
            this.setState(() =>({
                indexCurrentPhoto: 0,
            }))
        }
        else if(this.state.indexCurrentPhoto === 0){
            this.setState(() =>({
                indexCurrentPhoto: this.props.product.gallery.length - 1,
            }))
        }else{
            this.setState(() =>({
                indexCurrentPhoto: this.state.indexCurrentPhoto - 1, 
            }))
        }
    }

    showNextPhoto = () =>{
        if(this.props.product.gallery.length === 1){
            this.setState(() =>({
                indexCurrentPhoto: 0,
            }))
        }
        else if(this.state.indexCurrentPhoto === this.props.product.gallery.length - 1){
            this.setState(() =>({
                indexCurrentPhoto: 0,
            }))
        }else{
            this.setState(() =>({
                indexCurrentPhoto: this.state.indexCurrentPhoto + 1, 
            }))
        }
    }

    render(){
        console.log(this.props.product.attributes);
        return  <div className={this.s.cartItem}>
                    <div className={this.s.cartItem_leftBlock}>
                        <p className={this.s.cartItem_name}>{this.props.product.name}</p>
                        <p className={this.s.cartItem_brand}>{this.props.product.brand}</p>
                        <p className={this.s.cartItem_price}>{`
                            ${this.props.currentCurrency}
                            ${this.props.product.prices.find((price) => price.currency.symbol === this.props.currentCurrency).amount}`}
                        </p>
                        {this.props.product.attributes.map((attributeSet, index1) =>
                            <div className={this.s.cartItem_attributeSet} key={index1}>
                                <p>{attributeSet.name}:</p>
                                <div className={this.s.cartItem_attributeSetItems}>
                                    {attributeSet.items.map((item, index2) =>
                                        <CartItemAttribute
                                            nameComponent="cart"
                                            checkedValue={this.props.product.choosenAttributes[attributeSet.name]}
                                            cartId={this.props.cartId}
                                            indexCard={this.props.indexCard}
                                            name={attributeSet.name}
                                            attribute={item} 
                                            index={index2+90}
                                            key={index2 + 60}
                                        >
                                        </CartItemAttribute>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={this.s.cartItem_rightBlock}>
                        <div className={this.s.cartItem_quantity}>
                            <button onClick={(e)=> this.props.changeQuantityProduct(this.props.cartId, true)}>
                                <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.5 15V30" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15 22.5H30" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                    <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22"/>
                                </svg>
                            </button>   
                            <p>{this.props.product.quantity}</p>    
                            <button onClick={(e)=> this.props.changeQuantityProduct(this.props.cartId, false)}>
                            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 22.5H30" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22"/>
                            </svg>

                            </button>
                        </div>
                        <div 
                            className={this.s.cartItem_photo}
                            style={{ 
                                background: `no-repeat center/110% url(${this.props.product.gallery[this.state.indexCurrentPhoto]})`,
                            }}
                        >   {
                                (this.props.product.gallery.length > 1) ? <div className={this.s.cartItem_arrowsBox}>
                                    <div className={this.s.cartItem_arrow} onClick={() => this.showPrevPhoto()}>
                                        <svg width="6" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className={this.s.cartItem_arrow} onClick={() => this.showNextPhoto()}>
                                        <svg width="6" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 13L7 7L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div> : ""
                            }
                        </div>
                    </div>
                </div>
    }   
}
import React from "react";
import styles from "./product.module.css";
import classNames from "classnames";
import { queryProduct } from "../../layout/queries.js";
import { Interweave } from "interweave";
import { ProductItemAttribute } from "./productItemAttribute";
 
export class Product extends React.Component {
    constructor(props){
        super(props);
        this.s = styles;
        this.ref = React.createRef();
        this.state = {
            mainPhoto: "",
            name: "",
            gallery: [],
            brand: "",
            attributes: [],
            description: "",
            prices: [],
            isProductLoaded: false,
            choosenAttributes: {},
        };
    }

    handlerAttributeInputProduct = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState(() =>({
            choosenAttributes:{...this.state.choosenAttributes, [name]: value} 
        }))
    }

    chooseMainPhoto = (photoAddress) =>{
        this.setState(() =>({
           mainPhoto: photoAddress,
        }))
    }

    componentDidMount(){
        this.props.client.query(queryProduct(`${this.props.currentProductId}`))
        .then((result) => {
            const product = result.data.product;
            this.setState(() =>({
                mainPhoto: product.gallery[0],
                name: product.name,
                gallery: product.gallery,
                brand: product.brand,
                attributes: product.attributes,
                prices: product.prices,
                isProductLoaded: true,
                product: product,
                description: product.description,
                inStock: product.inStock,
            }))
        });
    }

    addToCartFromProduct = (e)=>{
        e.preventDefault();
        if((Object.keys(this.state.choosenAttributes).length) === this.state.attributes.length){
            this.props.addToCart(this.state.product, this.state.choosenAttributes)
        }else{
            alert("Not all attributes selected");
        }
    }

    render(){
        return <div className={
                    classNames(this.s.product,{
                        [this.s.dimmed]: this.props.backgroundDimmed,
                    }
                )}>
                 <div className={this.s.product_photoGroup}>
                {(this.state.isProductLoaded) ? 
                    this.state.gallery.map((photoAddress, index) =>
                        <div
                            key={index}
                            value={photoAddress}
                            onClick={() => this.chooseMainPhoto(photoAddress)}
                            style={{ background: `center / contain no-repeat url(${photoAddress}`}}
                        >
                        </div>
                    ) : ""
                }
                
            </div>
            <div 
                className={this.s.product_mainPhoto}
                style={(this.state.isProductLoaded) ? { background: `center / contain no-repeat url(${this.state.mainPhoto}`} : {}}
            ></div>
            <div className={this.s.product_rightBlock}>
                <div className={this.s.product_info}>
                   <h2>{this.state.name}</h2>
                   <p>{this.state.brand}</p>
                   <form id="attributes"  onSubmit={(e) => this.addToCartFromProduct(e)}>
                        {(this.state.isProductLoaded) ? this.state.attributes.map((attributeSet, index1) =>
                            <div key={index1}>
                                <h3 key={index1+350}>{attributeSet.name}</h3>
                                <div className={this.s.product_attributeSet} key={index1+30}>
                                    {attributeSet.items.map((item, index2) =>
                                        <ProductItemAttribute
                                            checkedValue={this.state.Color}
                                            nameComponent="Product"
                                            name={attributeSet.name}
                                            attribute={item} 
                                            handlerAttributeInput={this.handlerAttributeInputProduct}
                                            index={index2+90}
                                            key={index2 + 60}> 
                                        </ProductItemAttribute>
                                    )}
                                </div>
                            </div>
                        ) : ""}
                    </form>
                   <h3>PRICE:</h3>
                   <p className={this.s.product_price}>{`
                        ${this.props.currentCurrency}
                        ${(this.state.isProductLoaded) ? this.state.prices.find((price) => price.currency.symbol === this.props.currentCurrency).amount : ""}`}
                   </p>
                </div>
                <input
                    disabled={!this.state.inStock}
                    form="attributes"
                    type="submit" 
                    value={(this.state.inStock) ? "ADD TO CART" : "OUT OF STOCK"}
                ></input>
                <div className={this.s.product_description}>
                    <Interweave
                        content={`${this.state.description}`} 
                    />
                </div>
            </div>
        </div> 
    }
}



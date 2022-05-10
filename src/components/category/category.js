import React from "react";
import styles from "./category.module.css";
import {Card} from "./card";
import _ from "lodash";
import classNames from 'classnames';
import { queryCategory } from "../../layout/queries";

export class Category extends React.Component {
    constructor(props){
        super(props);
        this.client = props.client;
        this.s = styles;
        this.state ={
            products: []
        }
    }

    getCategory = (title) =>{
        this.props.client.query(queryCategory(`${title}`))
        .then((result) => {
            const products =  result.data.category.products;
            this.setState(() =>({
                products: products
            }))
        });
    }

    componentDidMount = () =>{
        this.getCategory(`${this.props.currentCategoryName}`);
    }

    componentDidUpdate = (prevProps) =>{
        if(prevProps.currentCategoryName !== this.props.currentCategoryName){
            this.getCategory(`${this.props.currentCategoryName}`);  
        }
    }

    render(){
        return <div className={classNames(this.s.category,{
                    [this.s.dimmed]: this.props.backgroundDimmed,
                })}>
                    <h1 className={this.s.category_name}>{_.upperFirst(this.props.currentCategoryName)}</h1>
                    <div className={this.s.category_cards}>
                        {this.state.products.map((product, index) =>
                            <Card 
                                key={index}   
                                currentCurrency={this.props.currentCurrency}  
                                product={product}
                                getCurrentProductId={this.props.getCurrentProductId}
                                addToCart={this.props.addToCart}
                            >
                            </Card>
                        )}
                    </div>
                </div>
    }
}
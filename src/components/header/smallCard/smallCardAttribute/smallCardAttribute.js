import React from "react";
import styles from "./smallCardAttribute.module.css";
import classNames from "classnames";

export class SmallCardAttribute extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            backgroundColor: this.props.attribute.value,
        };
        this.s = styles;
    }

    render(){
        return  <div className={classNames(this.s.attribute,{
                    [this.s.color]: this.props.name === "Color",
                    [this.s.colorWhite]: this.props.attribute.displayValue === "White",
                })}>
                    <input 
                        disabled={true}
                        key={this.props.index + 500}
                        type="radio" 
                        id={`${this.props.nameComponent}${this.props.cartId}${this.props.name}${this.props.attribute.value}`}
                        name={`${this.props.nameComponent}${this.props.cartId}${this.props.name}`} 
                        value={this.props.attribute.value}
                        defaultChecked={`${(this.props.checkedValue === this.props.attribute.value) ? this.props.checkedValue : ''}`}
                    ></input>
                    <label className={(this.props.name === "Color") ? this.s.color : ""}
                        key={this.props.index + 200}
                        htmlFor={`${this.props.nameComponent}${this.props.cartId}${this.props.name}${this.props.attribute.value}`}
                        style={
                            (this.props.name === "Color") ?
                            { 
                                background:`${this.state.backgroundColor}`,
                                color: `${(this.props.attribute.displayValue === "White") ? "#1D1F22" : "white"}`,
                            } : {}
                        }
                    >{(this.props.name === "Color") ? "" : this.props.attribute.value}</label>
                </div>
                    
    }
}
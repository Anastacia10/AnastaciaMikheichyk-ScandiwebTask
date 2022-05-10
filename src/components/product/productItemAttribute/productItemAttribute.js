import React from "react";
import classNames from "classnames";
import styles from "./productItemAttribute.module.css";

export class ProductItemAttribute extends React.Component{

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
                        key={this.props.index + 500}
                        type="radio" 
                        id={`${this.props.name}${this.props.attribute.value}`}
                        name={`${this.props.name}`} 
                        value={this.props.attribute.value}
                        onClick={(e) => this.props.handlerAttributeInput(e)}
                    ></input>
                    <label className={(this.props.name === "Color") ? this.s.color : ""}
                        key={this.props.index + 200}
                        htmlFor={`${this.props.name}${this.props.attribute.value}`}
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
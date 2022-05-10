import React from "react";
import styles from "../../layout/layout.module.css"

export class CartAttribute extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            backgroundColor: this.props.attribute.value,
            color: (
                this.props.attribute.displayValue === "Black"
            ) ? "white" : "",
            checked: (this.props.checkedValue === this.props.attribute.value) ? "✓": "",
        };
        this.s = styles;
    }

    render(){
        return  <>
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
                                transform: `${(this.props.checkedValue === this.props.attribute.value) ? "scale(1.20)" : ""}`,
                                color: `${(this.props.attribute.displayValue === "White") ? "#1D1F22" : "white"}`,
                            } : {}
                        }
                    ></label>
                </>
                    
    }
}
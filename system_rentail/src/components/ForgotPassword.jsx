import React, { Component, useState, useEffect } from "react";
import "../styles/personaldata.sass";
import { ButtonCancel, ButtonAcept} from "./Buttons";

class ForgotPassword extends Component {
    constructor(props) { 
      super(props);
      this.state = {
        emailP: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(e) { 
      const target = e.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value,
      });
    }
  
    render() {
      const { emailP} = this.state; 
      return (
       
        <div className="container-p">
          <div className="form-p"><h2>Ingresa la siguiente información</h2></div>
          <form onSubmit={this.onSubmit}>
  
            <div className="form-gp">
              <label email="emailP">Correo registrado</label>
              <input
                type="email"
                name="emailP"
                className="slabel"
                ref="emailP"
                value={this.state.emailP}
                onChange={this.handleInputChange}
              />
            </div>

            <ButtonCancel/>
            <ButtonAcept type="submit" />
            
          </form>
        </div>
      );
    }
  }
  export default ForgotPassword; 
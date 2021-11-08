import React, { Component, useState, useEffect } from "react";
import "../styles/personaldata.sass";
import { ButtonCancel, ButtonRegister} from "./Buttons";

class Register extends Component {
    constructor(props) { 
      super(props);
      this.state = {
        nameP: "",
        lastnameP: "",
        emailP: "",
        usernameP: "",
        passwordP: "",
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
      const { nameP, lastnameP, emailP, usernameP, passwordP } = this.state; 
      return (
       
        <div className="container-p">
          <div className="form-p"><h2>Completa los siguientes datos</h2></div>
          <form onSubmit={this.onSubmit}>

            <div className="form-gp">
              <label hname="nameP">Nombre</label>
              <input
                type="text"
                name="nameP"
                className="slabel"
                placeholder="Nombre"
                ref="nameP"
                value={this.state.nameP}
                onChange={this.handleInputChange}
              />
            </div>
  
            <div className="form-gp">
              <label lname="lastnameP">Apellido</label>
              <input
                type="text"
                name="lastnameP"
                className="slabel"
                placeholder="Apellido"
                ref="lastnameP"
                value={this.state.lastnameP}
                onChange={this.handleInputChange}
              />
            </div>
  
            <div className="form-gp">
              <label uname="usernameP">Usuario</label>
              <input
                type="text"
                name="usernameP"
                className="slabel"
                placeholder="Usuario"
                ref="usernameP"
                value={this.state.usernameP}
                onChange={this.handleInputChange}
              />
            </div>
  
            <div className="form-gp">
              <label email="emailP">Correo</label>
              <input
                type="email"
                name="emailP"
                className="slabel"
                placeholder="Correo"
                ref="emailP"
                value={this.state.emailP}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-gp">
              <label pword="passwordP">Password</label>
              <input
                type="password"
                name="passwordP"
                className="slabel"
                placeholder="Password"
                ref="passwordP"
                value={this.state.passwordP}
                onChange={this.handleInputChange}
              />
            </div>
            <ButtonCancel/>
            <ButtonRegister type="submit" />
            
          </form>
        </div>
      );
    }
  }
  export default Register; 
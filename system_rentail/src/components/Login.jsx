import React, { Component, useState, useEffect } from "react";
import '../styles/login.sass';
import "../styles/personaldata.sass";

import { ButtonLogin, ButtonRegister, ButtonPassword} from './Buttons'


/* export function Login(props){
    return(
        

    )
} */


class Login extends Component {
    constructor(props) { 
      super(props);
      this.state = {
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
      const { usernameP, passwordP } = this.state; 
      return (
    
        <div className="container">

            <div className="image">
                <img className="image-icon" src={'http://cdn.onlinewebfonts.com/svg/img_453163.png'} alt="login" />
            </div>

            <div className="info">
                <div className="container-p">
                <div className="form-title"><h2>¡Bienvenido!</h2></div>
                <form onSubmit={this.onSubmit}>

                    <div className="form-gp">
                    <label uname="usernameP">Usuario</label>
                    <input
                        type="text"
                        name="usernameP"
                        className="slabel"
                        ref="usernameP"
                        value={this.state.usernameP}
                        onChange={this.handleInputChange}
                    />
                    </div>
        
                    <div className="form-gp">
                    <label pword="passwordP">Contraseña</label>
                    <input
                        type="password"
                        name="passwordP"
                        className="slabel"
                        ref="passwordP"
                        value={this.state.passwordP}
                        onChange={this.handleInputChange}
                    />
                    </div>
                    <center>
                        <ButtonPassword/>
                    </center>

                    <div className="login-btn">
                        <ButtonLogin type="submit" /> 
                    </div>
                </form>  

                    <center className="register-btn">
                       <ButtonRegister/> 
                    </center>
                
                </div>
            </div>
            
        </div>




        
      );
    }
  }
  export default Login; 
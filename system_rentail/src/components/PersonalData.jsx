import React, { Component, useState, useEffect } from "react";

import "../styles/personaldata.sass";
import { ButtonEdit } from "./Buttons";

class PersonalData extends Component {
  constructor(props) { // so we can obtain the values
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

  //  export  function PersonalData(props) {
  //   state = {
  //     nameP: '',
  //     lastnameP:  '',
  //     emailP:  '',
  //     usernameP:  '',
  //     passwordP:  ''
  //   };

  //   onSubmit = e => { // so we can type
  //       e.preventDefault();
  //       console.log(this.state);
  //   }

  //   onChange = e => this.setState ({ [e.target.name] : e.target.value}); // so we get to change the state without doing it 1 by 1 ...

  handleInputChange(e) { // so we can actually type and change the state without having to do it manually
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { nameP, lastnameP, emailP, usernameP, passwordP } = this.state; // kinda like the constructors we used to use on c#
    return (
      <div className="container-p">
         
        <div className="form-p"><h2>Editar Perfil</h2></div>
        <form onSubmit={this.onSubmit}>
          <div className="form-gp">
            <label hname="nameP">Nombre</label>
            <input
              type="text"
              name="nameP"
              className="slabel"
              placeholder="Name"
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
            <label uname="usernameP">Username</label>
            <input
              type="text"
              name="usernameP"
              className="slabel"
              placeholder="Username"
              ref="usernameP"
              value={this.state.usernameP}
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
          <ButtonEdit type="submit" />
        </form>
      </div>
    );
  }
}
export default PersonalData; // because its a class

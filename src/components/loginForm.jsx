import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { userName: "", password: "" },
    errors: {},
  };

  schema = {
    userName: Joi.string().required().label("User Name"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = (e) => {
    console.log("username => ", this.state.data.userName);
    console.log("password => ", this.state.data.password);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userName", "User Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

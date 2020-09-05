import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = {
      abortEarly: false,
    };
    console.log(this.schema);
    const { error } = Joi.validate(this.state.data, this.schema, options);
    console.log(error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const { error } = Joi.validate(
      { [name]: value },
      { [name]: this.schema[name] }
    );

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate() || {};
    if (Object.keys(errors).length !== 0) {
      this.setState({ errors: errors });
      return;
    }
    this.doSubmit(e);
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  // doSubmit = () => {};
  // doChange = () => {};

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };
  renderButton = (label) => {
    return (
      <button onClick={this.handleSubmit} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;

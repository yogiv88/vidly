import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  const { options: selectOptions, displayProperty, valueProperty } = options;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="custom-select">
        <option value=""></option>
        {selectOptions.map((option) => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[displayProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;

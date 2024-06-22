import React from "react";
import PropTypes from "prop-types";

const FormField = ({ label, type, name, value, onChange, error, options }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} value={value} onChange={onChange}></textarea>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.array,
};

FormField.defaultProps = {
  options: [],
};

export default FormField;

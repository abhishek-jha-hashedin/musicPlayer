import React from 'react'
import PropTypes from 'prop-types';

const TextFieldGroup = ({ field, value, label,type, onChange,required}) => {
    return (
      <div className=" form-group" >
        <label className="control-label">{label}</label>
        <input
          onChange={onChange}
         
          value={value}
          type={type}
          name={field}
          className="form-control"
          required
        />
     
      </div> 
   );
  }

TextFieldGroup.proppTypes={
field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
 
  type:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
 
}
TextFieldGroup.defaultProps = {
    type: 'text'
  }

export default TextFieldGroup;
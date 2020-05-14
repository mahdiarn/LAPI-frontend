import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function RupiahTextFormat(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix="%"
    />
  );
}

RupiahTextFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

  export default RupiahTextFormat
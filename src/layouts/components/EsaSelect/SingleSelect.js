import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  display: 'flex',
  width: '100%'
});

const SingleSelect = ({
  className,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  placeholder = 'Placeholder',
  ...rest
}) => (
  <StyledTextField
    {...rest}
    placeholder={placeholder}
    error={error}
    select
    label={label}
    helperText={helperText}
    className={className}
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    {options.map(type => (
      <MenuItem key={type.key} value={type.value}>
        {type.text}
      </MenuItem>
    ))}
  </StyledTextField>
);

SingleSelect.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

SingleSelect.defaultProps = {
  label: '',
  value: '',
  options: [],
  onChange: () => {}
};

export default SingleSelect;

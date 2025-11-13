import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, Input, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)({
  display: 'flex',
  width: '100%'
});

const MultiSelect = ({ className, label, id, value, onChange, options, shrink, ...rest }) => (
  <StyledFormControl {...rest} className={className}>
    <InputLabel htmlFor={id} shrink={shrink}>
      {label}
    </InputLabel>
    <Select
      multiple
      value={value}
      onChange={e => onChange(e.target.value)}
      input={<Input id={id} />}
      renderValue={selected =>
        options
          .filter(type => selected.includes(type.value))
          .map(type => type.text)
          .join(', ')
      }
    >
      {options.map((type, index) => (
        <MenuItem key={type.text + '-' + index} value={type.value}>
          {type.text}
        </MenuItem>
      ))}
    </Select>
  </StyledFormControl>
);

MultiSelect.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
  value: PropTypes.array,
  options: PropTypes.array,
  shrink: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string
};

MultiSelect.defaultProps = {
  label: '',
  id: '',
  value: [],
  options: []
};

export default MultiSelect;

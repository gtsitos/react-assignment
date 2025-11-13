import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const PortletToolbarRoot = styled('div')({
  justifyContent: 'flex-end',
  alignItems: 'center',
  display: 'flex'
});

const PortletToolbar = ({ className, children, ...rest }) => (
  <PortletToolbarRoot {...rest} className={className}>
    {children}
  </PortletToolbarRoot>
);

PortletToolbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default PortletToolbar;

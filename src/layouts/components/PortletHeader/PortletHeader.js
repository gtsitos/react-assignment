import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const PortletHeaderRoot = styled('div', {
  shouldForwardProp: prop => !['noDivider', 'noPadding'].includes(prop)
})(({ theme, noDivider, noPadding }) => ({
  alignItems: 'center',
  borderBottom: noDivider ? 'none' : `1px solid ${theme.palette.default.border}`,
  borderTopLeftRadius: '2px',
  borderTopRightRadius: '2px',
  display: 'flex',
  height: '40px',
  justifyContent: 'space-between',
  padding: noPadding ? 0 : theme.spacing(1, 3),
  position: 'relative'
}));

const PortletHeader = ({ className, noDivider = false, noPadding = false, children, ...rest }) => (
  <PortletHeaderRoot
    {...rest}
    className={className}
    noDivider={noDivider}
    noPadding={noPadding}
  >
    {children}
  </PortletHeaderRoot>
);

PortletHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  noDivider: PropTypes.bool,
  noPadding: PropTypes.bool
};

export default PortletHeader;

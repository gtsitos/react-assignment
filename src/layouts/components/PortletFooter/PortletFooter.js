import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const PortletFooterRoot = styled('div', {
  shouldForwardProp: prop => prop !== 'noDivider'
})(({ theme, noDivider }) => ({
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderTop: noDivider ? 'none' : `1px solid ${theme.palette.border}`,
  borderBottomLeftRadius: '2px',
  borderBottomRightRadius: '2px'
}));

const PortletFooter = ({ className, noDivider = false, children, ...rest }) => (
  <PortletFooterRoot {...rest} className={className} noDivider={noDivider}>
    {children}
  </PortletFooterRoot>
);

PortletFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  noDivider: PropTypes.bool
};

export default PortletFooter;

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import EsaPaper from '../EsaPaper/EsaPaper';

const PortletRoot = styled(EsaPaper)({
  display: 'flex',
  flexDirection: 'column'
});

const Portlet = ({ className, children, ...rest }) => (
  <PortletRoot {...rest} className={className}>
    {children}
  </PortletRoot>
);

Portlet.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Portlet;

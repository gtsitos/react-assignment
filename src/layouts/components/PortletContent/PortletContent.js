import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const PortletContentRoot = styled('div', {
  shouldForwardProp: prop => prop !== 'noPadding'
})(({ theme, noPadding }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  flexGrow: 1,
  overflowY: 'auto',
  ...(noPadding && { padding: 0 })
}));

const PortletContent = ({
  className,
  children,
  noPadding = false,
  maxHeight,
  contentStyle = {},
  ...rest
}) => (
  <PortletContentRoot
    {...rest}
    className={className}
    noPadding={noPadding}
    style={{ ...(maxHeight ? { maxHeight } : {}), ...contentStyle }}
  >
    {children}
  </PortletContentRoot>
);

PortletContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  maxHeight: PropTypes.number,
  noPadding: PropTypes.bool,
  contentStyle: PropTypes.object
};

export default PortletContent;

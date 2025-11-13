import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const EsaPaperRoot = styled(Paper, {
  shouldForwardProp: prop => !['outlined', 'squared'].includes(prop)
})(({ theme, outlined, squared }) => ({
  borderRadius: squared ? 0 : '4px',
  maxWidth: '100%',
  border: outlined ? `1px solid ${theme.palette.border}` : 0,
  boxShadow: '0 10px 40px 0 rgba(16, 36, 94, 0.2)'
}));

const EsaPaper = forwardRef(function EsaPaper(
  { className, outlined = false, squared = false, children, paperRef, ...rest },
  ref
) {
  return (
    <EsaPaperRoot
      {...rest}
      className={className}
      outlined={outlined}
      squared={squared}
      ref={paperRef ?? ref}
    >
      {children}
    </EsaPaperRoot>
  );
});

EsaPaper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  elevation: PropTypes.number,
  outlined: PropTypes.bool,
  squared: PropTypes.bool,
  paperRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })])
};

EsaPaper.defaultProps = {
  squared: false,
  outlined: false,
  elevation: 0
};

export default EsaPaper;

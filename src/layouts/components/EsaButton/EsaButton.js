import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const colorMap = (theme, key) =>
  ({
    default: {
      main: theme.palette.default.dark,
      hover: theme.palette.default.main
    },
    primary: {
      main: theme.palette.primary.main,
      hover: theme.palette.primary.dark
    },
    secondary: {
      main: theme.palette.secondary.main,
      hover: theme.palette.secondary.dark
    },
    info: {
      main: theme.palette.info.main,
      hover: theme.palette.info.dark
    },
    danger: {
      main: theme.palette.danger.main,
      hover: theme.palette.danger.dark
    },
    dark: {
      main: 'rgb(55,55,55)',
      hover: 'rgba(55,55,55, .9)'
    }
  }[key] || {
    main: theme.palette.default.dark,
    hover: theme.palette.default.main
  });

const StyledButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'colorVariant'
})(({ theme, colorVariant }) => {
  const { main, hover } = colorMap(theme, colorVariant);

  return {
    '&.MuiButton-contained': {
      color: theme.palette.default.contrastText,
      backgroundColor: main,
      '&:hover': {
        backgroundColor: hover
      }
    }
  };
});

const EsaButton = ({ className, children, loading = false, color = 'default', variant = 'contained', ...rest }) => (
  <StyledButton
    {...rest}
    variant={variant}
    className={className}
    colorVariant={color}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : children}
  </StyledButton>
);

EsaButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'danger', 'dark']),
  variant: PropTypes.oneOf(['text', 'outlined', 'contained'])
};

EsaButton.defaultProps = {
  loading: false,
  color: 'default',
  variant: 'contained'
};

export default EsaButton;

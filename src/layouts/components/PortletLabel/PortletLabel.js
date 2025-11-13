import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

const IconWrapper = styled('span')(({ theme }) => ({
  fontSize: '1.3rem',
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  alignItems: 'center',
  display: 'flex'
}));

const Title = styled(Typography)({
  fontWeight: 500,
  fontSize: '1rem'
});

const Subtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  marginLeft: theme.spacing(1),
  color: theme.palette.text.secondary
}));

const PortletLabel = ({ className, icon, title, subtitle, ...rest }) => (
  <Root {...rest} className={className}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {title && <Title variant="h2">{title}</Title>}
    {subtitle && <Subtitle variant="subtitle2">{subtitle}</Subtitle>}
  </Root>
);

PortletLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.node,
  subtitle: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default PortletLabel;

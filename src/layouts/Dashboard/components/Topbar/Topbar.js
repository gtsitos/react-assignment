import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EsaTopNavItem from './components/NavItem/NavItem';

const TopbarRoot = styled('div')(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  top: 0,
  left: 0,
  right: 'auto',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  borderBottom: `1px solid ${theme.palette.borderShadow}`,
  boxShadow: `0 0 35px 0  ${theme.palette.borderShadow}`,
  backgroundColor: theme.palette.common.commonBackground,
  display: 'flex',
  alignItems: 'center',
  height: theme.topBar.height,
  zIndex: theme.zIndex.appBar
}));

const TopbarToolbar = styled(Toolbar)({
  minHeight: 'auto',
  width: '100%',
  paddingLeft: 0
});

const BrandWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.default.dark,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '300px',
  height: theme.topBar.height,
  flexShrink: 0
}));

const Logo = styled(NavLink)(({ theme }) => ({
  width: 'calc(100% - 160px)',
  maxWidth: '100%',
  margin: 'auto',
  fontFamily: 'Montserrat,sans-serif',
  fontSize: '22px',
  fontWeight: 700,
  letterSpacing: 3,
  color: theme.palette.common.white,
  textDecoration: 'none'
}));

const Title = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1)
}));

const Topbar = ({ title = '', className, children }) => (
  <TopbarRoot className={className}>
    <TopbarToolbar>
      <BrandWrapper>
        <Logo to="/">
          EARTH<span style={{ fontWeight: 200 }}>NET</span>
        </Logo>
      </BrandWrapper>
      <Title variant="h6" color="inherit">
        {title}
      </Title>
      <EsaTopNavItem to="/wellbore" title="Wellbore" />
      <EsaTopNavItem to="/histogram" title="Histogram" />
    </TopbarToolbar>
    {children}
  </TopbarRoot>
);

Topbar.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string
};

export default Topbar;

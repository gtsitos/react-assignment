import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  width: 'auto',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textTransform: 'inherit',
  '&:hover': {
    backgroundColor: theme.palette.default.light
  },
  '&.active': {
    backgroundColor: theme.palette.default.light
  },
  '& .MuiListItemText-primary': {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  '&.active .MuiListItemText-primary': {
    color: theme.palette.text.primary
  }
}));

const NavItem = ({ to, title }) => {
  const location = useLocation();
  const isActive = Boolean(matchPath({ path: to, end: true }, location.pathname));

  return (
    <StyledListItem
      button
      component={NavLink}
      to={to}
      end={to === '/'}
      className={isActive ? 'active' : undefined}
    >
      <ListItemText primary={title} />
    </StyledListItem>
  );
};

NavItem.propTypes = {
  icon: PropTypes.node,
  to: PropTypes.string,
  title: PropTypes.string
};

export default NavItem;

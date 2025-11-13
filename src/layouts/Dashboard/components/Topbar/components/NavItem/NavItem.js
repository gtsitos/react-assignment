import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@mui/styles';
import { ListItem, ListItemText } from '@mui/material';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

import styles from './styles';

const useStyles = makeStyles(styles);

const NavItem = ({ to, title }) => {
  const classes = useStyles();
  const location = useLocation();
  const isActive = Boolean(
    matchPath({ path: to, end: true }, location.pathname)
  );

  return (
    <ListItem
      button
      component={NavLink}
      to={to}
      end={to === '/'}
      className={classNames(classes.navItem, {
        [classes.activeListItem]: isActive
      })}
    >
      <ListItemText classes={{ primary: classes.listItemText }} primary={title} />
    </ListItem>
  );
};

NavItem.propTypes = {
  icon: PropTypes.node,
  to: PropTypes.string,
  title: PropTypes.string
};

export default NavItem;

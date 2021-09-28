import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ListItem, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import styles from './styles';
const useStyles = makeStyles(styles);

const NavItem = ({ to, title }) => {
  const classes = useStyles();

  const CustomLink = React.forwardRef((props, ref) => (
    <NavLink to={to} activeClassName={classes.activeListItem} ref={ref} {...props} />
  ));

  return (
    <ListItem button component={CustomLink} className={classes.navItem}>
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

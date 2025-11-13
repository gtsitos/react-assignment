import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import { List, ListItem, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletToolbar
} from '../layouts/components';

// Component styles
const styles = theme => ({
  header: {
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.default.dark,
    color: theme.palette.default.contrastText
  },
  headerLabel: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      fontWeight: 800
    }
  },
  portletContent: {
    height: 0,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column'
  },
  listItem: {
    cursor: 'pointer',
    justifyContent: ' space-between',
    '&.Mui-selected.haveData,&.Mui-selected.haveData:hover': {
      backgroundColor: 'rgba(41, 150, 243, .3)'
    },
    '&:hover, &.Mui-selected,&.Mui-selected:hover': {
      backgroundColor: theme.palette.default.light
    },
    '&::selection': { backgroundColor: 'transparent' }
  }
});

function EsaList({ title, options, selected, select, classes = {} }) {

  const handleSelect = value => {
    const currentIndex = selected.indexOf(value);
    const newSelectedOptions = [...selected];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    select(newSelectedOptions);
  };

  const isSelected = value => selected.includes(value);

  return (
    <Portlet style={{ height: '100%' }}>
      <PortletHeader className={classes.header}>
        <PortletLabel title={title} />
        <PortletToolbar>
          <MoreVertIcon />
        </PortletToolbar>
      </PortletHeader>
      <PortletContent className={classes.portletContent} noPadding>
        <List>
          {options.map(option => (
            <ListItem
              key={option}
              className={classes.listItem}
              selected={isSelected(option)}
              onClick={() => handleSelect(option)}
            >
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>
      </PortletContent>
    </Portlet>
  );
}

EsaList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.node).isRequired,
  selected: PropTypes.arrayOf(PropTypes.node).isRequired,
  select: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EsaList);

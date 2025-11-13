import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletToolbar
} from '../layouts/components';

const StyledPortletHeader = styled(PortletHeader)(({ theme }) => ({
  padding: theme.spacing(0, 1, 0, 2),
  background: theme.palette.default.dark,
  color: theme.palette.default.contrastText
}));

const StyledPortletLabel = styled(PortletLabel)({
  '& .MuiTypography-root': {
    fontSize: '12px',
    fontWeight: 800
  }
});

const StyledPortletContent = styled(PortletContent)({
  height: 0,
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column'
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  justifyContent: 'space-between',
  '&:hover, &.Mui-selected,&.Mui-selected:hover': {
    backgroundColor: theme.palette.default.light
  },
  '&::selection': { backgroundColor: 'transparent' }
}));

const StateContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  minHeight: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  textAlign: 'center'
}));

const RetryButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1)
}));

function normalizeOptions(options) {
  return options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        value: option,
        label: option,
        disabled: false
      };
    }

    return {
      value: option.value ?? option.label,
      label: option.label ?? option.value,
      disabled: Boolean(option.disabled),
      secondary: option.secondary
    };
  });
}

function EsaList({
  title,
  options,
  selected,
  select,
  loading = false,
  error = null,
  onRetry,
  emptyMessage = 'No options available'
}) {
  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);

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

  const handleItemInteraction = (event, option) => {
    if (option.disabled) {
      return;
    }
    event.preventDefault();
    handleSelect(option.value);
  };

  const renderState = content => (
    <StateContainer>
      <div>{content}</div>
    </StateContainer>
  );

  const renderContent = () => {
    if (loading) {
      return renderState(<CircularProgress size={24} aria-label="Loading options" />);
    }

    if (error) {
      return renderState(
        <>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          {onRetry && (
            <RetryButton variant="outlined" size="small" onClick={onRetry}>
              Retry
            </RetryButton>
          )}
        </>
      );
    }

    if (!normalizedOptions.length) {
      return renderState(
        <Typography variant="body2" color="textSecondary">
          {emptyMessage}
        </Typography>
      );
    }

    return (
      <List>
        {normalizedOptions.map(option => (
          <StyledListItem
            key={option.value}
            selected={isSelected(option.value)}
            onClick={event => handleItemInteraction(event, option)}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleItemInteraction(event, option);
              }
            }}
            button
            disabled={option.disabled}
            tabIndex={0}
            aria-pressed={isSelected(option.value)}
            aria-disabled={option.disabled}
          >
            <ListItemText primary={option.label} secondary={option.secondary} />
          </StyledListItem>
        ))}
      </List>
    );
  };

  return (
    <Portlet style={{ height: '100%' }}>
      <StyledPortletHeader>
        <StyledPortletLabel title={title} />
        <PortletToolbar>
          <MoreVertIcon />
        </PortletToolbar>
      </StyledPortletHeader>
      <StyledPortletContent noPadding>{renderContent()}</StyledPortletContent>
    </Portlet>
  );
}

EsaList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool,
        secondary: PropTypes.node
      })
    ])
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  select: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onRetry: PropTypes.func,
  emptyMessage: PropTypes.string
};

export default EsaList;

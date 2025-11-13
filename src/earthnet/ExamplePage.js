import React, { useState } from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EsaLogo from '../EsaLogo';
import EsaPaper from '../layouts/components/EsaPaper/EsaPaper';
import EsaSelect from '../layouts/components/EsaSelect/EsaSelect';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  EsaButton,
  PortletToolbar
} from '../layouts/components';

const FullHeightGrid = styled(Grid)({
  height: '100%'
});

const StyledEsaPaper = styled(EsaPaper)(({ theme }) => ({
  padding: theme.spacing(3)
}));

const StyledEsaButton = styled(EsaButton)(({ theme }) => ({
  marginTop: theme.spacing(3)
}));

const LogoContainer = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& svg': {
    width: '30%'
  },
  gap: theme.spacing(1)
}));

const Header = styled(PortletHeader)(({ theme }) => ({
  padding: theme.spacing(0, 1, 0, 2),
  background: theme.palette.default.dark,
  color: theme.palette.default.contrastText
}));

const Content = styled(PortletContent)({
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

export default function ExamplePage() {
  const [singleValue, onChangeSingle] = useState(1);
  const [multiValue, onChangeMulti] = useState([]);
  const [selectedOptions, setSelect] = useState([]);

  const handleSelect = value => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelect(newSelectedOptions);
  };

  const isSelected = value => selectedOptions.includes(value);

  return (
    <Dashboard>
      <FullHeightGrid container spacing={1}>
        <Grid item xs={12} md={5} container spacing={2}>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Typography variant="body1">* Usage of Paper</Typography>
              <StyledEsaPaper>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <EsaSelect
                      label="single select"
                      value={singleValue}
                      options={[
                        { key: 'one', value: 1, text: 'one' },
                        { key: 'two', value: 2, text: 'two' }
                      ]}
                      onChange={value => onChangeSingle(value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <EsaSelect
                      isMulti
                      label="single select"
                      value={multiValue}
                      options={[
                        { key: 'one', value: 1, text: 'one' },
                        { key: 'two', value: 2, text: 'two' }
                      ]}
                      onChange={value => onChangeMulti(value)}
                    />
                  </Grid>
                </Grid>
              </StyledEsaPaper>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">* Usage of Portlet</Typography>
            </Grid>
            <Grid item xs={5}>
              <Portlet>
                <PortletHeader>
                  <PortletLabel title="Title" />
                </PortletHeader>
                <PortletContent>
                  Portlet Content:
                  <StyledEsaButton fullWidth>
                    Click me
                  </StyledEsaButton>
                </PortletContent>
              </Portlet>
            </Grid>
            <Grid item xs={7}>
              <Portlet>
                <Header>
                  <PortletLabel title="Title" />
                  <PortletToolbar>
                    <MoreVertIcon />
                  </PortletToolbar>
                </Header>
                <Content noPadding>
                  <List>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                      option => (
                        <StyledListItem
                          key={option}
                          selected={isSelected(option)}
                          onClick={() => handleSelect(option)}
                        >
                          <ListItemText primary={`item-${option}`} />
                        </StyledListItem>
                      )
                    )}
                  </List>
                </Content>
              </Portlet>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <LogoContainer>
            <EsaLogo />
          </LogoContainer>
        </Grid>
      </FullHeightGrid>
    </Dashboard>
  );
}

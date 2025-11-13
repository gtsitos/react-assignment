import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Topbar from './components/Topbar/Topbar';

const MainContent = styled('main')(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(9),
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
}));

const Dashboard = ({ title = '', children }) => (
  <Fragment>
    <Topbar title={title} />
    <MainContent>{children}</MainContent>
  </Fragment>
);

export default Dashboard;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormations, fetchLogs, fetchWells } from '../store/reducers/lists';
import { makeStyles, Grid } from '@material-ui/core';
import Dashboard from '../layouts/Dashboard/Dashboard';
import EsaLogo from '../EsaLogo';
import EsaList from './EsaList';
import { EsaButton } from '../layouts/components';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  fullHeight: { height: '100%' },
  paper: {
    padding: theme.spacing(3)
  },
  button: { marginTop: theme.spacing(3) },
  logoContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '30%'
    }
  },
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
  content: {
    display: 'flex',
    alignContent: 'space-between'
  }
});

const useStyles = makeStyles(styles);

export default function Wellbore() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWells());
    dispatch(fetchLogs());
    dispatch(fetchFormations());
  }, []);

  const { wells = [], logs = [], formations = [] } = useSelector(state => state.lists);

  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item container xs={12} md={7} spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <EsaList title="Wells" options={wells.map(({ name }) => name)} />
            </Grid>
            <Grid item xs={4}>
              <EsaList title="Logs" options={logs.map(({ log }) => log)} />
            </Grid>
            <Grid item container xs={4} className={classes.content}>
              <Grid item xs={12} style={{ height: '95%' }}>
                <EsaList title="Formations" options={formations.map(({ name }) => name)} />
              </Grid>
              <Grid item xs={12}>
                <EsaButton fullWidth>Click me</EsaButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={classes.logoContainer}>
            <EsaLogo />
          </div>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

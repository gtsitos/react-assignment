import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFormations,
  fetchLogs,
  fetchWells,
  selectFormations,
  selectLogs,
  selectWells
} from '../store/reducers/lists';
import {
  fetchAllPlots,
  fetchSelectedPlots,
  selectOrientation,
  selectBarModes
} from '../store/reducers/plots';
import { makeStyles, Grid } from '@material-ui/core';
import Dashboard from '../layouts/Dashboard/Dashboard';
import EsaLogo from '../EsaLogo';
import EsaList from './EsaList';
import { EsaButton } from '../layouts/components';
import Plot from 'react-plotly.js';

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

  const {
    wells = [],
    logs = [],
    formations = [],
    selectedWells = [],
    selectedLogs = [],
    selectedFormations = []
  } = useSelector(state => state.lists);

  const { data = [] } = useSelector(state => state.plots);

  const isButtonDisabled =
    selectedWells.length === 0 || selectedLogs.length === 0 || selectedFormations.length === 0;

  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item container xs={12} md={7} spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <EsaList
                title="Wells"
                options={wells.map(({ name }) => name)}
                selected={selectedWells}
                select={i => dispatch(selectWells(i))}
              />
            </Grid>
            <Grid item xs={4}>
              <EsaList
                title="Logs"
                options={logs.map(({ log }) => log)}
                selected={selectedLogs}
                select={i => dispatch(selectLogs(i))}
              />
            </Grid>
            <Grid item container xs={4} className={classes.content}>
              <Grid item xs={12} style={{ height: '95%' }}>
                <EsaList
                  title="Formations"
                  options={formations.map(({ name }) => name)}
                  selected={selectedFormations}
                  select={i => dispatch(selectFormations(i))}
                />
              </Grid>
              <Grid item xs={12}>
                <EsaButton
                  disabled={isButtonDisabled}
                  onClick={() => dispatch(fetchSelectedPlots())}
                  fullWidth
                >
                  Show Plot
                </EsaButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          {data.length === 0 ? (
            <div className={classes.logoContainer}>
              <EsaLogo />
            </div>
          ) : (
            <Plot
              useResizeHandler
              layout={{ title: 'Wells Plot', autosize: true }}
              style={{ width: '100%', height: '100%' }}
              data={data.map(({ x, y, wellId }) => ({
                x,
                y,
                type: 'scatter',
                name: `wellid-${wellId}`
              }))}
            />
          )}
        </Grid>
      </Grid>
    </Dashboard>
  );
}

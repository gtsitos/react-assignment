import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFormations,
  fetchLogs,
  fetchWells,
  selectFormations,
  selectLogs,
  selectWells
} from '../store/reducers/lists';
import { fetchSelectedPlots } from '../store/reducers/plots';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dashboard from '../layouts/Dashboard/Dashboard';
import EsaLogo from '../EsaLogo';
import EsaList from './EsaList';
import { EsaButton } from '../layouts/components';
import Plot from 'react-plotly.js';

const FullHeightGrid = styled(Grid)({
  height: '100%'
});

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

const RetryButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3)
}));

const ContentGrid = styled(Grid)({
  display: 'flex',
  alignContent: 'space-between'
});

const getAllowedIds = (entities, key) => {
  if (!entities.length) {
    return null;
  }

  const allIds = entities.flatMap(entity => entity[key] ?? []);
  return new Set(allIds);
};

export default function Wellbore() {
  const dispatch = useDispatch();

  const {
    wells = [],
    logs = [],
    formations = [],
    selectedWells = [],
    selectedLogs = [],
    selectedFormations = [],
    status,
    error
  } = useSelector(state => state.lists);

  const { data = [], status: plotStatus, error: plotError } = useSelector(state => state.plots);

  const isButtonDisabled =
    selectedWells.length === 0 ||
    selectedLogs.length === 0 ||
    selectedFormations.length === 0 ||
    plotStatus === 'loading';

  const selectedWellEntities = useMemo(
    () => wells.filter(({ name }) => selectedWells.includes(name)),
    [wells, selectedWells]
  );

  const allowedLogIds = useMemo(
    () => getAllowedIds(selectedWellEntities, 'logs'),
    [selectedWellEntities]
  );
  const allowedFormationIds = useMemo(
    () => getAllowedIds(selectedWellEntities, 'formations'),
    [selectedWellEntities]
  );

  const wellOptions = useMemo(
    () => wells.map(({ name }) => ({ value: name, label: name })),
    [wells]
  );

  const logOptions = useMemo(
    () =>
      logs.map(({ log, id }) => ({
        value: log,
        label: log,
        disabled: allowedLogIds ? !allowedLogIds.has(id) : true
      })),
    [logs, allowedLogIds]
  );

  const formationOptions = useMemo(
    () =>
      formations.map(({ name, id }) => ({
        value: name,
        label: name,
        disabled: allowedFormationIds ? !allowedFormationIds.has(id) : true
      })),
    [formations, allowedFormationIds]
  );

  const renderPlotContent = () => {
    if (plotStatus === 'loading') {
      return (
        <LogoContainer>
          <CircularProgress size={32} />
        </LogoContainer>
      );
    }

    if (plotStatus === 'failed') {
      return (
        <LogoContainer>
          <Typography variant="body2" color="error" align="center">
            {plotError || 'Unable to load plots'}
          </Typography>
          <RetryButton variant="outlined" size="small" onClick={() => dispatch(fetchSelectedPlots())}>
            Retry
          </RetryButton>
        </LogoContainer>
      );
    }

    if (data.length === 0) {
      return (
        <LogoContainer>
          <EsaLogo />
        </LogoContainer>
      );
    }

    return (
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
    );
  };

  return (
    <Dashboard>
      <FullHeightGrid container spacing={2}>
        <Grid item container xs={12} md={5} spacing={1}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <EsaList
                title="Wells"
                options={wellOptions}
                selected={selectedWells}
                select={i => dispatch(selectWells(i))}
                loading={status?.wells === 'loading'}
                error={status?.wells === 'failed' ? error?.wells : null}
                onRetry={() => dispatch(fetchWells())}
              />
            </Grid>
            <Grid item xs={4}>
              <EsaList
                title="Logs"
                options={logOptions}
                selected={selectedLogs}
                select={i => dispatch(selectLogs(i))}
                loading={status?.logs === 'loading'}
                error={status?.logs === 'failed' ? error?.logs : null}
                onRetry={() => dispatch(fetchLogs())}
              />
            </Grid>
            <ContentGrid item container xs={4} spacing={1}>
              <Grid item xs={12} style={{ height: '93%' }}>
                <EsaList
                  title="Formations"
                  options={formationOptions}
                  selected={selectedFormations}
                  select={i => dispatch(selectFormations(i))}
                  loading={status?.formations === 'loading'}
                  error={status?.formations === 'failed' ? error?.formations : null}
                  onRetry={() => dispatch(fetchFormations())}
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
            </ContentGrid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          {renderPlotContent()}
        </Grid>
      </FullHeightGrid>
    </Dashboard>
  );
}

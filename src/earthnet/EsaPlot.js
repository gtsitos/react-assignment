import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

function EsaPlot({ title, data }) {
  return <Plot data={data} layout={{ width: '100%', height: '100%', title }} />;
}

EsaPlot.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array
};

export default EsaPlot;

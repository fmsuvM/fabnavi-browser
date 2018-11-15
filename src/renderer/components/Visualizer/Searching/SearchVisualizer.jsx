import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import Tree from './Components/Tree.jsx';
import data from './utils/data';

const debug = Debug('fabnavi:visualizer:SearchVisualizer');

const SearchVisualizer = () => {
  return <Tree data={data} width={window.innerWidth} height={window.innerHeight} />;
};

export default SearchVisualizer;

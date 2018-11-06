import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import Player from './Visualizer/Player';
import ProcessVisualizer from './Visualizer/ProcessVisualizer';
import { PageFrame } from '../stylesheets/application/Visualizer';

const debug = Debug('fabnavi:components:Visualizer');

class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0
    };
  }

  render() {
    return (
      <PageFrame>
        <Player />
      </PageFrame>
    );
  }
}

Visualizer.propTypes = {
  project: PropTypes.object
};

const mapStateToProps = state => ({
  project: state.player.project
});

export default connect(
  mapStateToProps,
  null
)(Visualizer);

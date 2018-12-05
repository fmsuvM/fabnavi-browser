import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import MainView from '../../player/MainView';
import { playerChangePage } from '../../actions/player';
import VideoPlayer from '../Player/VideoPlayer.jsx';
import ImageSelector from '../Player/ImageSelector.jsx';
import FiguresAnnotation from './FiguresAnnotation.jsx';
import DetectedFigures from './AnnotationTool/DetectedFigures.jsx';
import AnnotationInterface from './AnnotationTool/AnnotationInterface.jsx';

import { buildFigureUrl } from '../../utils/playerUtils';

import { ImagePlayer, ImageType } from '../../stylesheets/player/Player';
import { AnnotationPlayerFrame } from '../../stylesheets/application/ProjectEditForm/AnnotationPlater';

const debug = Debug('fabnavi:jsx:Player');

export class AnnotationPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      toggleUpdate: false,
      mode: 'all',
      rectangles: [],
      detection: []
    };
    this.handleThumbnailClick = e => {
      e.stopPropagation();
      if(this.props.contentType === 'movie') {
        this.setState({
          index: parseInt(e.target.dataset.index, 10)
        });
      } else {
        this.props.changePage(parseInt(e.target.dataset.index, 10) - this.props.page);
      }
    };

    this.videoChanged = index => {
      this.setState({ index: index });
    };

    this.selectMode = (e, mode) => {
      e.preventDefault();
      this.setState({
        mode: mode
      });
    };

    this.addRectangles = (rect, count) => {
      debug('rect: ', rect);
      debug('count: ', count);
      this.setState({
        rectangles: this.state.rectangles.push(rect)
      });
    };
  }

  componentDidMount() {}

  render() {
    const mode = ['all', 'detected', 'unknown', 'raw'];
    return (
      <AnnotationPlayerFrame>
        {this.props.project ? (
          this.state.mode === 'raw' ? (
            <FiguresAnnotation
              contents={this.props.project.content}
              index={this.state.index}
              config={this.props.config}
              mode={mode}
              selectMode={this.state.mode}
              onSelectMode={this.selectMode}
              addRectangles={this.addRectangles}
            />
          ) : (
            <DetectedFigures
              contents={this.props.project.content}
              index={this.state.index}
              mode={mode}
              selectedMode={this.state.mode}
              onSelectMode={this.selectMode}
            />
          )
        ) : null}

        {this.props.project ? (
          <ImageSelector
            contents={this.props.project.content}
            handleThumbnailClick={this.handleThumbnailClick}
            size={this.props.size}
            index={this.state.index}
            isEditable={this.props.isEditable}
            handleThumbnailDeleteButtonClick={this.props.handleThumbnailDeleteButtonClick}
            handleThumbanailOrderChange={this.props.handleThumbanailOrderChange}
          />
        ) : null}

        {this.props.project ? (
          <AnnotationInterface
            contents={this.props.project.content}
            index={this.state.index}
            config={this.props.config}
            mode={this.state.mode}
            labels={this.state.rectangles}
          />
        ) : null}
      </AnnotationPlayerFrame>
    );
  }
}

export const mapStateToProps = state => ({
  project: state.player.project,
  page: state.player.page,
  config: state.player.config,
  contentType: state.player.contentType,
  mode: state.player.mode,
  figures: state.analyzer.figures
});

export const mapDispatchToProps = dispatch => ({
  changePage: step => {
    dispatch(playerChangePage({ step: step }));
  }
});

AnnotationPlayer.propTypes = {
  project: PropTypes.object,
  contentType: PropTypes.string,
  mode: PropTypes.string,
  page: PropTypes.number,
  config: PropTypes.object,
  changePage: PropTypes.func,
  toggleUpdate: PropTypes.bool,
  size: PropTypes.string,
  isEditable: PropTypes.bool,
  handleThumbnailDeleteButtonClick: PropTypes.func,
  handleThumbanailOrderChange: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(AnnotationPlayer);

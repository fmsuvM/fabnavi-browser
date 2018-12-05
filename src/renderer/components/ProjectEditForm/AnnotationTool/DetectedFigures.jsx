import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Konva from 'konva';
import { Stage, Layer, Image, Rect } from 'react-konva';
import Debug from 'debug';

import Portal from './Portal.jsx';
import { Title, Root, ExtendRoot } from '../../../stylesheets/player/ImageSelector';
import { EditFrame, ModeSelector } from '../../../stylesheets/application/ProjectEditForm/FiguresAnnotation';

const debug = Debug('fabnavi:AnnotationPlayer:DetectedFigures');

class DetectedFigures extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null
    };
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.contents[this.props.index].figure.file.thumb.url;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    const figure = this.props.figures[this.props.index];
    return (
      <ExtendRoot>
        <Title>Image</Title>
        <Stage width={544} height={306}>
          <Layer>
            <Image
              image={this.state.image}
              ref={node => {
                this.imageNode = node;
              }}
              width={544}
              height={306}
            />
          </Layer>
          {!this.props.isFetching ? (
            !Object.keys(figure.detection).length ? null : (
              <RectanglesView mode={this.props.selectedMode} result={figure.detection} />
            )
          ) : (
            <Portal>
              <p>now loading...</p>
            </Portal>
          )}
        </Stage>
        <EditFrame>
          {this.props.mode.map((mode, index) => (
            <ModeSelector
              key={index}
              onClick={e => this.props.onSelectMode(e, mode)}
              selected={mode === this.props.selectedMode}
            >
              {mode}
            </ModeSelector>
          ))}
        </EditFrame>
      </ExtendRoot>
    );
  }
}

const RectanglesView = ({ mode, result }) => {
  const detected =
    result.detected.length !== 0 ?
      result.detected :
      [
        {
          x: 0,
          y: 0,
          w: 0,
          h: 0
        }
      ];
  const unknown =
    result.unknown.length !== 0 ?
      result.unknown :
      [
        {
          x: 0,
          y: 0,
          w: 0,
          h: 0
        }
      ];
  return (
    <Layer>
      {mode === 'detected' || mode === 'all' ?
        detected.map((content, index) => {
          const resize = 1280 / 544;
          const x = content.x / resize;
          const y = content.y / resize;
          const width = content.w / resize;
          const height = content.h / resize;
          return <Rect key={index} x={x} y={y} width={width} height={height} stroke="red" strokeWidth={1} />;
        }) :
        null}
      {mode === 'unknown' || mode === 'all' ?
        unknown.map((content, index) => {
          const resize = 1280 / 544;
          const x = content.x / resize;
          const y = content.y / resize;
          const width = content.w / resize;
          const height = content.h / resize;
          return <Rect key={index} x={x} y={y} width={width} height={height} stroke="red" strokeWidth={1} />;
        }) :
        null}
    </Layer>
  );
};

const mapStateToProps = state => ({
  isFetching: state.analyzer.isFetching,
  figures: state.analyzer.figures
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetectedFigures);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Konva from 'konva';
import { Stage, Layer, Image, Rect } from 'react-konva';
import Debug from 'debug';

import { Title, Root } from '../../../stylesheets/player/ImageSelector';
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
      <Root>
        <Title>Annotation</Title>
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
          {/* <Layer> */}
          {!this.props.isFetching ? (
            !Object.keys(figure.detection).length ? null : (
              // <Rect x={20} y={50} width={100} height={100} fill="red" shadowBlur={10} />
              <RectanglesView mode={this.props.selectedMode} result={figure.detection} />
            )
          ) : (
            <div>
              <p>now loading...</p>
            </div>
          )}
          {/* </Layer> */}
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
      </Root>
    );
  }
}

const RectanglesView = ({ mode, result }) => {
  const detected = result.detected;
  const unknown = result.unknown;
  return (
    <Layer>
      {mode === 'detected' || mode === 'all' ?
        detected.map((content, index) => {
          const x = content.points[0];
          const y = content.points[1];
          const width = content.points[2];
          const height = content.points[3];
          return <Rect key={index} x={x} y={y} width={width} height={height} stroke="red" strokeWidth={3} />;
        }) :
        null}
      {mode === 'unknown' || mode === 'all' ?
        unknown.map((content, index) => {
          const x = content.points[0];
          const y = content.points[1];
          const width = content.points[2];
          const height = content.points[3];
          return <Rect key={index} x={x} y={y} width={width} height={height} stroke="red" strokeWidth={3} />;
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

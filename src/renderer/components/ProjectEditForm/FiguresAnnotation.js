import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import FigureAnnotation from './FigureAnnotation';
import { Title, Root } from '../../stylesheets/player/ImageSelector';

const debug = Debug('fabnavi:ProjectEditForm:FiguresAnnotation');

class FiguresAnnotation extends React.Component {
  constructor(props) {
    super(props);

    this.clearCanvas = () => {
      this.canvas.clear();
    };
    this.canvas = null;
    this.currentImage = null;
    this.setCanvasElement = cvs => {
      this.canvasElement = cvs;
    };
    this.updateCanvas = this.updateCanvas.bind(this);
    this.state = {
      drawing: false
    };
  }

  componentDidMount() {
    debug('canvas element: ', this.canvasElement);
    if(this.canvasElement) {
      this.canvas = new FigureAnnotation(this.canvasElement);
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  startPoint(e, x, y) {
    this.setState({ drawing: true });
    debug('native event: ', e.nativeEvent);
    const ctx = this.canvasElement.getContext('2d');
    debug('ctx: ', ctx);
    ctx.moveTo(x, y);
  }

  draw(x, y) {
    if(!this.state.drawing) {
      return;
    }
    const ctx = this.canvasElement.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  endPoint() {
    this.setState({ drawing: false });
  }

  render() {
    return (
      <Root>
        <Title>Annotation</Title>
        <canvas
          style={{
            width: '544px',
            height: '306px',
            border: '1px solid red'
          }}
          ref={this.setCanvasElement}
          onMouseDown={e => this.startPoint(e, e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
          onMouseUp={() => this.endPoint()}
          onMouseLeave={() => this.endPoint()}
          onMouseMove={e => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        />
      </Root>
    );
  }

  updateCanvas() {
    const getCurrentFigure = index => {
      return new Promise((resolve, reject) => {
        const figure = this.props.contents[index].figure.file.thumb.url;
        const img = new Image();
        // this.canvas.redraw(); // 毎回走らせないで，前のstateと違う場合のみに走らせる
        img.src = figure;
        img.onload = event => {
          resolve(event.target);
        };
        img.onerror = reject;
      });
    };

    getCurrentFigure(this.props.index)
      .then(img => {
        this.currentImage = img;
        this.canvas.draw(this.currentImage, this.props.config);
      })
      .catch(e => {
        debug('failed to load Image', e);
      });
  }
}

FiguresAnnotation.propTypes = {
  contents: PropTypes.array,
  index: PropTypes.number,
  config: PropTypes.object
};

export default FiguresAnnotation;

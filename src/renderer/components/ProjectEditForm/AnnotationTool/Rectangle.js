import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';
import Debug from 'debug';

const debug = Debug('fabnavi:AnnotationTool:Rectangle');

class Rectangle extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const{
        props: { onTransform }
      } = this;
      const shape = event.target;
      onTransform({
        x: shape.x(),
        y: shape.y(),
        width: shape.width() * shape.scaleX(),
        height: shape.height() * shape.scaleY(),
        rotation: shape.rotation()
      });
    };

    this.handleMouseEnter = event => {
      const shape = event.target;
      shape.stroke('#3DF6FF');
      shape.getStage().container().style.cursor = 'move'; // Cursorの形変更
      this.rect.getLayer().draw();
    };

    this.handleMouseLeave = event => {
      const shape = event.target;
      shape.stroke(this.props.stroke);
      shape.getStage().container().style.cursor = 'crosshair';
      this.rect.getLayer().draw();
    };
  }

  componentDidUpdate() {
    this.rect.getLayer().batchDraw();
  }

  render() {
    const{ x, y, width, name, stroke } = this.props;
    let height = this.props.height;
    if(Number.isNaN(height)) height = 'auto';
    return (
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        scaleX={1}
        scaleY={1}
        stroke={stroke}
        strokeWidth={3}
        name={name}
        onDragEnd={this.handleChange}
        onTransformEnd={this.handleChange}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        draggable
        ref={node => {
          this.rect = node;
        }}
      />
    );
  }
}

Rectangle.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  stroke: PropTypes.string,
  name: PropTypes.string,
  onTransform: PropTypes.func
};

export default Rectangle;

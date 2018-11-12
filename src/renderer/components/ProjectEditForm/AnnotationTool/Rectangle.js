import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';
import Debug from 'debug';

const debug = Debug('fabnavi:AnnotationTool:Rectangle');

class Rectangle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.rect.getLayer().batchDraw();
  }

  handleChange(event) {
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
  }

  handleMouseEnter(event) {
    const shape = event.target;
    shape.stroke('#3DF6FF'); //TODO: detectionごとに色を変える
    shape.getStage().container().style.cursor = 'move'; // Cursorの形変更
    this.rect.getLayer().draw();
  }

  handleMouseLeave(event) {
    const shape = event.target;
    shape.stroke('#00A3AA'); // TODO: どこで使われている色なのかを確認
    shape.getStage().container().style.cursor = 'crosshair';
    this.rect.getLayer().draw();
  }

  render() {
    const{
      props: { x, y, width, height, name, stroke },
      handleChange,
      handleMouseEnter,
      handleMouseLeave
    } = this;
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
        onDragEnd={handleChange}
        onTransformEnd={handleChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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

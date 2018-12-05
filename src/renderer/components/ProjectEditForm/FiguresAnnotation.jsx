import React from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import Debug from 'debug';
import shortid from 'shortid';

import AnnotationImage from './AnnotationTool/AnnotationImage.jsx';
import Rectangle from './AnnotationTool/Rectangle.jsx';
import RectTransformer from './AnnotationTool/RectTransformer.jsx';
import AnnotationWords from './AnnotationTool/AnnotationWords.jsx';
import { Title, Root, ExtendRoot } from '../../stylesheets/player/ImageSelector';
import { EditFrame, SubTitle, ModeSelector } from '../../stylesheets/application/ProjectEditForm/FiguresAnnotation';

const debug = Debug('fabnavi:ProjectEditForm:_FiguresAnnotation');

class FiguresAnnotation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rectangles: [],
      rectCount: 0,
      selectedShapeName: '',
      mouseDown: false,
      mouseDraw: false,
      newRectX: 0,
      newRectY: 0
    };

    this.generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for(let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    this.handleStageMouseDown = event => {
      const{ rectangles } = this.state;
      if(event.target.className === 'Image') {
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();
        this.setState({
          mouseDown: true,
          newRectX: mousePos.x,
          newRectY: mousePos.y,
          selectedShapeName: ''
        });
        return;
      }

      const clickedOnTransformer = event.target.getParent().className === 'Transformer';
      if(clickedOnTransformer) return;

      const name = event.target.name();
      const rect = rectangles.find(r => r.name === name);
      if(rect) {
        this.setState({
          selectedShapeName: name,
          rectangles
        });
      } else {
        this.setState({
          selectedShapeName: ''
        });
      }
    };

    this.handleRectChange = (index, newProps) => {
      const{ rectangles } = this.state;
      rectangles[index] = {
        ...rectangles[index],
        ...newProps
      };
      this.setState({
        rectangles
      });
    };

    this.handleNewRectChange = event => {
      const{ rectangles, rectCount, newRectX, newRectY } = this.state;
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      if(!rectangles[rectCount]) {
        rectangles.push({
          x: newRectX,
          y: newRectY,
          width: mousePos.x - newRectX,
          height: mousePos - newRectY,
          name: `rect${rectCount + 1}`,
          stroke: this.generateRandomColor(),
          key: shortid.generate()
        });
        return this.setState({ rectangles, mouseDraw: true });
      }
      rectangles[rectCount].width = mousePos.x - newRectX;
      rectangles[rectCount].height = mousePos.y - newRectY;
      return this.setState({ rectangles });
    };

    this.handleStageMouseUp = () => {
      const{ rectCount, mouseDraw, rectangles } = this.state;
      if(mouseDraw) {
        this.setState({ rectCount: rectCount + 1, mouseDraw: false });
      }
      this.setState({ mouseDown: false });
    };
  }

  componentDidMount() {
    this.img.moveToBottom();
  }

  handleClearRects(e) {
    e.preventDefault();
    this.clearRects(e);
  }

  clearRects(e) {
    this.setState({
      rectangles: []
    });
  }

  render() {
    return (
      <ExtendRoot>
        <Title>Image</Title>
        <Stage
          ref={node => {
            this.stage = node;
          }}
          onMouseDown={this.handleStageMouseDown}
          onTouchStart={this.handleStageMouseDown}
          onMouseMove={this.state.mouseDown && this.handleNewRectChange}
          onTouchMove={this.state.mouseDown && this.handleNewRectChange}
          onMouseUp={this.state.mouseDown && this.handleStageMouseUp}
          onTouchEnd={this.state.mouseDown && this.handleStageMouseUp}
          width={544}
          height={306}
        >
          <Layer>
            {this.state.rectangles.map((rect, i) => (
              <Rectangle
                sclassName="rect"
                key={rect.key}
                {...rect}
                onTransform={newProps => {
                  this.handleRectChange(i, newProps);
                }}
              />
            ))}
            <RectTransformer selectedShapeName={this.state.selectedShapeName} />
          </Layer>
          <Layer
            ref={node => {
              this.img = node;
            }}
          >
            <AnnotationImage imageUrl={this.props.contents[this.props.index].figure.file.thumb.url} />
          </Layer>
        </Stage>
        <EditFrame>
          {this.props.mode.map((mode, index) => (
            <ModeSelector
              key={index}
              onClick={e => this.props.onSelectMode(e, mode)}
              selected={mode === this.props.selectMode}
            >
              {mode}
            </ModeSelector>
          ))}
        </EditFrame>
      </ExtendRoot>
    );
  }
}

FiguresAnnotation.propTypes = {
  contents: PropTypes.array,
  index: PropTypes.number
};

export default FiguresAnnotation;

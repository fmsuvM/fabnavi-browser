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
      drawing: false,
      config: {
        x: 0,
        y: 0,
        w: 1280,
        h: 720
      },
      currentFigure: 0,
      figures: []
    };
  }

  componentDidMount() {
    debug('canvas element: ', this.canvasElement);
    if(this.canvasElement) {
      this.canvas = new FigureAnnotation(this.canvasElement);
      this.updateCanvas();
    }
    this.setState({
      figures: this.props.contents.map(() => {
        const template = {
          settings: false,
          properties: []
        };
        return template;
      })
    });
  }

  /**
   * update canvasについて
   * onMouseDownしたら四角形を追加できる様にしたい
   * しかし，updateCanvasの時点で毎回消して新しく病がしている現実がある
   * なので，一枚ずつ設定を保存しておく必要がある．
   * これをstateで行う
   * 最初に，画像の枚数分のstateを作る．in componentDidMount
   * this.setState({
   *    figures: [
   *        {
   *            'settings': boolean (init: false)
   *             'range': {
   *                  startx: 0,
   *                  starty: 0,
   *                  endx: 0,
   *                  endy: 0
   *              }
   *        }
   *    ]
   * })
   * こんな感じで作って，settings: true の時にupdateCanvas内で描画を走らせる．
   * drawing中は `updateCanvas` を走らせないことも重要
   * 押してrect 描画たらdrawing: true
   * かつ，描画する際の設定をstate に保存
   * そしてdrawing: false
   * update canvasが走るが，条件分岐をudpate canvas内に書いておけばsettingsを読み込んでdraw rectする
   * とりあえずこの仕組みを作る
   */
  componentDidUpdate() {
    // ここでstateによる条件分岐を行う
    if(!this.state.drawing)this.updateCanvas();
  }

  // this.setState({
  //   figures: this.state.figures
  //     .sort((a, b) => a.position - b.position)
  //     .map((figure, i) => {
  //       if(i !== figureIndex) return figure;
  //       figure.step_tags.splice(tagIndex, 1);
  //       return figure;
  //     })
  // });

  addRect(e, x, y) {
    this.canvas.drawRect(x, y, 300, 100, 'rgb(200,0,0)');
    this.setState({
      drawing: true,
      figures: this.state.figures.map((figure, i) => {
        if(i !== this.state.currentFigure) return figure;
        figure.settings = true;
        figure.properties.push({
          startx: x,
          starty: y,
          endx: 300,
          endy: 100
        });
        return figure;
      })
    });
  }

  endDrawing() {
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
          onMouseDown={e => this.addRect(e, e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
          onMouseLeave={() => this.endDrawing()}
          onMouseUp={() => this.endDrawing()}
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
        this.canvas.draw(this.currentImage, this.state.config);
        const properties = this.state.figures[this.props.index].properties;
        debug('state: ', this.state);
        if(this.state.figures[this.props.index].settings) {
          properties.map(property => {
            this.canvas.drawRect(property.startx, property.starty, property.endx, property.endy, 'rgb(200,0,0)');
          });
        }
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

import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { Stage, Layer, Circle, Line } from 'react-konva';
import { arrayMove } from 'react-sortable-hoc';

import { VisualizeFrame } from '../../stylesheets/application/visualizer/ProcessVisualizer';

const debug = Debug('fabnavi:components:ProcessVisualizer');
const end = window.innerWidth;

/**
 * left margin ... 50px
 * right margin ... 50px
 */

export default class ProcessVisualizer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const project = this.props.project;
    const step = project.content.length;
    const currentStep = this.props.index;
    return (
      <VisualizeFrame>
        <Stage width={window.innerWidth} height={window.innerHeight / 5.5}>
          <Layer>
            <Line x={50} y={0} stroke="red" points={[0, 100, end - 100, 100]} />
            {project.content.map((_content, index) => {
              return (
                <DrawNode
                  key={index}
                  index={index}
                  step={step}
                  contents={_content}
                  isSelected={index === currentStep}
                  onClick={this.props.handleThumbnailClick}
                />
              );
            })}
          </Layer>
        </Stage>
      </VisualizeFrame>
    );
  }
}

// step: 合計ステップ数
// index: 現在のステップ数
// TODO: 工程数に応じてnodeの大きさを変える
// TODO: 工程ごとに，タグ付けできるようにする．→一旦stateか何かで保持しておくようにするか
// TODO: 一つの工程を選択したら，同様の，または類似度の高い工程を含むコンテンツを提示する→視覚定時
// TODO: 直列に行うか，並列に行うかを考察する．EDITで編集できるようにするかどうか．並列になった場合どうするのか．指示があったが方がいいのか
const DrawNode = ({ index, step, contents, onClick, isSelected }) => {
  let nodepos;
  let nodeColor = '#000';
  if(index === 0) {
    nodepos = 50 + index * (end / (step - 1));
  } else if(index + 1 == step) {
    nodepos = index * (end / (step - 1)) - 50;
  } else {
    nodepos = index * (end / (step - 1));
  }

  if(isSelected) {
    nodeColor = '#00ff00';
  }

  return <Circle fill={nodeColor} x={nodepos} y={100} radius={25} onClick={onClick} />;
};

ProcessVisualizer.propTypes = {
  children: PropTypes.string,
  project: PropTypes.object,
  step: PropTypes.number,
  index: PropTypes.number,
  handleThumbnailClick: PropTypes.func
};

DrawNode.propTypes = {
  index: PropTypes.number,
  step: PropTypes.number,
  contents: PropTypes.object,
  isSelected: PropTypes.bool
};

import React, { Fragment } from 'react';
import { Group } from '@vx/group';

import { ShowButton } from '../../../../stylesheets/visualizer/NodeStyle';

const RootNode = ({ node, onClick }) => {
  return (
    <g>
      <circle r={30} fill="url('#lg')" onClick={onClick} />
      <text
        dy={'.33em'}
        fontSize={23}
        fontFamily="YuGothic"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none', fontWeight: 900 }}
        fill={'#71248e'}
      >
        {node.data.name}
      </text>
    </g>
  );
};

const ShowRelationButton = ({ node, width, height, onClick }) => {
  const theta = 12;
  const initX = width / 2.3;
  const initY = initX * Math.tan(theta * (Math.PI / 180));
  const p1x = initX + initY * Math.sqrt(3);
  const p1y = 0;
  const p2x = initX;
  const p2y = initY - initY * 2;
  return <polygon onClick={onClick} fill="#fc943a" points={`${initX},${initY}, ${p1x},${p1y}, ${p2x},${p2y}`} />;
};

const NodeShowingButton = ({ node, width, height, onPopup }) => {
  return (
    <ShowButton>
      <rect
        height={height / 3}
        width={width / 1.5}
        x={-width / 3}
        y={height / 18}
        fill={'#13AE67'}
        stroke={'#111111'}
        strokeWidth={1}
        rx={8}
        ry={8}
        onClick={onPopup}
      />
      <text
        dy={'1.5em'}
        fontSize={15}
        fontFamily="YuGothic"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none', fontWeight: 900 }}
        fill={'white'}
      >
        Open
      </text>
    </ShowButton>
  );
};

const NodeFrame = ({ node, width, height, onClick, onPopup }) => {
  return (
    <g>
      {node.data.children && <ShowRelationButton width={width} height={height} onClick={onClick} />}
      <rect
        height={height}
        width={width}
        y={-height / 2}
        x={-width / 2}
        fill="#eff3f9"
        stroke={'#111111'}
        strokeWidth={1}
        rx={10}
        ry={10}
        onClick={onClick}
      />
      <text
        dy={'-.5em'}
        fontSize={23}
        fontFamily="YuGothic"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none', fontWeight: 900 }}
        fill="#71248e"
      >
        {node.data.name}
      </text>
      <NodeShowingButton node={node} width={width} height={height} onPopup={onPopup} />
    </g>
  );
};

const Node = ({ node, onClick, onPopup }) => {
  const width = 150;
  const height = 80;
  return (
    <Fragment>
      {node.depth == 0 && <RootNode node={node} r={30} fill="url('#lg')" onClick={onClick} />}
      {node.depth !== 0 && <NodeFrame node={node} width={width} height={height} onClick={onClick} onPopup={onPopup} />}
    </Fragment>
  );
};

export default Node;

import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { Transition, animated, template } from 'react-spring';

import Node from './Node.jsx';
import { findCollapsedParent, getTopLeft } from '../utils/getPointUtils';

const debug = Debug('fabnavi:SearchVisualizer:NodeSpring');
const keyAccessor = n => n.data.name;

const Nodes = ({ nodes, layout, orientation, onNodeClick }) => {
  return (
    <Transition
      native
      keys={nodes}
      accessor={keyAccessor}
      config={{ tension: 1000, friction: 130, mass: 5 }}
      from={node => {
        const parentTopLeft = getTopLeft(node.parent || { x: 0, y: 0 }, layout, orientation);
        return {
          top: parentTopLeft.top,
          left: parentTopLeft.left,
          opacity: 0
        };
      }}
      enter={node => {
        const topLeft = getTopLeft(node, layout, orientation);
        return {
          top: topLeft.top,
          left: topLeft.left,
          opacity: 1
        };
      }}
      update={node => {
        const topLeft = getTopLeft(node, layout, orientation);
        return {
          top: topLeft.top,
          left: topLeft.left,
          opacity: 1
        };
      }}
      leave={node => {
        const collapsedParent = findCollapsedParent(node.parent);
        const collapsedParentPrevPos = {
          x: collapsedParent.data.x0,
          y: collapsedParent.data.y0
        };
        const topLeft = getTopLeft(collapsedParentPrevPos, layout, orientation);
        return {
          top: topLeft.top,
          left: topLeft.left,
          opacity: 0
        };
      }}
    >
      {nodes.map(node => styles => {
        const key = keyAccessor(node);
        return (
          <animated.g
            className="cx-group"
            width={40}
            height={20}
            opacity={styles.opacity}
            transform={template`translate(${styles.left}, ${styles.top})`}
            key={key}
          >
            <Node node={node} layout={layout} orientation={orientation} onClick={() => onNodeClick(node)} key={key} />
          </animated.g>
        );
      })}
    </Transition>
  );
};

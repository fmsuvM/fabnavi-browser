import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinearGradient } from '@vx/gradient';
import { hierarchy } from 'd3-hierarchy';
import { connect } from 'react-redux';

import Links from './LinksMove.jsx';
import Nodes from './NodesMove.jsx';

import { requestSearchProjects } from '../../../../actions/manager';

import {
  SearchUIFrame,
  ModeSelectorFrame,
  ModeLabel,
  TagsFrame,
  StyledTagName
} from '../../../../stylesheets/visualizer/Tree';
import { Select, Button } from '@smooth-ui/core-sc';
import PopupModal from './PopupModal.jsx';

const debug = Debug('fabnavi:visualizer:Tree');

class VisualizeTree extends React.Component {
  /**
   * layout ...cartesian(one direction) or polar(circle)
   * orientation ... vertical(up to down) or horizontal(left to right)
   * linkType ... diagonal(a little curve) or step(line) or curve or line(binary tree like) or elbow(this is customize)
   * step percent ... a position of splitting branch
   * default ... cartesian , horizontal , diagonal. this is ok
   * original ... cartesian , horizontal , step ?
   * custom ... polar , (horizontal), step
   */

  state = {
    layout: 'cartesian',
    orientation: 'horizontal',
    linkType: 'diagonal',
    stepPercent: 0.5,
    popup: false
  };

  nodeClick = node => {
    debug('node: ', node);
    this.props.searchProjects(['fmsuvM']);
    // TODO: update async
    setTimeout(() => {
      debug('state: ', this.props.projects);
      if(!node.data.isExpanded) {
        node.data.x0 = node.x;
        node.data.y0 = node.y;
      }
      node.data.isExpanded = !node.data.isExpanded;
      this.forceUpdate();
    }, 500);
  };

  popupModal = node => {
    debug('node: ', node);
    this.setState({
      popup: !this.state.popup
    });
  };

  render() {
    const{
      data,
      width,
      height,
      events = false,
      margin = {
        top: 100,
        left: 100,
        right: 100,
        bottom: 100
      }
    } = this.props;
    const{ layout, orientation, linkType, stepPercent } = this.state;

    if(width < 10) return null;

    // a size of inner frame (not root size)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin;
    let sizeWidth;
    let sizeHeight;

    if(layout === 'polar') {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if(orientation === 'vertical') {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
      }
    }

    // a sanitizeing own data. judge whether data of myself has child data.
    const root = hierarchy(data, d => (d.isExpanded ? d.children : null));

    return (
      <div>
        <SearchUIFrame>
          <ModeLabel>Mode Selector:</ModeLabel>
          <ModeSelectorFrame>
            <Select
              onChange={e =>
                this.setState({
                  layout: e.target.value,
                  linkType: e.target.value === 'cartesian' ? 'diagonal' : 'step'
                })
              }
              value={layout}
            >
              <option value="cartesian">cartesian</option>
              <option value="polar">polar</option>
            </Select>
          </ModeSelectorFrame>
          <TagsFrame>
            <ModeLabel>Tags:</ModeLabel>
            <Button ml={10} variant="success">
              テスト1
            </Button>
            <Button ml={10} variant="success">
              テスト2
            </Button>
          </TagsFrame>
        </SearchUIFrame>

        <svg width={width} height={height}>
          <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />{' '}
          <rect width={width} height={height} rx={0} fill="#eff3f9" /> {/* background color */}
          <Tree
            top={margin.top}
            left={margin.left}
            root={root}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent == b.parent ? 1 : 0.5) / a.depth}
          >
            {({ data }) => (
              <Group top={origin.y} left={origin.x}>
                <Links
                  links={data.links()}
                  linkType={linkType}
                  layout={layout}
                  orientation={orientation}
                  stepPercent={stepPercent}
                />
                <Nodes
                  nodes={data.descendants()}
                  layout={layout}
                  orientation={orientation}
                  onNodeClick={node => {
                    this.nodeClick(node);
                  }}
                  onPopup={node => {
                    this.popupModal(node);
                  }}
                />
              </Group>
            )}
          </Tree>
        </svg>
        {this.state.popup ? <PopupModal popup={this.state.popup} stateChange={() => this.popupModal()} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.manager.projects,
  isFetching: state.manager.isFetching
});

const mapDispatchToProps = dispatch => ({
  searchProjects: keyword => {
    dispatch(
      requestSearchProjects(
        keyword
          .join(',')
          .split(',')
          .join(' ')
      )
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizeTree);

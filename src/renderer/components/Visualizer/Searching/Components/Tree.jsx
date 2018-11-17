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
import { convertProject } from '../utils/convertProjectUtil';

import {
  SearchUIFrame,
  ModeSelectorFrame,
  ModeLabel,
  TagsFrame,
  TagHeader,
  TagInput,
  TagButton,
  InputFrame
} from '../../../../stylesheets/visualizer/Tree';
import { Select, Button, Input } from '@smooth-ui/core-sc';
import PopupModal from './PopupModal.jsx';
import WarningWindow from './WarningWindow.jsx';

const debug = Debug('fabnavi:visualizer:Tree');

/**
 * layout ...cartesian(one direction) or polar(circle)
 * orientation ... vertical(up to down) or horizontal(left to right)
 * linkType ... diagonal(a little curve) or step(line) or curve or line(binary tree like) or elbow(this is customize)
 * step percent ... a position of splitting branch
 * default ... cartesian , horizontal , diagonal.
 * original ... cartesian , horizontal , step ?
 * custom ... polar , (horizontal), step
 */
class VisualizeTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: 'cartesian',
      orientation: 'horizontal',
      linkType: 'diagonal',
      stepPercent: 0.5,
      popup: false,
      node_tags: [],
      custom_query: '',
      warning: {
        noQuery: false,
        duplicateQuery: false
      },
      node: null
      // root: null
    };
  }

  componentWillMount() {
    const project = this.props.targetProject;
    const lastFigure = project.content.slice(-1)[0]; //TODO: reducerにcurrentFigureIndexを保存して，ここに持ってくる
    // TODO: must re-design data mount type
    // TODO: this root data must be updated per node & query
    this.setState({
      // root: hierarchy(convertProject(project), d => (d.isExpanded ? d.children : null)),
      node_tags: lastFigure.figure.step_tags.map(tag => {
        return {
          filter: true,
          tag: String(tag.step_tag)
        };
      })
    });
  }

  nodeClick = node => {
    debug('node: ', node);
    const result = this.state.node_tags.every(query => {
      return !query.filter;
    });
    if(result) {
      this.setState({
        warning: {
          noQuery: !this.state.warning.noQuery
        }
      });
    } else {
      this.props.searchProjects(['tkd']);
      // ClickしたNodeの下にChildrenをつける
      // debug('onClickNode: ', this.state.root);
      const targetProject =
        // TODO: update async
        setTimeout(() => {
          // TODO: mount new data
          debug('props: ', this.props.projects);
          if(!node.data.isExpanded) {
            node.data.x0 = node.x;
            node.data.y0 = node.y;
          }
          node.data.isExpanded = !node.data.isExpanded;
          this.forceUpdate();
        }, 500);
    }
  };

  popupModal = node => {
    debug('node: ', node);
    this.setState({
      popup: !this.state.popup,
      node: node
    });
  };

  onTagClick = index => {
    debug(`tag ${index} is clicked`);
    this.setState({
      node_tags: this.state.node_tags.map((tag, _index) => {
        if(_index !== index) return tag;
        tag.filter = !tag.filter;
        return tag;
      })
    });
  };

  handleCustomInput = e => {
    this.setState({
      custom_query: e.target.value
    });
  };

  onAddCustomQuery = () => {
    const checkDuplicate = this.state.node_tags.every(val => {
      return val.tag !== this.state.custom_query;
    });
    if(!checkDuplicate) {
      this.setState({
        custom_query: '',
        warning: {
          duplicateQuery: !this.state.warning.duplicateQuery
        }
      });
    } else {
      const copy = this.state.node_tags.slice();
      copy.push({
        filter: true,
        tag: this.state.custom_query
      });
      this.setState({
        node_tags: copy,
        custom_query: ''
      });
    }
  };

  warnNoQuery = () => {
    this.setState({
      warning: {
        noQuery: !this.state.warning.noQuery
      }
    });
  };

  warnDuplicateQuery = () => {
    this.setState({
      warning: {
        duplicateQuery: !this.state.warning.duplicateQuery
      }
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
    debug('root: ', root);
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
          <TagHeader>Tag: </TagHeader>
          <TagsFrame>
            {this.state.node_tags.length !== 0 ? (
              this.state.node_tags.map((tag, index) => {
                return (
                  <Button
                    variant={tag.filter ? 'success' : 'secondary'}
                    key={index}
                    ml={15}
                    onClick={() => this.onTagClick(index)}
                  >
                    {tag.tag}
                  </Button>
                );
              })
            ) : (
              <TagHeader>None</TagHeader>
            )}
          </TagsFrame>
          <InputFrame>
            <Input
              size="md"
              placeholder="Add Custom Query"
              value={this.state.custom_query}
              onChange={this.handleCustomInput}
            />
            <Button variant="info" onClick={this.onAddCustomQuery}>
              Add
            </Button>
          </InputFrame>
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
        {this.state.popup ? (
          <PopupModal popup={this.state.popup} node={this.state.node} stateChange={() => this.popupModal()} />
        ) : null}
        {this.state.warning.noQuery ? (
          <WarningWindow
            popup={this.state.warning.noQuery}
            stateChange={() => this.warnNoQuery()}
            text="No Query! Please select query ..."
          />
        ) : null}
        {this.state.warning.duplicateQuery ? (
          <WarningWindow
            popup={this.state.warning.duplicateQuery}
            stateChange={() => this.warnDuplicateQuery()}
            text="Duplicate Query! Please input new query ..."
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.manager.projects,
  isFetching: state.manager.isFetching,
  targetProject: state.manager.targetProject
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

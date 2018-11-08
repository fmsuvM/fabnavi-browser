import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import ProjectCard from './ProjectCard';
import { ProjectFrame } from '../../stylesheets/application/ProjectShow/RelatedProjects';

const debug = Debug('fabnavi:componens:RelatedProjects');

class RelatedProjects extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const _projects = this.props.projects;
    const tag = this.props.tag;
    const projects = _projects[tag];
    // const relatedProjects = projects.map((content, index) => (
    //   <ProjectCard project={content} key={index} id={content.id} />
    // ));
    /**
     * この辺でerror測れる．undefinedになる．
     * ということはここでlazy load使えばいいのでは？
     */
    return (
      <ProjectFrame>
        {projects.map((content, index) => (
          <ProjectCard project={content} key={index} id={content.id} />
        ))}
      </ProjectFrame>
    );
  }
}

RelatedProjects.propTypes = {
  projects: PropTypes.object,
  tag: PropTypes.string
};

export default connect(
  null,
  null
)(RelatedProjects);

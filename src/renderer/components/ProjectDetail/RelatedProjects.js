import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:componens:RelatedProjects');

class RelatedProjects extends React.Component {
  constructor(props) {
    super(props);

    // this.searchRelatedProjects = () => {
    //   this.props.searchRelatedProjects('2018'); // test tag
    // };
  }

  componentDidMount() {
    // this.searchRelatedProjects();
  }

  render() {
    debug('related projects: ', this.props.projects);
    return (
      <div>
        <p>this is the searching test</p>
        <p>button</p>
      </div>
    );
  }
}

RelatedProjects.propTypes = {
  projects: PropTypes.object
};

export default connect(
  null,
  null
)(RelatedProjects);

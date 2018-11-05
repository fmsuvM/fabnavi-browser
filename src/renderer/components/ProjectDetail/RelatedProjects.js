import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import { searchRelatedProjects } from '../../actions/manager';

const debug = Debug('fabnavi:ProjectDetail:RelatedProjects');

class RelatedProjects extends React.Component {
    constructor(props) {
        super(props);

        this._searchRelatedProjects = () => {
            this.props._searchRelatedProjects(this.props.tag);
        };
    }

    render() {
        const{ isFetching, relatedProjects } = this.props;
        let _relatedProjects = null;
        if(isFetching && Object.keys(relatedProjects).length === 0) {
            _relatedProjects = <p>now loading ...</p>;
        } else if(!isFetching && Object.keys(relatedProjects).length === 0) {
            _relatedProjects = <p>thinking ...</p>;
        } else {
            _relatedProjects = relatedProjects;
        }
        return (
            <div>
                <a onClick={this._searchRelatedProjects}>cllick !!</a>
                {_relatedProjects}
            </div>
        );
        // if(!this.props.isFetching) {
        //     return <p>now loading ...</p>;
        // }
        // return <p>loaded !</p>;
    }
}

RelatedProjects.propTypes = {
    tag: PropTypes.string,
    _searchRelatedProjects: PropTypes.func,
    relatedProjects: PropTypes.object,
    isFetching: PropTypes.bool
};

const mapStateToProps = state => ({
    relatedProjects: state.manager.relatedProjects,
    isFetching: state.manager.isFetching
});

const mapDispatchToProps = dispatch => ({
    _searchRelatedProjects: query => {
        dispatch(searchRelatedProjects(query));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RelatedProjects);

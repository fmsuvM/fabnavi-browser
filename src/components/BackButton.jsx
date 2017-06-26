import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Debug from 'debug';

const debug = Debug('fabnavi:components:backbutton');

class BackButton extends React.Component {
    render() {
        return (
            <div>
                <p onClick={this.props.back}>Back Button</p>
            </div>
        );
    }
}

BackButton.propTypes = {
    back: PropTypes.func
}

function mapToStateProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        back: () => {
            dispatch(goBack())
        }
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(BackButton);

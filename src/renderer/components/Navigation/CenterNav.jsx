import React from 'react';
import Debug from 'debug';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HostSelector from '../HostSelector.jsx';
import SearchBar from './SearchBar.jsx';
import { assetsPath } from '../../utils/assetsUtils';
import { CenterNavFrame } from '../../stylesheets/application/ProjectIndex/StyledCenterNav';

const debug = Debug('fabnavi:js:LeftNav');

const CenterNav = props => (
  <CenterNavFrame>
    <SearchBar />
    {props.isAdmin || props.isDeveloper ? <HostSelector /> : null}
  </CenterNavFrame>
);

CenterNav.propTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isDeveloper: PropTypes.bool,
  Uid: PropTypes.string
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  isAdmin: state.user.isAdmin,
  isDeveloper: state.user.isDeveloper,
  Uid: state.user.credential.Uid
});

export default connect(mapStateToProps)(CenterNav);

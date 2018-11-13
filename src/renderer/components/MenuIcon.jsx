import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { push } from 'react-router-redux';

import { host } from '../utils/host';
import api from '../utils/WebAPIUtils';

import { signInFailed, signedIn, signedOut, signingOut } from '../actions/users';

import { IconStyle, LogoStyle } from '../stylesheets/application/ProjectIndex/StyledMenuIcon';
import { Button, SignOutButton } from '../stylesheets/application/interface/StyledButton';
import { changeProjectListPage } from '../actions/manager';

const debug = Debug('fabnavi:jsx:MenuIcon');

// TODO: split class
export class MenuIcon extends React.Component {
  constructor(props) {
    super(props);

    this.signIn = () => {
      debug('sign in process is starting');
      const authUrl = `${host.url}/auth/github?auth_origin_url=${window.location.href}`;
      window.open(authUrl, 'GitHub Login');
      const onMessage = e => {
        debug('onmessage: ', e);
        window.removeEventListener('message', onMessage, false);
        if(e.origin == window.location.origin) {
          try{
            debug('>>', e.data);
            this.props.signedIn(JSON.parse(e.data));
          } catch(error) {
            this.props.signInFailed(error, e);
          }
        }
      };
      window.addEventListener('message', onMessage);
    };

    this._onClick = () => {
      if(props.hasOwnProperty('to')) {
        if(props.to === '/' && props.currentPage !== 0) {
          props.jumpToHome();
        }
        props.jump(props.to);
      }
      if(props.hasOwnProperty('act')) {
        if(props.act === 'sign_in') {
          debug('sign in action');
          this.signIn();
        } else {
          props.signingOut();
          api
            .signOut()
            .then(res => {
              debug('response is: ', res);
              props.signedOut();
            })
            .catch(err => debug('error is occuered: ', err));
        }
      }
    };
  }

  render() {
    return (
      <div>
        <a onClick={this._onClick}>
          {this.props.act === 'sign_in' ? (
            <Button>Sign In</Button>
          ) : this.props.act === 'sign_out' ? (
            <SignOutButton>Sign Out</SignOutButton>
          ) : this.props.help === true ? (
            <IconStyle help src={this.props.src} />
          ) : this.props.logo === true ? (
            <LogoStyle type="logo" src={this.props.src} />
          ) : (
            <IconStyle src={this.props.src} />
          )}
        </a>
      </div>
    );
  }
}

MenuIcon.propTypes = {
  jump: PropTypes.func,
  signedIn: PropTypes.func,
  signInFailed: PropTypes.func,
  signedOut: PropTypes.func,
  signingOut: PropTypes.func,
  src: PropTypes.string,
  to: PropTypes.string,
  act: PropTypes.string,
  currentPage: PropTypes.number,
  jumpToHome: PropTypes.func
};

export const mapStateToProps = state => ({
  currentPage: state.manager.currentPage
});

export const mapDispatchToProps = dispatch => ({
  jumpToHome: () => {
    dispatch(changeProjectListPage(0));
  },
  jump: path => {
    dispatch(push(path));
  },
  signedIn: credential => {
    debug('credential: ', credential);
    api.saveCredential(credential);
    api.prepareHeaders();
    dispatch(signedIn(credential));
  },
  signingOut: () => {
    dispatch(signingOut());
  },
  signedOut: () => {
    api.clearCredential();
    api.clearUserId();
    dispatch(signedOut());
  },
  signInFailed: (error, info) => {
    const now = new Date();
    dispatch(
      signInFailed({
        message: 'sign in failed. see console',
        error,
        info,
        time: now.toTimeString()
      })
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuIcon);

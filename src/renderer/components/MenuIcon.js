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
            // const onMessage = e => {
            //     debug('e: ', e.data);
            // };
            // window.addEventListener('message', onMessage);
            // const testurl = 'http://example.com/';
            // window.open(testurl, 'test');
            const _url = window.location.href;
            const authUrl = `${host.url}/auth/github?auth_origin_url=${_url}`;
            window.open(authUrl, 'GitHub Login');
            debug('href uri?: ', window.location.href);
            const onMessage = e => {
                debug('onmessage: ', e);
                window.removeEventListener('message', onMessage, false);
                const url = window.location.href;
                if(url.includes('uid') && url.includes('client_id') && url.includes('auth_token')) {
                    debug('hoge');
                    props.signedIn({
                        'Access-Token': authUrl.match(/auth_token=([a-zA-Z0-9\-_]*)/)[1],
                        Uid: authUrl.match(/uid=([a-zA-Z0-9\-_]*)/)[1],
                        Client: authUrl.match(/client_id=([a-zA-Z0-9\-_]*)/)[1]
                    });
                }
            };
            window.addEventListener('message', onMessage); // 親window
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
                    api.signOut()
                        .then(res => {
                            debug('response is: ', res);
                            props.signedOut();
                        })
                        .catch(err => debug('error is occuered: ', err));
                }
            }
        };
    }

    // onMessage(e) {
    //     debug('event: ', e);
    // }

    // componentDidMount() {
    //     window.opener.postMessage('waiwai', '*')
    //     window.addEventListener('message', this.onMessage);
    // }

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
// export const _MenuIcon = props => {
//     const signIn = () => {
//         debug('sign in process is starting');
//         const testurl = 'http://example.com/';
//         window.open(testurl, 'test');
//         const onMessage = e => {
//             debug('e: ', e.data);
//         };
//         document.addEventListener('message', onMessage);
//         // const authUrl = `${host.url}/auth/github?auth_origin_url=${host.url}`;
//         // window.open(authUrl, 'GitHub Login');
//         // const onMessage = e => {
//         //     debug('onmessage');
//         //     window.removeEventListener('message', onMessage, false);
//         //     const url = window.location.href;
//         //     if(url.includes('uid') && url.includes('client_id') && url.includes('auth_token')) {
//         //         debug('hoge');
//         //         props.signedIn({
//         //             'Access-Token': authUrl.match(/auth_token=([a-zA-Z0-9\-_]*)/)[1],
//         //             Uid: authUrl.match(/uid=([a-zA-Z0-9\-_]*)/)[1],
//         //             Client: authUrl.match(/client_id=([a-zA-Z0-9\-_]*)/)[1]
//         //         });
//         //     }
//         // };
//         // window.addEventListener('message', onMessage); // 親window
//     };

//     const _onClick = () => {

//     };
//     return (

//     );
// };

MenuIcon.propTypes = {
    jump: PropTypes.func,
    signedIn: PropTypes.func,
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

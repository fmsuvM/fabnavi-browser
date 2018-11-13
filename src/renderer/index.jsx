import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Debug from 'debug';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createMemoryHistory from 'history/createMemoryHistory';

import ProjectList from './components/ProjectList.jsx';
import ProjectManager from './components/ProjectManager.jsx';
import ProjectPlayer from './components/ProjectPlayer.jsx';
import CreateProject from './components/CreateProject.jsx';
import ProjectEditForm from './components/ProjectEditForm.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import Visualizer from './components/Visualizer.jsx';
import WorkSpace from './components/WorkSpace.jsx';

import reducers from './reducers/index';
import adjustor from './middleware/epics/adjustor';
import epicsMiddleware from './middleware/epics/index';
import { handleKeyDown } from './actions/KeyActionCreator';
import { signedIn } from './actions/users';
import WebAPIUtils from './utils/WebAPIUtils';

import '!style-loader!css-loader!video.js/dist/video-js.css';
import './stylesheets/GlobalStyle';

import { fetchProjects } from './actions/manager';

import { host } from './utils/host';

const debug = Debug('fabnavi:jsx:FabnaviApp');

const forceSignIn = store => {
  debug('force login');
  const authUrl = `${host.url}/auth/github?auth_origin_url=${host.url}`;
  window.open(authUrl);
  const url = window.location.href;
  debug('url: ', url);
  if(url.includes('uid') && url.includes('client_id') && url.includes('auth_token')) {
    const credential = {
      accessToken: url.match(/auth_token=([a-zA-Z0-9\-_]*)/)[1],
      uid: url.match(/uid=([a-zA-Z0-9\-_]*)/)[1],
      client: url.match(/client_id=([a-zA-Z0-9\-_]*)/)[1]
    };
    api.saveCredential(credential);
    store.dispatch(signedIn(credential));
  }
};

const isAuthWindow = url => {
  return url.includes('uid') && url.includes('client_id') && url.includes('auth_token');
};

const parseAuthInfo = url => {
  return {
    'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-\_]*)/)[1],
    Uid: url.match(/uid=([a-zA-Z0-9\-\_]*)/)[1],
    Client: url.match(/client_id=([a-zA-Z0-9\-\_]*)/)[1]
  };
};

window.api = WebAPIUtils;

window.addEventListener('DOMContentLoaded', () => {
  debug('======> Mount App');
  const history = createMemoryHistory();
  // const composeEnhancers = isDev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(adjustor, epicsMiddleware, routerMiddleware(history)))
  );
  api.init(store);
  debug(api.loadCredential());
  // if(!api.loadCredential()) forceSignIn(store);
  const url = window.location.href;
  if(isAuthWindow(url)) {
    window.opener.postMessage(JSON.stringify(parseAuthInfo(url)), window.location.origin);
    window.close();
    return;
  }
  store.dispatch(fetchProjects(0, 'all'));
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route component={ProjectPlayer} path="/play/:projectId" />
          <Route component={WorkSpace} path="/workspace" />
          <Route component={Visualizer} path="/visualizer/:projectId" />
          <Route
            path="/"
            render={() => (
              <ProjectManager>
                <Switch>
                  <Route component={ProjectList} path="/" exact />
                  <Route component={ProjectList} path="/myprojects" />
                  <Route component={CreateProject} path="/create" />
                  <Route component={ProjectEditForm} path="/edit/:projectId" />
                  <Route component={ProjectDetail} path="/detail/:projectId" />
                </Switch>
              </ProjectManager>
            )}
          />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
  window.addEventListener('keydown', handleKeyDown(store));
});
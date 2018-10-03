import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { state } from './client/config/state';
import { context } from './client/config/context';
import { Provider } from 'mobx-react';
import { App } from './client/modules/main/components/app';

// import styles
// import './client/styles/semantic.min.css';
// import './client/styles/app.css';


import { setStatefulModules } from 'fuse-box/modules/fuse-hmr'
setStatefulModules((name) => name.match(/context|state/) != null)

ReactDOM.render(
    <Provider state={state} context={context}>
      <App/>
    </Provider>,
  document.querySelector('#app')
);



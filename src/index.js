import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import App from './components/App';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/login';
import rootReducer from './rootReducer';
import './index.css'
//import registerServiceWorker from './registerServiceWorker';


const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk));

    if (localStorage.jwtToken) {
        setAuthorizationToken(localStorage.jwtToken);
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
      }

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))




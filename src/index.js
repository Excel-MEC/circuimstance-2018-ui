import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { userRouterHistory } from 'react-router'
// import { createHistory } from 'history'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import io from 'socket.io-client'


import { leaderboardUpdate } from './actions/leaderboard'


const WS_HOST = 'http://localhost:4000'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk,logger)
)

const socket = io(WS_HOST)

socket.on('score update', (data) => {
    console.log('score updated')
    store.dispatch(leaderboardUpdate(data))
})






ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));


registerServiceWorker();

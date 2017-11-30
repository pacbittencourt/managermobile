import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyC4QyN2Hj1h983xopD1JQIsDKFUk26ovkA',
            authDomain: 'manager-1ec37.firebaseapp.com',
            databaseURL: 'https://manager-1ec37.firebaseio.com',
            projectId: 'manager-1ec37',
            storageBucket: 'manager-1ec37.appspot.com',
            messagingSenderId: '1081205064956'
        };
        firebase.initializeApp(config);
    }

    render() {
        console.ignoredYellowBox = ['Setting a timer'];
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

export default App;
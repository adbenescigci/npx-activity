import React from 'react'; // since there is no glabal tag on scripts 
import ReactDOM from 'react-dom';
import {firebase} from './firebase/firebase';

import App from './components/VirdMainPage';
import LoginPage from './components/LoginPage';

import 'firebase/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';




ReactDOM.render(<div className='loader'>Yükleniyor...</div> ,document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {  
        ReactDOM.render(<App uid= {user.uid}/>, document.getElementById('app'))
     } else {
        ReactDOM.render(<LoginPage/>, document.getElementById('app'))
    }
})
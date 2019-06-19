import * as firebase from 'firebase';
import 'firebase/firestore';
import config from './config';
import testConfig from './testConfig';

const firebaseConfig = process.env.NODE_ENV === 'test' ? testConfig : testConfig;

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
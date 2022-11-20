/**
 * @format
 */

/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import { AppRegistry } from 'react-native';
import reactotron from 'reactotron-react-native';
import App from './App';
import { name as appName } from './app.json';

reactotron.configure().connect();
console.log = reactotron.log;
console.error = reactotron.error;
AppRegistry.registerComponent(appName, () => App);

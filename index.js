/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { stdout } from 'process';

AppRegistry.registerComponent(appName, () => App);


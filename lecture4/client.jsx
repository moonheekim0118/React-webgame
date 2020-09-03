import React from 'react';
import ReactDom from 'react-dom';
import ReactSpeed from './reactSpeed_hooks';
import { hot } from 'react-hot-loader/root';
const Hot = hot(ReactSpeed);
ReactDom.render(<Hot/>, document.querySelector('#root'));
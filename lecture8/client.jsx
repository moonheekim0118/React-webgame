import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import MineFinder from './mineFinder';

const Hot = hot(MineFinder);

ReactDom.render(<Hot/>,document.querySelector('#root'));
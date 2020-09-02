import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import NumberBaseBallHooks from './NumberBaseBall_hooks.jsx'

const Hot = hot(NumberBaseBallHooks);

ReactDom.render(<Hot />, document.querySelector('#root'));

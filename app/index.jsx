import Sugar from 'sugar';
Sugar.extend();
import './styles/site.sass';

import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
);

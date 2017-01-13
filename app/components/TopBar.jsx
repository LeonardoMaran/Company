import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import Dropdown from './Dropdown';
import Session from '../lib/Session';
import './TopBar.sass';

export default class TopBar extends Component {
  state = {account: Session.current()};

  logout = () => {
    Session.logout();
    this.setState({account: null});
    browserHistory.push('/login');
  };

  componentDidMount() {
    let session = Session.current();
    if(session == null) {
      browserHistory.push('/login');
    }
  }

  render() {
    let account = this.state.account;
    return (
      <header id="topbar">
        <div className="account">
        {
          account == null
          ? null
          : <Dropdown title={<Link to="/">{account.username}</Link>}>
              <div onClick={this.logout} className="logout">退出登录</div>
            </Dropdown>
        }
        </div>
      </header>
    );
  }
}

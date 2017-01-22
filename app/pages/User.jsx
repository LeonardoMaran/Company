import React, {Component} from 'react';
import {Link} from 'react-router';
import Tabs from '../components/Tabs';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Users.sass';

export default class User extends Component {
  state = {user: {}};

  componentDidMount() {
    ApiCaller.loadData(`/api/user/${this.props.params.id}`, {}, (result, error) => {
      this.setState({user: result.body});
    });
  }

  render() {
    let user = this.state.user;
    return (
      <div id="user">
        <h1>用户 / {user.username}</h1>
        <Link to="/config/user/edit" className="btn btn-primary" style={{marginBottom: '10px'}}>编辑</Link>
        <div>
          <p className="username">{user.username}</p>
          <p className="email">{user.email}</p>
          <Tabs style={{marginTop: '20px'}}>
            <div title="访问权限" className="wrap">
              <p><label><span>销售</span> </label></p>
              <p><label><span>员工</span> </label></p>
              <p><label><span>系统管理</span> </label></p>
            </div>
            <div title="个人资料" className="wrap">
              <p><label><span>姓名</span> {user.name}</label></p>
              <p><label><span>手机</span> {user.phone}</label></p>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

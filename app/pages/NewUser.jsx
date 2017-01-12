import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import Tabs from '../components/Tabs';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Users.sass';

export default class NewUser extends Component {
  save = () => {
    ApiCaller.postData(`/api/user`, {
      "username": this.refs.username.value,
      "password": this.refs.password.value,
      "realname": this.refs.realname.value,
      "email": this.refs.email.value,
      "phone": this.refs.phone.value
    }, result => {
      browserHistory.push("/config/users");
    });
  }

  render() {
    return (
      <div id="new_user">
        <h1>用户 / 新建</h1>
        <button onClick={this.save} className="btn btn-primary" style={{marginBottom: '10px'}}>保存</button>
        <div>
          <p>帐号</p>
          <input ref="username" className="user_name" />
          <p>初始密码</p>
          <input ref="password" className="user_password" type="password" />
          <Tabs style={{marginTop: '20px'}}>
            <div title="访问权限" className="wrap">
              <p><label><span>销售</span><input type="text" /></label></p>
              <p><label><span>员工</span><input type="text" /></label></p>
              <p><label><span>系统管理</span><input type="text" /></label></p>
            </div>
            <div title="个人资料" className="wrap">
              <p><label><span>姓名</span><input ref="realname" type="text" /></label></p>
              <p><label><span>Email</span><input ref="email" type="text" /></label></p>
              <p><label><span>手机</span><input ref="phone" type="text" /></label></p>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

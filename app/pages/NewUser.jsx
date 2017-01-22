import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import Tabs from '../components/Tabs';
import Session from '../lib/Session';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Users.sass';

export default class NewUser extends Component {
  state = {roles: []};

  save = () => {
    let account = Session.current();
    ApiCaller.postData(`/api/user`, {
      "username": this.refs.username.value,
      "password": this.refs.password.value,
      "realname": this.refs.realname.value,
      "role_id": this.refs.role.value,
      "email": this.refs.email.value,
      "phone": this.refs.phone.value
    }, (result, error) => {
      if(result.status == 200) {
        browserHistory.push("/config/user");
      }
    });
  }

  componentDidMount() {
    ApiCaller.loadData(`/api/role`, {}, (result, error) => {
      this.setState({roles: result.body.item});
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
            <div title="访问权限">
              <p>
                <label>
                  <span>角色</span>
                  <select ref="role">
                    {this.state.roles.map((role, i) => <option key={i} value={role.id}>{role.name}</option>)}
                  </select>
                </label>
              </p>
            </div>
            <div title="个人资料">
              <p><label><span>姓名</span><input ref="realname" className="border-bottom-input" type="text" /></label></p>
              <p><label><span>Email</span><input ref="email" className="border-bottom-input" type="text" /></label></p>
              <p><label><span>手机</span><input ref="phone" className="border-bottom-input" type="text" /></label></p>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

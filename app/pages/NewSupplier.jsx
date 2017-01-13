import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import ApiCaller from '../lib/ApiCaller';
import '../styles/Users.sass';

export default class NewSupplier extends Component {
  save = () => {
    ApiCaller.postData("/api/contact", {
      "name": this.refs.name.value,
      "function": this.refs.function.value,
      "mobile": this.refs.mobile.value,
      "phone": this.refs.phone.value,
      "email": this.refs.email.value,
      "supplier": true
    }, (result, error) => {
      if(result.status == 200) {
        browserHistory.push('/purchase/supplier');
      }
    })
  }

  render() {
    return (
      <div id="new_supplier">
        <h1>新增供应商</h1>
        <button onClick={this.save} className="btn btn-primary" style={{marginBottom: '10px'}}>保存</button>
        <div className="wrap">
          <p><label><span>名字</span><input ref="name" type="text" /></label></p>
          <p><label><span>工作岗位</span><input ref="function" type="text" /></label></p>
          <p><label><span>电话</span><input ref="phone" type="text" /></label></p>
          <p><label><span>手机</span><input ref="mobile" type="text" /></label></p>
          <p><label><span>email</span><input ref="email" type="text" /></label></p>
          <p><label><span>网址</span><input ref="email" type="text" /></label></p>
        </div>
      </div>
    )
  }
}

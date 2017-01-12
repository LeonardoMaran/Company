import React, {Component} from 'react';
import {Link} from 'react-router';
import '../styles/Company.sass';

export default class Company extends Component {
  render() {
    return (
      <div id="company">
        <h1>公司</h1>
        <Link to="/config/company/edit" className="btn btn-primary" style={{marginBottom: '10px'}}>编辑</Link>
        <div>
          <p className="company_name">云车达</p>
          <p className="company_slogan">My Company Tagline</p>
          <p>通用信息</p>
          <div className="wrap">
            <div>
              <p><label><span>地址</span>hhhhhhhhhhhhhhhhh</label></p>
              <p><label><span>网站</span>hhhhhhhhhhhhhhhhh</label></p>
            </div>
            <div>
              <p><label><span>电话</span>hhhhhhhhhhhhhhhhh</label></p>
              <p><label><span>传真</span>hhhhhhhhhhhhhhhhh</label></p>
              <p><label><span>Email</span>hhhhhhhhhhhhhhhhh</label></p>
              <p><label><span>税号</span>hhhhhhhhhhhhhhhhh</label></p>
              <p><label><span>公司注册地</span>hhhhhhhhhhhhhhhhh</label></p>
              <p><label><span>币种</span>hhhhhhhhhhhhhhhhh</label></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, {Component} from 'react';
import {Link} from 'react-router';
import '../styles/Company.sass';

export default class EditCompany extends Component {
  render() {
    return (
      <div id="edit_company">
        <h1>公司</h1>
        <Link to="/config/company" className="btn btn-primary" style={{marginBottom: '10px'}}>保存</Link>
        <div>
          <p>公司名称</p>
          <input className="company_name" />
          <p>公司标语</p>
          <input className="company_slogan" />
          <p>通用信息</p>
          <div className="wrap">
            <div>
              <p><label><span>地址</span><input className="border-bottom-input" type="text" placeholder="街道" /></label></p>
              <p><label><span>网站</span><input className="border-bottom-input" type="text" placeholder="例如：www.cctv.com" /></label></p>
            </div>
            <div>
              <p><label><span>电话</span><input className="border-bottom-input" type="text" /></label></p>
              <p><label><span>传真</span><input className="border-bottom-input" type="text" /></label></p>
              <p><label><span>Email</span><input className="border-bottom-input" type="text" /></label></p>
              <p><label><span>税号</span><input className="border-bottom-input" type="text" /></label></p>
              <p><label><span>公司注册地</span><input className="border-bottom-input" type="text" /></label></p>
              <p><label><span>币种</span><input className="border-bottom-input" type="text" /></label></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

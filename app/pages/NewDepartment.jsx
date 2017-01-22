import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NewDepartment extends Component {
  render() {
    return (
      <div>
        <p><label><span>部门名称</span><input ref="realname" className="border-bottom-input" type="text" /></label></p>
        <p><label><span>上级部门</span><input ref="realname" className="border-bottom-input" type="text" /></label></p>
        <p><label><span>管理员</span><input ref="realname" className="border-bottom-input" type="text" /></label></p>
      </div>
    );
  }
}

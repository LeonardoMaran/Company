import React, {Component} from 'react';
import {Link} from 'react-router';
import DataTable from '../components/DataTable';

export default class Quotation extends Component {
  render() {
    let goodsList = [
      {status: '1'},
      {status: '1'},
      {status: '1'},
      {status: '1'}
    ]
    let fields = [
     {label: '报价单号码', name: 'status'},
     {label: '单据日期', name: 'status'},
     {label: '客户', name: 'status'},
     {label: '销售员', name: 'status'},
     {label: '总计', name: 'status'},
     {label: '状态', compute: item => <button className="btn btn-primary">删除</button>}
    ];
    return (
      <div id="quotation">
        <h1>报价单</h1>
        <Link to="/config/users/new" className="btn btn-primary" style={{marginBottom: '10px'}}>创建</Link>
				<DataTable fields={fields} items={goodsList} />
      </div>
    );
  }
}
